<template>
    <div class="form-container">
        <div class="wrapper1">
    <!-- Book -->
    <div class="book">
        <input type="checkbox" id="c1" />
        <input type="checkbox" id="c2" />
        <input type="checkbox" id="c3" />
        <input type="checkbox" id="c4" />
    
        <div id="cover" >
            <div v-for="story in stories" :key="story.id">
                <div v-if="story.images && story.images.length > 0">
                    <img :src="story.images[0].url"/>
                </div>
            </div>
        </div>
    <!-- Paper 1 -->
        <div class="flip-book">
          <div class="flip" id="p1">
          <div class="back">
            <div v-for="story in stories" :key="story.id">
                <div v-if="story.images && story.images.length > 0">
                    <img :src="story.images[1].url"/>
                </div>
            </div>  
             
            <label class="back-btn" for="c1">Back</label>
          </div>
          <div class="front">
            <div v-for="story in stories" :key="story.id">
                <h2>{{ story.title }}</h2>
            
            </div>
            
            <div v-for="story in stories" :key="story.id">
                <div v-if="story.content && story.content.length > 0">
                    <p>{{ story.content[0] }}</p>
                </div>
                
            </div>
            <label class="next-btn" for="c1">Next</label>
            </div>
        </div>
        <!-- Paper 2 -->
        <div class="flip" id="p2">
            <div class="back">
                <div v-for="story in stories" :key="story.id">
                    <div v-if="story.images && story.images.length > 0">
                        <img :src="story.images[2].url"/>
                    </div>
                </div>   
              <label class="back-btn" for="c2">Back</label>
            </div>
            <div class="front">
                <div v-for="story in stories" :key="story.id">
                    <h2>{{ story.title }}</h2>                
                </div>
                <div v-for="story in stories" :key="story.id">
                    <div v-if="story.content && story.content.length > 0">
                        <p>{{ story.content[1] }}</p>
                    </div>
                    
                </div>
              <label class="next-btn" for="c2">Next</label>
          </div>
        </div>
        <!-- Paper 3 -->
        <div class="flip" id="p3">
            <div class="back">
                <div v-for="story in stories" :key="story.id">
                    <div v-if="story.images && story.images.length > 0">
                        <img :src="story.images[3].url"/>
                    </div>
                </div>   
              <label class="back-btn" for="c3">Back</label>
            </div>
            <div class="front">
                <div v-for="story in stories" :key="story.id">
                    <h2>{{ story.title }}</h2>                
                </div>
                <div v-for="story in stories" :key="story.id">
                    <div v-if="story.content && story.content.length > 0">
                        <p>{{ story.content[2] }}</p>
                    </div>
                    
                </div>
              <label class="next-btn" for="c3">Next</label>
          </div>
        </div>
        <!-- Paper 4 -->
        <div class="flip" id="p4">
            <div class="back">   
                <img src="../img/back_cover.jpg"/>
                <label class="back-btn" for="c4">Back</label>
            </div>
            <div class="front">
                <div v-for="story in stories" :key="story.id">
                    <h2>{{ story.title }}</h2>
                </div>
                <div v-for="story in stories" :key="story.id">
                    <div v-if="story.content && story.content.length > 0">
                        <p>{{ story.content[3] }}</p>
                    </div>
                    
                </div>
                <label class="next-btn" for="c4">Next</label>
          </div>
        </div>
        </div>
    </div>
    </div>
    </div>

</template>

<script>
    export default {
    name: "ResponsePage",
    data() {
        return {
            stories: [],       
        }
    },
    
    mounted(){
        this.fetchLatestStory();

    },

    methods: {
        async fetchLatestStory() {
      try {
        const response = await fetch('http://localhost:3000/stories');
        const stories = await response.json();
        if (stories.length > 0) {
          const latestStory = stories[stories.length - 1];
          this.stories = [latestStory];
        } else {
          this.stories = [];
        }

        
      } catch (err) {
        console.error('Error fetching latest story:', err);
      }
    }
    
  }
}
</script>

<style scoped>

.wrapper1{
    background-color: rgb(33 37 41);
    
    align-items: center;
    width: 1048px;
    height: 536px;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    border-radius: 20px;
    transition: all 1s;
    padding: 10px 10px 5px 10px;
}
.form-container {
    display: flex;
    justify-content: center; /* Horizontally center the grid container */
    align-items: center;     /* Vertically center the grid container */
    min-height: 100vh;       /* Full viewport height to center vertically */
    padding: 20px; 
  }
/*
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}*/
body {
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    background: linear-gradient(90deg, #fff 50%, #4a1010 50%);
}

input{
    display: none;
}
img{
    width: 100%;
    height: 100%;
}
.book{
    display: flex;
}
#cover{
    width: 512px;
    height: 512px;
}
.flip-book{
    width: 512px;
    height: 512px;
    position: relative;
    perspective: 1500px;
}
.flip{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: left;
    transform-style: preserve-3d;
    transform: rotateY(0deg);
    transition: .5s;
    color: #000;
}
p{
    font-size: 14px;
    line-height: 24px;

}
.front{
    position:absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff ;
    box-sizing: border-box;
    padding: 0 13px;
    box-shadow: inset 20px 0 50px rgba(0, 0, 0, 0.5) 0 2px 5px rgba(0, 0, 0, 0.5);

}
.back{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    background-color: #000;
}
.next-btn{
    position: absolute;
    bottom: 13px;
    right: 13px;
    cursor: pointer;
    color: #000;
}
.back-btn{
    position: absolute;
    bottom: 13px;
    right: 13px;
    cursor: pointer;
    color: #fff;
}
#p1{
    z-index: 4;
}
#p2{
    z-index: 3;
}
#p3{
    z-index: 2;
}

#p4{
    z-index: 1;
}
#c1:checked ~ .flip-book #p1{
    transform: rotatey(-180deg);
    z-index: 1;
}
#c2:checked ~ .flip-book #p2{
    transform: rotatey(-180deg);
    z-index: 2;
}
#c3:checked ~ .flip-book #p3{
    transform: rotatey(-180deg);
    z-index: 3;
}

#c4:checked ~ .flip-book #p4{
    transform: rotatey(-180deg);
    z-index: 4;
}
</style>




