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
  updateSubject,
} from "src/graphql/user/mutations";
import { getUser, getSubject } from "src/graphql/user/queries";
import { convertSubject, convertUserData } from "src/utils/subject";

import apolloClient from "src/apollo/apollo-client";
import tokenApi from "./token";
import filesApi from "./file";

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
const { mutate: updatingUser } = useMutation(updateSubject, {
  context: {
    headers: {
      space: process.env.MAIN_SPACE_ID,
    },
  },
});
const { mutate: resetPasswordSendCode } = useMutation(
  userResetPasswordSendCode
);
const { mutate: resetPasswordConfirmCode } = useMutation(
  userResetPasswordConfirmCodeSetPassword
);

const subjectGetByUserId = async (id) => {
  const { data: subjectData } = await refetchSubject({
    where: {
      column: "user_id",
      operator: "EQ",
      value: `${id}`,
    },
  });

  return subjectData.paginate_subject.data[0];
};

const subjectGetById = async (id) => {
  const { data: subjectData } = await refetchSubject({
    where: {
      column: "id",
      operator: "EQ",
      value: `${id}`,
    },
  });

  return subjectData.paginate_subject.data[0];
};

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

const saveLocalUserData = (saveData) => {
  localStorage.setItem("user-data", JSON.stringify(saveData));
};

const saveUserData = async (userInfo) => {
  tokenApi.save(userInfo.userSignIn.record);

  const { data: userData } = await refetchUser({
    id: userInfo.userSignIn.recordId,
  });

  console.log("userData", userData, userInfo);

  const subject = await subjectGetByUserId(userInfo.userSignIn.recordId);

  console.log("subjectData", subject);

  saveLocalUserData({
    ...convertSubject(subject),
    ...convertUserData(userData),
  });

  return userData;
};

const login = async ({ login, password }, recovery = false) => {
  const { data: userInfo } = await signIn({
    input: {
      login,
      password,
    },
  });

  const userData = recovery ? null : saveUserData(userInfo);

  return userData?.user;
};

const update = async (id, updateData) => {
  console.log(id, updateData);

  const { data: subjectData } = await updatingUser({
    id,
    input: updateData,
  });

  console.log(subjectData);
};

const logout = () => {
  tokenApi.remove();

  localStorage.removeItem("user-data");
};

const isAuth = () =>
  localStorage.getItem("user-data") && localStorage.getItem("refreshToken");

const uploadAvatar = async (file) => {
  const filesIds = await filesApi.uploadFiles(file);

  return filesIds[0];
};

const userApi = {
  registration,
  setPassword,
  userPasswordSendCode,
  userPasswordConfirmCode,
  login,
  inviteGroup,
  subjectGetById,
  saveLocalUserData,
  update,
  logout,
  isAuth,
  uploadAvatar,
};

export default userApi;
