<template>
  <div class="wrapper">
  <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
  <hr />
  <div class="alert alert-danger" v-if="error">
    {{ error }}
  </div>
  
  <form class="form-signin" @submit.prevent="onLogin()">
    
    <div class="form-group">
      <label>Email</label>
      <input v-model="email" type="email" class="form-control" placeholder="Email" required>
      <div class="error" v-if="errors.email">
        {{ errors.email }}
      </div>
    </div>
    <div class="form-group">
      <label>Password</label>
      <input v-model="password" type="password" class="form-control" placeholder="Password" required>
      <div class="error" v-if="errors.password">
        {{ errors.password }}
      </div>
    </div>

    <div class="mb-2">
      <router-link to="/forgot">Forgot Password?</router-link>
    </div>

    <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
  </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import LoginValidations from '../services/LoginValidations';
import {
    LOADING_SPINNER_SHOW_MUTATION,
    LOGIN_ACTION,
} from '../store/storeconstants';
export default {
  name: "LoginPage",
    data() {
        return {
            email: '',
            password: '',
            errors: [],
            error: '',
        };
    },
    methods: {
        ...mapActions('auth', {
            login: LOGIN_ACTION,
        }),
        ...mapMutations({
            showLoading: LOADING_SPINNER_SHOW_MUTATION,
        }),
        async onLogin() {
            let validations = new LoginValidations(
                this.email,
                this.password,
            );

            this.errors = validations.checkValidations();
            if (this.errors.length) {
                return false;
            }
            this.error = '';

            this.showLoading(true);
            //Login check
            try {
                await this.login({
                    email: this.email,
                    password: this.password,
                });
            } catch (e) {
                this.error = e;
                this.showLoading(false);
            }

            this.showLoading(false);
            this.$router.push('/posts');
        },
    },
};
</script>

<style scoped>
.wrapper{
  background-color: rgb(33 37 41);
  justify-content: center;
  margin: auto;
  margin-top: 50px;
  width: 600px;
  height: 400px;
  -webkit-text-fill-color: white;
  padding: 40px 55px 45px 55px;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  border-radius: 20px;
  transition: all 1s;
}
</style>