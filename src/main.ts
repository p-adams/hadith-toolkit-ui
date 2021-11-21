import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { client } from "./api/client";
import App from "./App.vue";

createApp({
  setup() {
    provide(DefaultApolloClient, client);
  },
  render: () => h(App),
}).mount("#app");
