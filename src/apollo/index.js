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
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiZWQyNjg3ODBmODNlMzk4MTMzNTA2ZTJhNDllNTM1YjYwZjNhMTBiYWUzZDJjYjRkZTFkZjc1YmEzMDQ5NmJmNjBkMDc5NzJmNmNkOTIwZmQiLCJpYXQiOjE2ODAxOTQ5MTYuNzExNzU1LCJuYmYiOjE2ODAxOTQ5MTYuNzExNzU4LCJleHAiOjE3MTE4MTczMTYuNzAzMTY4LCJzdWIiOiI1MTIwMzYyMjI3MjE5NzUwODIwIiwic2NvcGVzIjpbXX0.s9UWCea3QbhY__q8-xWDAjekVSIjyRy-ePoYWimUH6SXbTj9Hnfythz6Rh8cx4EOu3NRzqmsSKe3qxHB5qcYN1CGoZMGUNaNhZ0mP2700NfCt42WzSEufzpVVyugs8KVMUH0pa3nIg2-jmHDbg3YVSnzP9TnoHLZimA3EmR4-3MX7oeW1aUv7xLFL3EHxPUY_vsWyF0k7pR3Wa97YHbOO9UkRFSYoIKHBEt1p5qyLX8-m4Gs4qkLVjUBS8a-riqfRd5NH2OeXAjDJiXU140AOoOnApIxdOvqMmPJp7ZLq6sXfsH-bXf7K04ExkJjavRWzAQ424vcPWaiTof76Mcla0q6uH9j8wSh_90E3aFQ8NIBcVwlNEXvu3n3mz2wTO9Nbvm8IHGo-oBG58aEdEOQU7TfGG4WkuDwlszAto-qILhZv4jVeKUtJ-MTeOKOZvelv-yF9v7Xqq6lx7-Eg1i8hCqUumQ1RSAV3zgbcnfh3lvyutDQBhrO9glLCuoN1lAPAPJH0kTeMnbfQAxC4iFx_0OGn0dDCdNXTvXr6FRTeCzNoUiMgyXIP4BY7Bt5lQsGWVt0xNmCZ3MpgaFHBBPlGbkscc53OKYsnCKMUQIVlS_BOAR-47SkcamyIQnq2boQtvXDpgdd_EbD-DaeGW1WkCsd5Ryu7GYAhZRUEgYoCh0";

    // console.log("cook", Cookies.get("access_token"));

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
    ApolloLink.split(
      (operation) => operation.getContext().hasUpload,
      uploadLink,
      httpLink
    )
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
