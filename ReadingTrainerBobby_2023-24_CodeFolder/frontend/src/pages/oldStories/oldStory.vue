<template>
    <div class="story">
        <div class="wrapper">
            <div class="margin">
                <div v-for="story in stories" :key="story.id" class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <router-link :to="{name: 'OldStoryDetails', params:{id:story.id}}" class="btn btn-outline-light me-2" >
                        <h2>{{story.title}}</h2>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "OldStory",
    data() {
        return {
            stories: [],        
        }
    },
mounted(){
        fetch('http://localhost:3000/stories')
            .then(res => res.json())
            .then(data => this.stories = data)
            .catch(err => console.log(err.message))

    },

}

</script>

<style scoped>

.wrapper{
    background-color: rgb(33 37 41);
    justify-content: center;
    margin: auto;
    margin-top: 50px;
    width: 600px;
    height: 500px;
    -webkit-text-fill-color: white;
    padding: 40px 55px 45px 55px;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    border-radius: 20px;
    transition: all 1s;
    padding: 20px;
    margin: 100px auto;
    overflow: auto;
    color: rgba(0, 0, 0, 0);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  }
  

*::-webkit-scrollbar,
*::-webkit-scrollbar-thumb {
  width: 26px;
  border-radius: 13px;
  background-clip: padding-box;
  border: 10px solid transparent;
}

*::-webkit-scrollbar-thumb {        
  box-shadow: inset 0 0 0 10px;
}

.wrapper:hover{
    color: rgba(0, 0, 0, 0.3);
}
.margin{
    margin: 10px;
    padding: 10px;

}

.wrapper{
    overflow:auto;
}

.story h2{
    padding: 20px;
    border-radius: 10px;
    margin: 10px auto;
    max-width: 600px;
    cursor: pointer;
  }
  .story h2:hover {
    -webkit-text-fill-color: black;
  }
  .story a{
    text-decoration: none;
  }

</style>