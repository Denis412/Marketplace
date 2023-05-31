import { provideApolloClient, useMutation, useQuery } from "@vue/apollo-composable";
import {
  userSignUp,
  userSignIn,
  userSignUpSetPassword,
  userResetPasswordSendCode,
  userResetPasswordConfirmCodeSetPassword,
  updateSubject,
  updateSubjectInTeam,
} from "src/graphql/user/mutations";
import {
  getUser,
  getSubjectById,
  paginateSubjectsForInvite,
  paginateSubjectInAnotherSpace,
  paginateSubjectsInMainSpace,
  paginateSubjectsForMyTeams,
} from "src/graphql/user/queries";
import { convertSubject, convertUserData } from "src/utils/subject";

import apolloClient from "src/apollo/apollo-client";

import tokenApi from "./token";
import filesApi from "./file";
import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const { mutate: signUp } = useMutation(userSignUp);
const { mutate: signIn } = useMutation(userSignIn, spaceHeader(process.env.MAIN_SPACE_ID));
const { mutate: userSetPassword } = useMutation(userSignUpSetPassword);
const { mutate: updatingUser } = useMutation(updateSubject, spaceHeader(process.env.MAIN_SPACE_ID));
const { mutate: updatingUserInTeamSpace } = useMutation(updateSubjectInTeam);
const { mutate: resetPasswordSendCode } = useMutation(userResetPasswordSendCode);
const { mutate: resetPasswordConfirmCode } = useMutation(userResetPasswordConfirmCodeSetPassword);

const paginateSubjects = ({ where, page, perPage, space_id, is_invite, is_team, is_my_teams }) => {
  let query;

  if (is_invite) query = paginateSubjectsForInvite;
  else if (is_team) query = paginateSubjectInAnotherSpace;
  else if (is_my_teams) query = paginateSubjectsForMyTeams;
  else query = paginateSubjectsInMainSpace;

  console.log("query", query);

  return useQuery(
    query,
    { page, perPage, where },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const queryGetSubjectById = (id, space_id = 0) => {
  return useQuery(getSubjectById, { id }, spaceHeader(space_id || process.env.MAIN_SPACE_ID));
};

const queryGetUserById = (id) => {
  return useQuery(getUser, { id });
};

const refetchUserById = async (id) => {
  console.log("id", id);
  const { refetch } = queryGetUserById(id);

  const { data: userData } = await refetch();

  console.log("refetch user", userData);

  return userData.user;
};

const refetchPaginateSubjects = async ({ where, page, perPage, space_id, is_invite, is_team }) => {
  console.log("refetch params", { where, page, perPage, space_id, is_invite, is_team });
  const { refetch } = paginateSubjects({
    where,
    page,
    perPage,
    space_id,
    is_invite,
    is_team,
  });

  console.log("paginte passed");

  const { data: subjectsData } = await refetch();

  console.log("refetch paginate subjects", subjectsData);

  return subjectsData.paginate_subject.data;
};

const refetchSubjectById = async (id, space_id = 0) => {
  const { refetch } = queryGetSubjectById(id, space_id);

  const { data: subjectData } = await refetch();

  console.log("get subject", subjectData);

  return subjectData.get_subject;
};

const registration = async ({ name, surname, email }) => {
  console.log({ name, email, surname });
  const { data: userInfo } = await signUp({
    input: {
      name,
      surname,
      email,
      space_id: process.env.MAIN_SPACE_ID,
    },
  });

  console.log("registration", userInfo);

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

  console.log("send code", resetSendCode);

  return resetSendCode.userResetPasswordSendCode;
};

const userPasswordConfirmCode = async ({ user_id, code, password }) => {
  await resetPasswordConfirmCode({
    input: {
      user_id,
      code,
      password,
      send_mail: true,
    },
  });
};

const saveLocalUserData = (saveData) => {
  localStorage.setItem("user-data", JSON.stringify(saveData));
};

const saveUserData = async (userInfo) => {
  tokenApi.save(userInfo.userSignIn.record);

  const userData = await refetchUserById(userInfo.userSignIn.recordId);

  console.log("ghgh");

  // if (first_entry) {
  //   const { data: spaceData } = await creatingSpace({
  //     input: {
  //       name: userData.user.name,
  //       description: userData.user.surname,
  //     },
  //   });

  //   const { data: updateSubjectData } = await updatingUser({
  //     input: {
  //       personal_space_id: spaceData.spaceCreate.recordId,
  //     },
  //   });

  //   console.log("data", spaceData, updateSubjectData);
  // }

  console.log("userData", userData);

  saveLocalUserData({
    user_id: userInfo.userSignIn.recordId,
  });

  return userData;
};

const login = async ({ login, password }, first_entry = false, recovery = false) => {
  const { data: userInfo } = await signIn({
    input: {
      login,
      password,
    },
  });

  console.log("login", userInfo);

  const userData = recovery ? null : await saveUserData(userInfo);

  return userData?.user;
};

const update = async (id, updateData, is_team = false, space_id = 0) => {
  let subjectData;

  if (is_team)
    ({ data: subjectData } = await updatingUserInTeamSpace(
      { id, input: updateData },
      spaceHeader(space_id || process.env.MAIN_SPACE_ID)
    ));
  else
    ({ data: subjectData } = await updatingUser(
      { id, input: updateData },
      spaceHeader(space_id || process.env.MAIN_SPACE_ID)
    ));

  console.log("update subject", subjectData);

  return subjectData.update_subject.record;
};

const logout = () => {
  tokenApi.remove();

  localStorage.removeItem("user-data");
};

const isAuth = () => localStorage.getItem("user-data") && localStorage.getItem("refreshToken");

const uploadAvatar = async (file) => {
  const filesIds = await filesApi.uploadFiles(file);

  return filesIds[0];
};

const userApi = {
  paginateSubjects,
  queryGetSubjectById,
  queryGetUserById,
  refetchUserById,
  refetchPaginateSubjects,
  refetchSubjectById,
  registration,
  setPassword,
  userPasswordSendCode,
  userPasswordConfirmCode,
  login,
  saveLocalUserData,
  update,
  logout,
  isAuth,
  uploadAvatar,
};

export default userApi;
