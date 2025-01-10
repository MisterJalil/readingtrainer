import {createRouter, createWebHistory} from 'vue-router'
import store from './store/store';
import { IS_USER_AUTHENTICATE_GETTER } from './store/storeconstants';

const Login = () =>
    import(/* webpackChunkName: "Login" */ './pages/Login.vue');
const Register = () => import('./pages/Register.vue');
const Home = () => import('./pages/Home.vue');
const Post = () => import('./pages/Post.vue');
const Response = () => import('./pages/Response.vue');
const OldStories = () => import('./pages//oldStories/oldStory.vue');
const OldStoryDetails = () => import('./pages//oldStories/oldStoryDetails.vue');

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login, meta: { auth: false } },
    {path: '/register', component: Register, meta: { auth: false } },
    {path: '/posts', component: Post, meta: { auth: true }, name: 'Post' },
    {path: '/response', component: Response, meta: { auth: false } },
    {path: '/oldstories', component: OldStories, meta: { auth: true }, name: 'OldStories' },
    {path: '/oldstorydetails/:id', component: OldStoryDetails, meta: { auth: true }, name: 'OldStoryDetails' },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (
        'auth' in to.meta &&
        to.meta.auth &&
        !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        next('/login');
    /*} else if (
        'auth' in to.meta &&
        !to.meta.auth &&
        store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        next('/posts');*/
    } else {
        next();
    }
});

export default router