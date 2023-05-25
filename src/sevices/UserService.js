import typeApi from "src/sdk/type";
import userApi from "src/sdk/user";
import { convertSubject } from "src/utils/convertSubject";
import { computed, ref } from "vue";

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

    const currentUserData = convertSubject({
      ...userData,
      ...subjectsData[0],
    });

    return currentUserData;
  }

  // static fetchSubjectPaginate(variables = {}, options = {}) {
  //   const refetchResult = ref(null);
  //   const refetchLoading = ref(null);
  //   const refetchError = ref(null);

  //   const {
  //     result: resultUser,
  //     loading: loadingUser,
  //     error: errorUser,
  //   } = userApi.paginateSubjects({
  //     ...variables,
  //     ...options,
  //     page: variables.page || 1,
  //     perPage: variables.perPage || 50,
  //     is_team: options.space_id,
  //   });

  //   const result = computed(() =>
  //     options.only_one
  //       ? refetchResult.value ?? resultUser.value?.paginate_subject.data[0]
  //       : refetchResult.value ?? resultUser.value?.paginate_subject.data
  //   );
  //   const loading = computed(() => refetchLoading.value ?? loadingUser.value);
  //   const error = computed(() => refetchError.value ?? errorUser.value);

  //   async function refetch(variables) {
  //     const { refetch: refetchUser } = userApi.paginateSubjects({
  //       ...variables,
  //       ...options,
  //       page: variables.page || 1,
  //       perPage: variables.perPage || 50,
  //       is_team: options?.space_id,
  //     });

  //     const { data, loading, error } = await refetchUser(variables);

  //     refetchResult.value = data.paginate_subject.data;
  //     refetchLoading.value = loading;
  //     refetchError.value = error;

  //     return options?.only_one ? refetchResult.value[0] : refetchResult.value;
  //   }

  //   return { result, loading, error, refetch };
  // }

  // static fetchApiPaginate(method_link, result_name, variables = {}, options = {}) {
  //   const refetchResult = ref(null);
  //   const refetchLoading = ref(null);
  //   const refetchError = ref(null);

  //   const {
  //     result: resultApi,
  //     loading: loadingApi,
  //     error: errorApi,
  //   } = method_link?.({
  //     ...variables,
  //     ...options,
  //     page: variables.page || 1,
  //     perPage: variables.perPage || 50,
  //   });

  //   const result = computed(() =>
  //     options.only_one
  //       ? refetchResult.value ?? resultApi.value?.[result_name].data[0]
  //       : refetchResult.value ?? resultApi.value?.[result_name].data
  //   );
  //   const loading = computed(() => refetchLoading.value ?? loadingApi.value);
  //   const error = computed(() => refetchError.value ?? errorApi.value);

  //   async function refetch(variables) {
  //     const { data, loading, error } = await method_link?.({
  //       ...variables,
  //       ...options,
  //       page: variables.page || 1,
  //       perPage: variables.perPage || 50,
  //       is_team: options?.space_id,
  //     }).refetch(variables);

  //     refetchResult.value = data?.[result_name].data;
  //     refetchLoading.value = loading;
  //     refetchError.value = error;

  //     return options?.only_one ? refetchResult.value[0] : refetchResult.value;
  //   }

  //   return { result, loading, error, refetch };
  // }

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
