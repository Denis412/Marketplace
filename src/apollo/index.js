import { createHttpLink, InMemoryCache } from "@apollo/client/core";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { Cookies } from "quasar";
import tokenApi from "src/sdk/token";
import { ApolloLink, concat } from "@apollo/client/core";

export /* async */ function getClientOptions(/* {app, router, ...} */) {
  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_URI || "https://app.stud.druid.1t.ru/graphql",
    // credentials: "include",
  });

  const uploadLink = createUploadLink({
    uri: process.env.GRAPHQL_URI || "https://app.stud.druid.1t.ru/graphql",
    // credentials: "include",
  });

  const authLink = setContext((_, { headers }) => {
    const token = tokenApi.getTokenData()?.access_token;

    return !token
      ? { headers: { ...headers } }
      : {
          headers: {
            ...headers,
            authorization: `Bearer ${token}`,
          },
        };
  });

  const link = concat(
    authLink,
    ApolloLink.split((operation) => operation.getContext().hasUpload, uploadLink, httpLink)
  );

  return Object.assign(
    // General options.
    {
      link: link,
      cache: new InMemoryCache(),
    },
    // Specific Quasar mode options.
    process.env.MODE === "spa"
      ? {
          //
        }
      : {},
    process.env.MODE === "ssr"
      ? {
          //
        }
      : {},
    process.env.MODE === "pwa"
      ? {
          //
        }
      : {},
    process.env.MODE === "bex"
      ? {
          //
        }
      : {},
    process.env.MODE === "cordova"
      ? {
          //
        }
      : {},
    process.env.MODE === "capacitor"
      ? {
          //
        }
      : {},
    process.env.MODE === "electron"
      ? {
          //
        }
      : {},
    // dev/prod options.
    process.env.DEV
      ? {
          //
        }
      : {},
    process.env.PROD
      ? {
          //
        }
      : {},
    // For ssr mode, when on server.
    process.env.MODE === "ssr" && process.env.SERVER
      ? {
          ssrMode: true,
        }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === "ssr" && process.env.CLIENT
      ? {
          ssrForceFetchDelay: 100,
        }
      : {}
  );
}
