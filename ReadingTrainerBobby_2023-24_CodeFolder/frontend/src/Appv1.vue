<!-- src/App.vue -->

<template>
  <div id="app" >
    <!-- Horizontal black bar with "ReadingTrainer" -->
    <div class="header">


        <div class="left-section" >
          <div id="mySidenav" class="sidenav" :style="{ width: sidenavWidth }">
            <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
            <a href="#" @click="showHome">Home</a>
            <a href="#" @click="showExercise">Exercise</a>
            <a href="#" @click="showParameters">Parameters</a>
          </div>

          <!-- Use any element to open the sidenav -->
          <span style="font-size:30px;cursor:pointer" @click="openNav()">&#9776; </span>

          
        </div>

      <h2 class="title">ReadingTrainer</h2>
     
    </div>
    <div class="grid-container">
      <div v-if="valueParameters" class="ParametersPage" @click="closeNav()">
      
        
        <div class="box">
          <p>Timer</p>
          <div class="item">
            <div class="checkboxTimer">
              <input class="tgl tgl-light" id="timer" type="checkbox"/>
              <label class="tgl-btn" for="timer"></label>

            </div>
          </div>
        </div>

        
        <div class="box">
          <p>Animations</p>
          <div class="item">
            <div class="checkboxAnimation">
              <input class="tgl tgl-light" id="animation" type="checkbox"/>
              <label class="tgl-btn" for="animation"></label>

            </div>
          </div>
        </div>

        
        <div class="box">
          <p>Sound Effects</p>
          <div class="item">
            <div class="checkboxSounds">
              <input class="tgl tgl-light" id="sounds" type="checkbox"/>
              <label class="tgl-btn" for="sounds"></label>

            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="grid-container">

      <div v-if="valueExercise" class="ExerciseForm" @click="closeNav()">
        <div>
          <form  name="exerciseForm" method="post" @submit.prevent="submitForm">

          <div class="box">
            <div class="item">
              <label for="impairmentLevel">Impairment Level:</label>
              <select id="impairmentLevel" v-model="impairmentLevel" required>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
            </div>
          </div>

          <div class="box">
            <div class="item">
              <label for="exerciseLevel">Exercise Level:</label>
              <select id="exerciseLevel" v-model="exerciseLevel" required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>  
          </div>

          <div class="box">
            <div class="item">
              <label for="guidelines">Guidelines:</label>
              <select id="guidelines" v-model="selectedGuideline" required>
                <option value="GeneralGuidelines">General Guidelines</option>
                <option value="DyslexicGuidelines">Dyslexic Guidelines</option>
                <!-- Add more options as needed -->
              </select>
            </div>  
          </div>

          <button type="submit" >Send Form</button>
        </form>
        <div v-if="loading" class="loading-spinner">
          <!-- Add your loading spinner or GIF here -->
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FYMM6g7x45coCKdrDoj%2Fgiphy.gif&f=1&nofb=1&ipt=1a16a1d55419864a5b3339458bcf062f2aad810a4999536250fb7d96e5ad00e4&ipo=images" alt="Loading..." />
        </div>
    </div>
    </div>
    <div >
      <div v-if="valueResponsePage" class="ResponsePage">
        <div v-if="flaskResponse && flaskResponse.exercises.length">
    <div v-for="(exercise, index) in flaskResponse.exercises" :key="index">
      <h2>{{ exercise.title }}</h2>
      <div v-for="paragraph in exercise.content" :key="paragraph">
        <p>{{ paragraph }}</p>
      </div>
      <h3>Instructions:</h3>
      <ul>
        <li v-for="instruction in exercise.instructions" :key="instruction">
          {{ instruction }}
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <p>No exercises available.</p>
  </div>
      </div>
    </div>

      </div>
      </div>



      <div v-if="valueHome" class="HomePage" @click="closeNav()">
        <div class="welcome-message">
          <h2 >Welcome to the <p><strong>Reading Trainer</strong></p></h2>
          <h3><strong>Exercise Levels:</strong></h3>
          
            <h4>Level 1: Beginner</h4>
            <p>At this level, reading exercises are designed for individuals who are just starting to develop
              their reading skills. The content is simple, featuring basic vocabulary, short sentences, and clear
              language. Topics are familiar and may include everyday activi ties, common objects, and simple
              instructions.</p> 
            
            <h4>Level 2: Elementary</h4>
            <p>Readers at an elementary level have progressed beyond the basics and can comprehend
            slightly more complex texts. Vocabulary expands to include more diverse words, and sentence
            structures become a bit more intricate. Topics cover a range of everyday situati ons, hobbies,
            and straightforward narratives.</p> 
            
            <h4>Level 3: Intermediate</h4>
            <p>Intermediate level reading exercises target readers with a solid foundation in the language. The
            content becomes more challenging, incorporating a broader range of vocabulary and sentence
            structures. Texts may explore various genres, including informative articles, short stories, and
            discussions on familiar topics.</p>
            
            <h4>Level 4: Advanced</h4>
            <p>Advanced reading exercises are designed for readers with a high level of proficiency. The
            content is sophisticated, featuring complex vocabulary, intricate sentence structures, and
            abstract concepts. Topics cover a wide array of subjects, including academi c, technical, and
            literary content. Readers at this level can analyze and interpret information at a deeper level.</p>
            <h3><strong>Impairment Level</strong></h3>
            <h4>Mild Reading Impairment:</h4>
            <p>Individuals with mild reading impairment may experience challenges in certain aspects of
            reading. They might struggle with decoding unfamiliar words, have difficulty maintaining
            fluency, or face mild comprehension issues. However, their ability to engage w ith simpler texts
            and navigate everyday reading tasks is generally intact. Mild reading impairment may require
            targeted interventions and additional support to enhance specific reading skills.</p>
            <h4>Moderate Reading Impairment:</h4>
            <p>Moderate reading impairment indicates a more significant difficulty with various aspects of
              Moderate reading impairment indicates a more significant difficulty with various aspects of reading.
              Individuals at this level may encounter challenges in decoding words, comprehending reading. Individuals 
              at this level may encounter challenges in decoding words, comprehending complex texts, and maintaining fluency. 
              They may require more extensivecomplex texts, and maintaining fluency. They may require more extensive support,
              including support, including personalized reading strategies, targeted interventions, and additional resources. 
              Developing a personalized reading strategies, targeted interventions, and additional resources. Developing a 
              tailored approach to address specific difficulties is crucial for individuals with moderate reading tailored 
              approach to address specific difficulties is crucial for individuals with moderate reading impairment.impairment.</p>
            <h4>Severe Reading Impairment:</h4>
            <p>
              Individuals with severe reading impairment face substantial challenges across multiple facets of reading. 
              This can include difficulties with decoding, fluency, comprehension, and overall reading. This can include 
              difficulties with decoding, fluency, comprehension, and overall reading proficiency. Severe reading impairment
               may significantly impareading proficiency. Severe reading impairment may significantly impact academic and daily 
               life ct academic and daily life activities. Intensive interventions, specialized instruction, and ongoing support
                from educators activities. Intensive interventions, specialized instruction, and ongoing support from educators 
                and specialists are essential to help individuals with severe reading impairment overcome and specialists are 
                essential to help individuals with severe reading impairment overcome these challenges.these challenges.
  </p>
          <ExerciseForm v-if="value" />
        </div>
      </div>


</template>

<script>

import axios from 'axios';


export default {

  name: "App",

  data() {
    return {
      valueResponsePage: false,
      valueParameters: false,
      valueExercise: false,
      valueHome: true,
      navItemScale: 1,
      navItemColor: "#f0f0f0",
      sidenavWidth: "0",
      flaskResponse: null,
      loading: false,
    };
  },
  methods: {
    hoverNavItem() {
      this.navItemScale = 1.05;
      this.navItemColor = "#e6e6e6";
    },
    resetNavItemSize() {
      this.navItemScale = 1;
      this.navItemColor = "#f0f0f0";
    },
    openNav() {
      this.sidenavWidth = "250px";
    },

    closeNav() {
      this.sidenavWidth = "0";
    },

    showHome() {
      this.valueResponsePage = false;
      this.valueExercise = false ;
      this.valueHome = true ;
      this.valueParameters = false;
    },

    showExercise() {
      this.valueResponsePage = false;
      this.valueExercise = true ;
      this.valueHome = false ;
      this.valueParameters = false;
    },

    showParameters() {
      this.valueResponsePage = false;
      this.valueExercise = false ;
      this.valueHome = false ;
      this.valueParameters = true;
    },  
    
    showResponsePage() {
      this.valueResponsePage = true;
      this.valueExercise = false ;
      this.valueHome = false ; 
      this.valueParameters = false;
    },

    async submitForm() {
      this.loading = true;
    const formData = {
        impairmentLevel: this.impairmentLevel,
        exerciseLevel: this.exerciseLevel,
        selectedGuideline: this.selectedGuideline,
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
      console.log(jsonData);
      console.log(formData);
      console.log('Before Axios request');
      const response = await axiosInstance.post('http://127.0.0.1:5000', jsonData)
      console.log('After Axios request');
      // Log the response from the server
      console.log('Response from Flask server:', response.data);

      // Update your state or perform any other logic based on the response
      // For example, you can update a variable to display the response in your component
      this.flaskResponse = JSON.parse(response.data.response);
      console.log('Flask response:',this.flaskResponse);
      this.loading = false;
      this.showResponsePage();
      
    },
 
  },
   
};


</script>

<style>
#app {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column; /* Stack children vertically */
 /* Full viewport height */
}

.header {
  background-color: #000;
  color: #fff;
  padding: 8px;
  height: 8%; /* 8% of the height */
  display: flex;
  justify-content: space-between;
}

.header .beneath-section{
  align-items: left;
  text-align: center;
}

.header .title{
  align-items: center;
  margin: 0 auto;
}

.title {
  margin: 0; /* Remove default margin */
}

.main-container {
  display: flex;
  height: 92%; /* Remaining height */
}


.beneath-section {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: column;
}

.welcome-message {
  text-align: left;
}

.welcome-message h2 {
  color: #000;
  margin-bottom: 20px;
  text-align: center;
}

.welcome-message h3 {
  color: #000;
  margin-bottom: 10px;
  text-align: center;
}

.welcome-message strong {
  font-weight: bold;
}

/* The side navigation menu */
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: margin-left .5s;
  padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}


</style>

