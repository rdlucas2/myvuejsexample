//components/templates
const Home = {
    template: '#home-template'
}
const About = {
    template: '#about-template'
}

//routes
const routes = [{
    path: '/',
    linkTitle: 'Home',
    component: Home
}, {
    path: '/about',
    linkTitle: 'About',
    component: About
}]

//router - can add options
const router = new VueRouter({
    routes
})

//this component defined here to use the routes and router
const Nav = Vue.component('nav-vue', {
    template: '#nav-template',
    data: function() {
        return {
            router: router,
            routes: routes
        };
    }
})

//Create and mount the root instance.
const app = new Vue({
    router
}).$mount('#app')