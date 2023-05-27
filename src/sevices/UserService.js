import filesApi from "src/sdk/file";
import typeApi from "src/sdk/type";
import userApi from "src/sdk/user";
import { convertSubject } from "src/utils/convertSubject";
import { computed } from "vue";
import BaseService from "./BaseService";

export default class UserService {
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

  static async fetchCurrentUser() {
    const subjectData = await this.fetchSubjectPaginate().refetch(
      {
        where: {
          column: "user_id",
          operator: "EQ",
          value: JSON.parse(localStorage.getItem("user-data")).user_id,
        },
      },
      { only_one: true }
    );

    console.log("fetch in api passed");

    // const userData = await userApi.refetchUserById(
    //   JSON.parse(localStorage.getItem("user-data")).user_id
    // );

    console.log("data subject", subjectData);

    const currentUserData = convertSubject({
      // ...userData,
      ...subjectData,
    });

    return currentUserData;
  }

  static async subjectUpdate({ subject, id, input, is_team, space_id }) {
    const subjectData = await this.fetchSubjectPaginate(
      {
        where: {
          column: "email",
          operator: "FTS",
          value: subject.email,
        },
      },
      { only_one: true, space_id }
    ).refetch();

    await userApi.update(subjectData.id, input, is_team, space_id);

    console.log("udpate subject");
  }

  static async leaveTeam({ subject, input }) {}

  signIn() {}
  signUp() {}
  signOut() {}

  sendTeamApplication() {}
}
