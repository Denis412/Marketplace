import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";

import {
  userSignUp,
  userSignIn,
  userSignUpSetPassword,
  userResetPasswordSendCode,
  userResetPasswordConfirmCodeSetPassword,
} from "src/graphql/user/mutations";

provideApolloClient(apolloClient);

const { mutate: signUp } = useMutation(userSignUp);
const { mutate: signIn } = useMutation(userSignIn);
const { mutate: userSetPassword } = useMutation(userSignUpSetPassword);
const { mutate: resetPasswordSendCode } = useMutation(
  userResetPasswordSendCode
);
const { mutate: resetPasswordConfirmCode } = useMutation(
  userResetPasswordConfirmCodeSetPassword
);

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

const userPasswordSendCode = async ({ email }) => {
  await resetPasswordSendCode({
    email,
  });
};

const userPasswordConfirmCode = async ({ user_id, code, password }) => {
  await resetPasswordConfirmCode({
    user_id,
    code,
    password,
  });
};

const login = async ({ login, password }) => {
  const { data: userInfo } = await signIn({
    login,
    password,
  });

  localStorage.setItem("token", userInfo.userSignIn.record.access_token);

  return userInfo.userSignIn;
};

const userApi = {
  registration,
  setPassword,
  userPasswordSendCode,
  userPasswordConfirmCode,
  login,
};

export default userApi;
