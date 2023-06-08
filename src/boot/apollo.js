import { ApolloClients } from "@vue/apollo-composable";
import { boot } from "quasar/wrappers";
import apolloClient from "src/apollo/apollo-client";

export default boot(({ app }) => {
  const apolloClients = {
    default: apolloClient,
  };

  app.provide(ApolloClients, apolloClients);
});
