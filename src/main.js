import { createApp } from 'vue';
import App from './App.vue';
import { pinia } from './store/';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import RoomPage from './components/RoomPage.vue';


const app = createApp(App);


app.use(pinia);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },

    { path: '/room/:room', component: RoomPage, props: true },
  ],
});

app.use(router);
app.mount('#app');
