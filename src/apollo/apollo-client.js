import { ApolloClient } from "@apollo/client/core";
import { getClientOptions } from "src/apollo";

const options = getClientOptions();
const apolloClient = new ApolloClient(options);

export default apolloClient;
