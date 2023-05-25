import { computed, ref } from "vue";

function baseQuery(method_link, variables = {}, options = {}) {
  return method_link?.({
    ...variables,
    ...options,
    page: variables.page || 1,
    perPage: variables.perPage || 50,
  });
}

export default class BaseService {
  static fetchApiPaginate(method_link, type_name, variables = {}, options = {}) {
    const refetchResult = ref(null);
    const refetchLoading = ref(null);
    const refetchError = ref(null);

    const result_name = "paginate_" + type_name;

    const {
      result: resultApi,
      loading: loadingApi,
      error: errorApi,
    } = baseQuery(method_link, variables, options);

    const result = computed(() =>
      options.only_one
        ? refetchResult.value ?? resultApi.value?.[result_name].data[0]
        : refetchResult.value ?? resultApi.value?.[result_name].data
    );
    const loading = computed(() => refetchLoading.value ?? loadingApi.value);
    const error = computed(() => refetchError.value ?? errorApi.value);

    async function refetch(variables) {
      const { refetch: refetchApi } = baseQuery(method_link, variables, options);

      const { data, loading, error } = await refetchApi(variables);

      refetchResult.value = data?.[result_name].data;
      refetchLoading.value = loading;
      refetchError.value = error;

      return options?.only_one ? refetchResult.value[0] : refetchResult.value;
    }

    return { result, loading, error, refetch };
  }
}
