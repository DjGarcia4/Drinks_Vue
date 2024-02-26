import "./assets/main.css";
import { plugin, defaultConfig } from "@formkit/vue";
import config from "../formkit.config";

import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig(config));
app.use(ToastPlugin);

app.mount("#app");
