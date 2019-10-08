import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import axios from 'axios';
import { Auth0Plugin } from "./auth";
import { domain, clientId } from "../auth_config.json";
import VueFirestore from 'vue-firestore';
import Firebase from 'firebase';


Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(VueFirestore);

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
    console.log("in main : user is " + this.$user.name);
  }
});
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
