//stores
var weatherStore = {
    state: {
        location: 'Pittsburgh, PA',
        weather: null
    },
    getWeather(location) {
        location = encodeURIComponent(location);
        var apiUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + location + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.open('GET', apiUrl);
        xhr.onload = function() {
            self.state.weather = JSON.parse(xhr.responseText);
        }
        xhr.send();
    }
}

//views
const Home = {
    template: '#home-template'
}

const About = {
    template: '#about-template',
    data: function() {
        return {
            weatherStore: weatherStore
        }
    }

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
            weatherStore: weatherStore
        }
    },

    created: function() {
        if (this.weatherStore.state.weather) { return; }
        this.weatherStore.getWeather(this.weatherStore.state.location);
    }
});

//Create and mount the root instance.
const app = new Vue({
    router
}).$mount('#app');