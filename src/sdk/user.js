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
} from "src/graphql/user/queries";
import { convertSubject, convertUserData } from "src/utils/subject";

import apolloClient from "src/apollo/apollo-client";
import tokenApi from "./token";
import filesApi from "./file";

provideApolloClient(apolloClient);

const { mutate: signUp } = useMutation(userSignUp);
const { mutate: signIn } = useMutation(userSignIn, {
  context: {
    headers: {
      space: process.env.MAIN_SPACE_ID,
    },
  },
});
const { mutate: userSetPassword } = useMutation(userSignUpSetPassword);
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

const queryPaginateSubject = (space_id, where) => {
  return useQuery(
    getSubject,
    {
      where,
    },
    {
      context: {
        headers: {
          space: space_id,
        },
      },
    }
  );
};

const queryPaginateSubjectOtherSpace = (space_id, where) => {
  return useQuery(
    getOtherSpaceSubjectPaginate,
    {
      where,
    },
    {
      context: {
        headers: {
          space: space_id,
        },
      },
    }
  );
};

const queryUser = (space_id, id) => {
  return useQuery(
    getUser,
    {
      id,
    },
    {
      context: {
        headers: {
          space: space_id,
        },
      },
    }
  );
};

const querySubjectById = (space_id, id) => {
  return useQuery(
    getSubjectById,
    {
      id,
    },
    {
      context: {
        headers: {
          space: space_id,
        },
      },
    }
  );
};

const getUserById = async (space_id, id) => {
  const { refetch } = queryUser(space_id, id);

  const { data: userData } = await refetch();

  return userData.user;
};

const getPaginateSubject = async (space_id, where) => {
  const { refetch } = queryPaginateSubjectOtherSpace(space_id, where);

  const { data: subjectData } = await refetch();

  return subjectData.paginate_subject.data;
};

const subjectGetById = async (space_id, id) => {
  const { refetch } = querySubjectById(space_id, id);

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

  const subject = await getPaginateSubject(process.env.MAIN_SPACE_ID, {
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
  subjectGetById,
  getPaginateSubject,
  saveLocalUserData,
  update,
  logout,
  isAuth,
  uploadAvatar,
};

export default userApi;
