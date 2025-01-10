<template>
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <router-link to="/" class="nav-link px-2 text-white">Home</router-link>
            </li>
          </ul>
          <div class="text-end" v-if="!isAuthenticated">
            <router-link to="/login" class="btn btn-outline-light me-2">Login</router-link>
          </div>

          <div class="text-end" v-if="!isAuthenticated">
            <router-link to="/register" class="btn btn-outline-light me-2">Register</router-link>
          </div>
          
          <div class="text-end" v-if="isAuthenticated && isOnOldStories" >
            <router-link to="/posts" class="btn btn-outline-light me-2" >Generate Stories</router-link>
          </div>

          <div class="text-end" v-if="isAuthenticated && isNotOnOldStories">
            <router-link to="/oldstories" class="btn btn-outline-light me-2" >Old stories</router-link>
          </div>

          <div class="text-end" v-if="isAuthenticated">
            <router-link to="/" class="btn btn-outline-light me-2" @click.prevent="onLogout()">Logout</router-link>
          </div>

        </div>
      </div>
    </header>
</template>
  
<script>
  import { mapActions, mapGetters } from 'vuex';
import {
    IS_USER_AUTHENTICATE_GETTER,
    LOGOUT_ACTION,
} from '../store/storeconstants';
export default {
  name: "TheNav",
    computed: {
        ...mapGetters('auth', {
            isAuthenticated: IS_USER_AUTHENTICATE_GETTER,
            
        }),

        isOnOldStories() {
          return this.$route.name === 'OldStories';
        },

        isNotOnOldStories() {
          return this.$route.name !== 'OldStories';
        }
    },
    methods: {
        ...mapActions('auth', {
            logout: LOGOUT_ACTION,
        }),
        onLogout() {
            this.logout();
            this.$router.replace('/login');
        },
        

    },
};
</script>
  