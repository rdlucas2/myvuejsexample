//views
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
}];

//router - can add options
const router = new VueRouter({
    routes
});

//components
const Nav = Vue.component('nav-vue', {
    template: '#nav-template',
    data: function() {
        return {
            router: router,
            routes: routes
        };
    }
});

const Weather = Vue.component('weather-vue', {
    template: '#weather-template',
    data: function() {
        return {
            currentWeather: null,
            currentLocation: 'Pittsburgh, PA'
        }
    },

    created: function() {
        this.fetchData(this.currentLocation);
    },

    watch: {
        currentBranch: 'fetchData'
    },

    methods: {
        fetchData: function(location) {
            location = encodeURIComponent(location);
            var apiUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + location + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.open('GET', apiUrl);
            xhr.onload = function() {
                self.currentWeather = JSON.parse(xhr.responseText);
                console.log(self.currentWeather);
            }
            xhr.send();
        }
    }
});

//Create and mount the root instance.
const app = new Vue({
    router
}).$mount('#app');