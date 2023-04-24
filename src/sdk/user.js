import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";

import {
  userSignUp,
  userSignIn,
  userSignUpSetPassword,
} from "src/graphql/user/mutations";

provideApolloClient(apolloClient);

const { mutate: signUp } = useMutation(userSignUp);
const { mutate: signIn } = useMutation(userSignIn);
const { mutate: userSetPassword } = useMutation(userSignUpSetPassword);

const registration = async ({ name, surname, email }) => {
  const { data: userInfo } = await signUp({
    input: {
      name,
      surname,
      email,
    },
  });

  return userInfo.userSignUp;
};

const setPassword = async ({ user_id, password, code }) => {
  await userSetPassword({
    input: {
      user_id,
      password,
      code,
    },
  });
};

const login = async ({ login, password }) => {
  const { data: userInfo } = await userSignIn({
    login,
    password,
  });

  localStorage.setItem("token", userInfo.userSignIn.record.access_token);

  return userInfo.userSignIn;
};

const userApi = { registration, setPassword, login };

export default userApi;
