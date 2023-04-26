import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";

import {
  userSignUp,
  userSignIn,
  userSignUpSetPassword,
  userResetPasswordSendCode,
  userResetPasswordConfirmCodeSetPassword,
} from "src/graphql/user/mutations";
import { getUser } from "src/graphql/user/queries";
import tokenApi from "./token";

provideApolloClient(apolloClient);

const { refetch: refetchUser } = useQuery(getUser);

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
  console.log("reg", { name, surname, email });

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
  console.log("code", { user_id, password, code });
  await userSetPassword({
    input: {
      user_id,
      password,
      code,
    },
  });
};

const userPasswordSendCode = async ({ email }) => {
  const { data: resetSendCode } = await resetPasswordSendCode({
    input: {
      email,
    },
  });

  return resetSendCode.userResetPasswordSendCode;
};

const userPasswordConfirmCode = async ({ user_id, code, password }) => {
  await resetPasswordConfirmCode({
    input: {
      user_id,
      code,
      password,
    },
  });
};

const login = async ({ login, password }) => {
  const { data: userInfo } = await signIn({
    input: {
      login,
      password,
    },
  });

  tokenApi.save(userInfo.userSignIn.record);

  const { data: userData } = await refetchUser({
    id: userInfo.userSignIn.recordId,
  });

  localStorage.setItem("user-data", JSON.stringify(userData.user));

  return userData.user;
};

const logout = () => {
  tokenApi.remove();

  localStorage.removeItem("user-data");
};

const userApi = {
  registration,
  setPassword,
  userPasswordSendCode,
  userPasswordConfirmCode,
  login,
  logout,
};

export default userApi;
