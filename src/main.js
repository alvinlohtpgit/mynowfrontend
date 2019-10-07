import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import { Auth0Plugin } from "./auth";
import { domain, clientId } from "../auth_config.json";


Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    /*
    router.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );*/
    console.log('On Redirect Callback in main');
  }
});


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
