<template>
    <div class="wrapper">
        <form name="exerciseForm" method="post" @submit.prevent="submitForm()">
        <div class="form-container">
          <div class="form-group">
            <label for="impairment">Impairment</label>
            <select class="selects" name="impairment" v-model="impairmentLevel" required>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exercise-level">Exercise Level</label>
            <select class="selects" id="exercise-level" name="exercise-level" v-model="exerciseLevel" required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <!-- Add more options here -->
            </select>
          </div>
        </div>
        <div class="form-container">
          <div class="center">
              <div class="form-group">
                <div class="form-container">
                <label for="include-images">Include images</label>
                <div class="form-group">
                  <div class="checkbox-wrapper-3" >
                      <input type="checkbox" id="cbx-3" name="includeImages" v-model="includeImages" :value="includeImages ? 'true' : 'false'"/>
                      <label for="cbx-3" class="toggle"><span></span></label>
                  </div>              
                </div>
              </div>
            </div>
          </div>
        <div class="form-group">
          <label for="exercise-level">Exercise type</label>
          <select class="selects" id="exercise-type" name="exercise-type" v-model="exerciseType" required>
            <option value="Story">Story</option>
            <option value="Questions">Questions</option>
            <!-- Add more options here -->
          </select>
        </div>
        </div>
          <div class="form-group">
            <label  for="description">Small Description</label>
            <textarea class="description" id="description" name="description" rows="4" v-model="smallDescription" required></textarea>
          </div>
          <div class="form-group">
            <button class="button" type="submit">Generate story</button>
          </div>
        </form>
          <div v-if="loading" class="loading-spinner">
            <!-- Add your loading spinner or GIF here -->
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FYMM6g7x45coCKdrDoj%2Fgiphy.gif&f=1&nofb=1&ipt=1a16a1d55419864a5b3339458bcf062f2aad810a4999536250fb7d96e5ad00e4&ipo=images" alt="Loading..." />
          </div>
    </div>
      
</template>

<script>
import axios from 'axios';
import axiosInstance from '../services/AxiosTokenInstance';
import { mapGetters, mapMutations } from 'vuex';
import {
    GET_USER_TOKEN_GETTER,
    //S_USER_AUTHENTICATE_GETTER,
    LOADING_SPINNER_SHOW_MUTATION,
} from '../store/storeconstants';
export default {
    name: "PostPage",
    data() {
        return {
            posts: [],
            includeImages: false,
        };
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN_GETTER,
        }),
    },
    mounted() {
        this.showLoading(true);
        axiosInstance
            .get(`https://reading-trainer-743d0-default-rtdb.europe-west1.firebasedatabase.app/posts.json`)
            .then((response) => {
                this.formatPosts(response.data);
                this.showLoading(false);
                console.log(response.data)
            })
            .catch(() => {
                this.showLoading(false);
            });
    },
    methods: {
        ...mapMutations({
            showLoading: LOADING_SPINNER_SHOW_MUTATION,
        }),
        formatPosts(posts) {
            for (let key in posts) {
                this.posts.push({ ...posts[key], id: key });
            }
            console.log(this.posts);
        },

        async submitForm() {
        console.log('submitForm called');
        this.showLoading(true);
        const formData = {
          impairmentLevel: this.impairmentLevel,
          exerciseLevel: this.exerciseLevel,
          includeImages: this.includeImages,
          exerciseType: this.exerciseType,
          smallDescription: this.smallDescription,
        };      
        // Convert formData to JSON string
        const jsonData = JSON.stringify(formData);
        // Make an HTTP POST request to your Flask server
        const axiosInstance = axios.create({
          baseURL: 'http://127.0.0.1:5000',  // Update with your Flask server's URL
          headers: {
            'Content-Type': 'application/json',
          },
        });
        //console.log(jsonData);
        //console.log(formData);
        console.log('Before Axios request');
        const response = await axiosInstance.post('/', jsonData);
        //console.log('After Axios request');
        // Log the response from the server
        console.log('Response from Flask server:', response.data);
        // Update your state or perform any other logic based on the response
        // For example, you can update a variable to display the response in your component
        this.flaskResponse = JSON.parse(response.data.response);
        //console.log('Flask response:',this.flaskResponse);
        console.log(this.flaskResponse.content[0]);
        console.log(this.flaskResponse.id);
        if(this.includeImages){
          //await this.generateImages(this.flaskResponse.content[0],this.flaskResponse.content[1],this.flaskResponse.content[2]);
          const image = await axiosInstance.post('/generateimage', this.flaskResponse.content[0]);
          const image2 = await axiosInstance.post('/generateimage', this.flaskResponse.content[1]);
          const image3 = await axiosInstance.post('/generateimage', this.flaskResponse.content[2]);
          const image4 = await axiosInstance.post('/generateimage', this.flaskResponse.content[3]);
          console.log(image.data)
          
          const postData={
            id: this.flaskResponse.id,
            title: this.flaskResponse.title,
            content: [
              this.flaskResponse.content[0],this.flaskResponse.content[1],this.flaskResponse.content[2],this.flaskResponse.content[3]
            ],
            images: [image.data,
            image2.data,
            image3.data,
            image4.data,
            ]
          };
          await axios.post('http://localhost:3000/stories',postData);
          console.log(this.flaskResponse.id);
  
    
        }
        else{await axios.post('http://localhost:3000/stories', this.flaskResponse);}

        this.showLoading(false);
        this.$router.replace('/response');      
      },
    },
};
</script>

<style scoped>
/* styles.css */

  
.wrapper{
    background-color: rgb(33 37 41);
    justify-content: center;
    margin: auto;
    margin-top: 100px;
    width: 600px;
    padding: 40px 55px 45px 55px;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    border-radius: 20px;
    transition: all 1s;
    text-align: left;
  }

  .center{
    margin-top: 30px;

  }

  .selects{
    -webkit-text-fill-color: rgb(0, 0, 0); 

  }
  .description {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding-bottom: 5px;
    -webkit-text-fill-color: rgb(0, 0, 0); 
    text-align: left;
  }
  .form-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    -webkit-text-fill-color: white; 
  }
  
  .form-group {
    margin-bottom: 10px;
    flex-direction: column;
    text-align: left;
  }
  
  .form-group label {
    margin-bottom: 5px;
    font-weight: bold;
    text-align: left;
    font-size: 16px;
  }
  
  .form-group select,
  .form-group input[type="checkbox"],
  .form-group textarea,
  .form-group button {
    padding: 5px;
    border: 1px solid #000;
    border-radius: 5px;
  }
  
  .form-group select,
  .form-group textarea {
    width: 100%;
  }
  
  .form-group button {
    width: 100%;
    padding: 10px;
    background: rgba(79, 46, 220, 0.5);
    border-radius: 15px;
    color: #fff;
    border: none;
    cursor: pointer;
    font-weight: bold;
    text-align: left;
    font-size: 16px;
  }
  
  .form-group button:hover {
    background: #947ADA;
  }
  
  /* Specific layout adjustments */
  .form-group:nth-child(3) {
    grid-column: span 2;
    display: flex;
    align-items: center;
  }
  
  .form-group:nth-child(4) {
    grid-column: span 2;
  }
  
  .form-group:nth-child(5) {
    grid-column: span 2;
    display: flex;
    justify-content: flex-end;
  }

    .checkbox-wrapper-3 input[type="checkbox"] {
      visibility: hidden;
      display: none;
    }
  
    .checkbox-wrapper-3 .toggle {
      margin-top: 4px;
      position: relative;
      display: block;
      width: 40px;
      height: 20px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transform: translate3d(0, 0, 0);
    }
    .checkbox-wrapper-3 .toggle:before {
      content: "";
      position: relative;
      top: 3px;
      left: 3px;
      width: 34px;
      height: 14px;
      display: block;
      background: #9A9999;
      border-radius: 8px;
      transition: background 0.2s ease;
    }
    .checkbox-wrapper-3 .toggle span {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      display: block;
      background: white;
      border-radius: 10px;
      box-shadow: 0 3px 8px rgba(154, 153, 153, 0.5);
      transition: all 0.2s ease;
    }
    .checkbox-wrapper-3 .toggle span:before {
      content: "";
      position: absolute;
      display: block;
      margin: -18px;
      width: 56px;
      height: 56px;
      background: rgba(79, 46, 220, 0.5);
      border-radius: 50%;
      transform: scale(0);
      opacity: 1;
      pointer-events: none;
    }
  
    .checkbox-wrapper-3 #cbx-3:checked + .toggle:before {
      background: #947ADA;
    }
    .checkbox-wrapper-3 #cbx-3:checked + .toggle span {
      background: #4F2EDC;
      transform: translateX(20px);
      transition: all 0.2s cubic-bezier(0.8, 0.4, 0.3, 1.25), background 0.15s ease;
      box-shadow: 0 3px 8px rgba(79, 46, 220, 0.2);
    }
    .checkbox-wrapper-3 #cbx-3:checked + .toggle span:before {
      transform: scale(1);
      opacity: 0;
      transition: all 0.4s ease;
    }

</style>