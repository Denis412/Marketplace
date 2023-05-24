import userApi from "src/sdk/user";
import { computed, ref } from "vue";

export default class UserService {
  _user = ref(null);

  static fetchUserPaginate(variables = {}, options = {}) {
    const {
      result: resultUser,
      loading: loadingUser,
      error: errorUser,
      refetch: refetchUser,
    } = userApi.paginateSubjects({
      ...variables,
      ...options,
      page: variables.page || 1,
      perPage: variables.perPage || 50,
      is_team: options.space_id,
    });

    const result = computed(() =>
      options.only_one
        ? resultUser.value.paginate_subject.data[0]
        : resultUser.value.paginate_subject.data
    );
    const loading = computed(() => loadingUser.value);
    const error = computed(() => errorUser.value);

    const refetch = async (variables, options) => {
      const { data } = await refetchUser(variables, options);

      return options.only_one ? data.paginate_subject.data[0] : data.paginate_subject.data;
    };

    return { result, loading, error, refetch };
  }

  getUser() {
    return;
  }

  signIn() {}
  signUp() {}
  signOut() {}

  sendApplication() {}
}
