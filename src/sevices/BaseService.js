import { computed, ref } from "vue";

function baseQuery(method_link, variables = {}, options = {}) {
  return method_link?.({
    ...variables,
    ...options,
    page: variables.page || 1,
    perPage: options?.only_one ? 1 : variables.perPage || 50,
  });
}

function extractPropertyData(result) {
  return result ? Object.keys(result).map((key) => result[key].data)[0] : null;
}

export default class BaseService {
  static fetchApiPaginate(method_link, variables = {}, options = {}) {
    const refetchResult = ref(null);
    const refetchLoading = ref(null);
    const refetchError = ref(null);

    const {
      result: resultApi,
      loading: loadingApi,
      error: errorApi,
    } = baseQuery(method_link, variables, options);

    const result = computed(() =>
      options.only_one
        ? refetchResult.value ?? extractPropertyData(resultApi.value)?.[0]
        : refetchResult.value ?? extractPropertyData(resultApi.value)
    );
    const loading = computed(() => refetchLoading.value ?? loadingApi.value);
    const error = computed(() => refetchError.value ?? errorApi.value);

    async function refetch(refetch_variables = null, refetch_options = null) {
      const { data, loading, error } = await baseQuery(
        method_link,
        refetch_variables ?? variables,
        refetch_options ?? options
      ).refetch(refetch_variables ?? variables);

      refetchResult.value =
        refetch_options?.only_one || options?.only_one
          ? extractPropertyData(data)?.[0]
          : extractPropertyData(data);
      refetchLoading.value = loading;
      refetchError.value = error;

      return refetchResult.value;
    }

    return { result, loading, error, refetch };
  }
}
