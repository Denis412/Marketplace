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
  updateSubject,
} from "src/graphql/user/mutations";
import {
  getUser,
  getSubject,
  getSubjectById,
  getOtherSpaceSubjectPaginate,
  paginateSubjectForInvite,
} from "src/graphql/user/queries";
import { convertSubject, convertUserData } from "src/utils/subject";

import apolloClient from "src/apollo/apollo-client";

import tokenApi from "./token";
import filesApi from "./file";
import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const { mutate: signUp } = useMutation(userSignUp);
const { mutate: signIn } = useMutation(
  userSignIn,
  spaceHeader(process.env.MAIN_SPACE_ID)
);
const { mutate: userSetPassword } = useMutation(userSignUpSetPassword);
const { mutate: updatingUser } = useMutation(
  updateSubject,
  spaceHeader(process.env.MAIN_SPACE_ID)
);
const { mutate: resetPasswordSendCode } = useMutation(
  userResetPasswordSendCode
);
const { mutate: resetPasswordConfirmCode } = useMutation(
  userResetPasswordConfirmCodeSetPassword
);

const queryPaginateSubject = (space_id = 0, where = null) => {
  if (space_id) {
    return useQuery(
      getOtherSpaceSubjectPaginate,
      {
        where,
      },
      spaceHeader(space_id)
    );
  }

  return useQuery(
    getSubject,
    {
      where,
    },
    spaceHeader(process.env.MAIN_SPACE_ID)
  );
};

const queryPaginateSubjectsForInvite = () => {
  return useQuery(
    paginateSubjectForInvite,
    {
      page: 1,
      perPage: 100,
    },
    spaceHeader(process.env.MAIN_SPACE_ID)
  );
};

const queryUser = (space_id, id) => {
  return useQuery(
    getUser,
    {
      id,
    },
    spaceHeader(space_id)
  );
};

const querySubjectById = (id, space_id = 0) => {
  if (space_id) {
    return useQuery(
      getSubjectById,
      {
        id,
      },
      spaceHeader(space_id)
    );
  }

  return useQuery(
    getSubjectById,
    {
      id,
    },
    spaceHeader(process.env.MAIN_SPACE_ID)
  );
};

const getUserById = async (space_id, id) => {
  const { refetch } = queryUser(space_id, id);

  const { data: userData } = await refetch();

  return userData.user;
};

const getPaginateSubject = async (where) => {
  const { refetch } = queryPaginateSubject(where);

  const { data: subjectData } = await refetch();

  return subjectData.paginate_subject.data;
};

const getPaginateSubjectOtherSpace = async (space_id, where) => {
  const { refetch } = queryPaginateSubject(space_id, where);

  const { data: subjectData } = await refetch();

  return subjectData.paginate_subject.data;
};

const subjectGetById = async (id) => {
  const { refetch } = querySubjectById(id);

  console.log("user");

  const { data: subjectData } = await refetch();

  console.log("user", subjectData);

  return subjectData.get_subject;
};

const subjectGetByIdOtherSpace = async (space_id, id) => {
  const { refetch } = querySubjectById(id, space_id);

  console.log("user");

  const { data: subjectData } = await refetch();

  console.log("user", subjectData);

  return subjectData.get_subject;
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

const saveUserData = async (userInfo, first_entry = false) => {
  tokenApi.save(userInfo.userSignIn.record);

  const userData = await getUserById(
    process.env.MAIN_SPACE_ID,
    userInfo.userSignIn.recordId
  );

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

  console.log("userData", userData, userInfo);

  const subject = await getPaginateSubject({
    column: "user_id",
    operator: "EQ",
    value: userInfo.userSignIn.recordId,
  });

  console.log("subjectData", subject[0]);

  saveLocalUserData({
    ...convertSubject(subject[0]),
    ...convertUserData(userData),
    user_id: userInfo.userSignIn.recordId,
  });

  return userData;
};

const login = async (
  { login, password },
  first_entry = false,
  recovery = false
) => {
  const { data: userInfo } = await signIn({
    input: {
      login,
      password,
    },
  });

  // console.log(login, password, "hello");

  const userData = recovery ? null : await saveUserData(userInfo, first_entry);

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
  queryPaginateSubject,
  subjectGetById,
  subjectGetByIdOtherSpace,
  queryPaginateSubjectsForInvite,
  getPaginateSubject,
  getPaginateSubjectOtherSpace,
  saveLocalUserData,
  update,
  logout,
  isAuth,
  uploadAvatar,
};

export default userApi;
