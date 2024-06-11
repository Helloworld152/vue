import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import UserPage from "../views/UserPage.vue";
import Posts from "../views/Posts.vue";
import AddPost from "@/views/AddPost.vue";
import MyPosts from "@/views/MyPosts.vue";

const routes = [
    {
        path:'/',
        name:'Home',
        component:Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/userinfo',
        name: 'UserInfo',
        component: UserPage,
        meta: {
            requiredAuth: true
        }
    },
    {
        path: '/posts',
        name: 'Posts',
        component: Posts
    },
    {
        path: '/addpost',
        name: 'AddPost',
        component: AddPost,
        meta: {
            requiredAuth: true
        }
    },
    {
        path: '/myposts',
        name: 'MyPosts',
        component: MyPosts,
        meta: {
            requiredAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    if (to.meta.requiredAuth && !isAuthenticated)
    {
        next({name: 'Login'});
    }
    else
    {
        next();
    }
})

export default router;