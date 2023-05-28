import filesApi from "src/sdk/file";
import typeApi from "src/sdk/type";
import userApi from "src/sdk/user";
import { convertSubject } from "src/utils/convertSubject";
import { computed } from "vue";
import BaseService from "./BaseService";

export default class UserService {
  static async fetchCurrentUser() {
    const subjectsData = await userApi.refetchPaginateSubjects({
      page: 1,
      perPage: 1,
      where: {
        column: "user_id",
        operator: "EQ",
        value: JSON.parse(localStorage.getItem("user-data")).user_id,
      },
    });

    const userData = await userApi.refetchUserById(
      JSON.parse(localStorage.getItem("user-data")).user_id
    );

    console.log("data subject", subjectsData[0]);

    const currentUserData = convertSubject({
      ...userData,
      ...subjectsData[0],
      // avatar: await filesApi.fetchImageFile(subjectsData[0].avatar),
    });

    return currentUserData;
  }

  static fetchSubjectPaginate(variables = {}, options = {}) {
    return BaseService.fetchApiPaginate(userApi.paginateSubjects, variables, options);
  }

  static fetchSubjectById(variables = {}, options = {}) {
    const {
      result: resultUser,
      loading: loadingUser,
      error: errorUser,
      refetch: refetchUser,
    } = userApi.queryGetSubjectById({
      ...variables,
      ...options,
      is_team: options.space_id,
    });

    const result = computed(() => resultUser.value.get_subject);
    const loading = computed(() => loadingUser.value);
    const error = computed(() => errorUser.value);

    const refetch = async (variables, options) => {
      const { data } = await refetchUser(variables, options);

      return data.get_subject;
    };

    return { result, loading, error, refetch };
  }

  static async subjectUpdate({ subject, id, input, is_team, space_id }) {
    const subjectData = await userApi.refetchPaginateSubjects({
      page: 1,
      perPage: 1,
      where: {
        column: "email",
        operator: "FTS",
        value: subject.email,
      },
      is_team,
      space_id,
    });

    await userApi.update(subjectData[0].id, input, is_team, space_id);
  }

  static async leaveTeam({ subject, input }) {}

  signIn() {}
  signUp() {}
  signOut() {}

  sendTeamApplication() {}
}
