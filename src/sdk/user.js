import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";
import {
  userSignUp,
  userSignIn,
  userSignUpSetPassword,
  userResetPasswordSendCode,
  userResetPasswordConfirmCodeSetPassword,
  userGroupInviteUser,
} from "src/graphql/user/mutations";
import { getUser, getSubject } from "src/graphql/user/queries";

import apolloClient from "src/apollo/apollo-client";
import tokenApi from "./token";

provideApolloClient(apolloClient);

const { refetch: refetchUser } = useQuery(getUser);
const { refetch: refetchSubject } = useQuery(getSubject, {
  where: {
    column: "user_id",
    operator: "EQ",
    value: "5571026735801383150",
  },
});

const { mutate: signUp } = useMutation(userSignUp);
const { mutate: signIn } = useMutation(userSignIn);
const { mutate: userSetPassword } = useMutation(userSignUpSetPassword);
const { mutate: invitingUser } = useMutation(userGroupInviteUser);
const { mutate: resetPasswordSendCode } = useMutation(
  userResetPasswordSendCode
);
const { mutate: resetPasswordConfirmCode } = useMutation(
  userResetPasswordConfirmCodeSetPassword
);

const inviteGroup = async ({ name, surname, email, group_id }) => {
  console.log(name, surname, email, group_id);

  const { data: userData } = await invitingUser({
    input: {
      name,
      surname,
      email,
      group_id,
    },
  });

  console.log("data", userData);
};

const registration = async ({ name, surname, email }) => {
  console.log("reg", { name, surname, email });
  const { data: userInfo } = await signUp({
    input: {
      name,
      surname,
      email,
    },
  });

  // console.log(userInfo, process.env.USERS_GROUP_ID);

  // const data = await inviteGroup({
  //   name,
  //   surname,
  //   email,
  //   group_id: process.env.USERS_GROUP_ID,
  // });

  // console.log(data, process.env.USERS_GROUP_ID);

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

  const { data: subjectData } = await refetchSubject({
    page: 1,
    perPage: 1,
    where: {
      column: "user_id",
      operator: "EQ",
      value: `${userInfo.userSignIn.recordId}`,
    },
  });

  const saveUserData = {
    first_name: subjectData.paginate_subject.data[0].fullname.first_name,
    middle_name: subjectData.paginate_subject.data[0].fullname.middle_name,
    last_name: subjectData.paginate_subject.data[0].fullname.last_name,
    user_id: userInfo.userSignIn.recordId,
    email: userData.user.email,
    avatar: userData.user.avatar,
    telegram_chat_id: userData.user.telegram_chat_id,
  };

  localStorage.setItem("user-data", JSON.stringify(saveUserData));

  return userData.user;
};

const logout = () => {
  tokenApi.remove();

  localStorage.removeItem("user-data");
};

const isAuth = () =>
  localStorage.getItem("user-data") && localStorage.getItem("refreshToken");

const userApi = {
  registration,
  setPassword,
  userPasswordSendCode,
  userPasswordConfirmCode,
  login,
  inviteGroup,
  logout,
  isAuth,
};

export default userApi;
