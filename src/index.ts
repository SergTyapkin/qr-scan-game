import { createApp } from 'vue';

import App from '~/App.vue';
import Store from '~/Store';
import createVueRouter from '~/Router';

import '~/styles/fontsLoader.styl';
import '~/styles/global.styl';
import swAPI from '~/serviceWorker/swAPI';

await swAPI.register();

const Router = createVueRouter();
const app = createApp(App).use(Router).use(Store).mount('#app');
Store.$app = app;
