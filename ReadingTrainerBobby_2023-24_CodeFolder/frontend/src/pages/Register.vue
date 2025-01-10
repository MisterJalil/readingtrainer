<template>
  <div class="wrapper">
  <div>
      <h1 class="h3 mb-3 font-weight-normal">Please register</h1>
      <hr />
  </div>
  <div class="alert alert-danger" v-if="error">
      {{ error }}
  </div>
  <form class="form-signin" @submit.prevent="onSignup">
    <div class="form-group">

    <label>First Name</label>
    <input v-model="firstName" class="form-control" v-model.trim="firstName" placeholder="First Name" required>
    
    <label>Last Name</label>
    <input v-model="lastName" class="form-control" placeholder="Last Name" required>

    <label>Email</label>
    <div class="form-group">
      <input v-model="email" class="form-control" v-model.trim="email" placeholder="Email" required/>
      <div class="error" v-if="errors.email">
        {{ errors.email }}
      </div>
    </div>
    
    <label>Password</label>
    <div class="form-group">
      <input v-model="password" type="password" class="form-control" v-model.trim="password" placeholder="Password" required/>
      <div class="error" v-if="errors.email">
        {{ errors.password }}
      </div>
    </div>
    
    <label>Confirm Password</label>
    <input v-model="passwordConfirm" type="password" class="form-control" placeholder="Password Confirm" required>
    <hr>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>

    </div>
    
  </form>
  </div>
</template>

<script>

import RegisterValidations from '../services/RegisterValidations';
import { mapActions, mapMutations } from 'vuex';
import {
    LOADING_SPINNER_SHOW_MUTATION,
    SIGNUP_ACTION,
} from '../store/storeconstants';

export default {
  name: "RegisterPage",
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            errors: [],
            error: '',
        };
    },
    beforeRouteLeave() {
        console.log('rote leaving');
        console.log(this.$store);
    },
    beforeRouteEnter(_, _1, next) {
        next((vm) => {
            console.log('route entering');
            console.log(vm.$store.state.auth);
        });
    },
    methods: {
        ...mapActions('auth', {
            signup: SIGNUP_ACTION,
        }),

        ...mapMutations({
            showLoading: LOADING_SPINNER_SHOW_MUTATION,
        }),
        async onSignup() {
            let validations = new RegisterValidations(
                this.email,
                this.password,
                this.passwordConfirm,
            );

            this.errors = validations.checkValidations();
            if ('email' in this.errors || 'password' in this.errors) {
                return false;
            }
            //make spinner true
            this.showLoading(true);
            //signup registration
            try {
                await this.signup({
                    email: this.email,
                    password: this.password,
                    passwordConfirm: this.passwordConfirm,
                });
            } catch (error) {
                this.error = error;
                this.showLoading(false);
            }
            this.showLoading(false);
            this.$router.replace('/login');
            //make spinner false
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
    height: 600px;
    -webkit-text-fill-color: white;
    padding: 40px 55px 45px 55px;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    border-radius: 20px;
    transition: all 1s;
  }
</style>
