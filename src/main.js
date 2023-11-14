import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import RoomPage from './components/RoomPage.vue';

const app = createApp(App);
const pinia = createPinia();

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
