import { computed, ref } from "vue";

function basePaginateQuery(method_link, variables = {}, options = {}) {
  return method_link?.({
    ...variables,
    ...options,
    page: variables.page || 1,
    perPage: options?.only_one ? 1 : variables.perPage || 50,
  });
}

function baseQueryById(method_link, variables = {}, options = {}) {
  return method_link?.({ ...variables, ...options });
}

async function baseMutation(method_link, variables = {}, options = {}) {
  console.log("fksdgksd", method_link.name, variables, options);
  return await method_link?.({
    input: variables,
    ...options,
  });
}

function extractPropertyData(result, get = false) {
  if (get) return result ? Object.keys(result).map((key) => result[key])[0] : null;

  return result ? Object.keys(result).map((key) => result[key]["data"])[0] : null;
}

export default class BaseService {
  static fetchApiById(method_link, variables = {}, options = {}) {
    const refetchResult = ref(null);
    const refetchLoading = ref(null);
    const refetchError = ref(null);

    const {
      result: resultApi,
      loading: loadingApi,
      error: errorApi,
    } = baseQueryById(method_link, variables, options);

    const result = computed(
      () => refetchResult.value ?? extractPropertyData(resultApi.value, true)
    );
    const loading = computed(() => refetchLoading.value ?? loadingApi.value);
    const error = computed(() => refetchError.value ?? errorApi.value);

    async function refetch(refetch_variables = null, refetch_options = null) {
      try {
        const { data, loading, error } = await baseQueryById(
          method_link,
          refetch_variables ?? variables,
          refetch_options ?? options
        ).refetch(refetch_variables ?? variables);

        console.log("data", data);

        if (!refetch_options?.update_parent_query)
          return {
            data: extractPropertyData(data, true),
            loading,
            error,
          };

        refetchResult.value = extractPropertyData(data, true);
        refetchLoading.value = loading;
        refetchError.value = error;
      } catch (e) {
        refetchLoading.value = false;
        refetchError.value = e;
      }

      return {
        data: refetchResult.value,
        loading: refetchLoading.value,
        error: refetchError.value,
      };
    }

    return { result, loading, error, refetch };
  }

  static fetchApiPaginate(method_link, variables = {}, options = {}) {
    const refetchResult = ref(null);
    const refetchLoading = ref(null);
    const refetchError = ref(null);

    const {
      result: resultApi,
      loading: loadingApi,
      error: errorApi,
    } = basePaginateQuery(method_link, variables, options);

    const result = computed(() =>
      options.only_one
        ? refetchResult.value ?? extractPropertyData(resultApi.value)?.[0]
        : refetchResult.value ?? extractPropertyData(resultApi.value)
    );
    const loading = computed(() => refetchLoading.value ?? loadingApi.value);
    const error = computed(() => refetchError.value ?? errorApi.value);

    async function refetch(refetch_variables = null, refetch_options = null) {
      try {
        // console.log("refetch start", variables, refetch_variables, options, refetch_options);

        const { data, loading, error } = await basePaginateQuery(
          method_link,
          refetch_variables ?? variables,
          refetch_options ?? options
        ).refetch(refetch_variables ?? variables);

        // console.log("refetch data", data);

        if (!refetch_options?.update_parent_query)
          return {
            data:
              refetch_options?.only_one || options?.only_one
                ? extractPropertyData(data)?.[0]
                : extractPropertyData(data),
            loading: refetchLoading.value,
            error: refetchError.value,
          };

        // console.log("refetch pass", data);

        refetchResult.value =
          refetch_options?.only_one || options?.only_one
            ? extractPropertyData(data)?.[0]
            : extractPropertyData(data);
        refetchLoading.value = loading;
        refetchError.value = error;
      } catch (e) {
        refetchLoading.value = false;
        refetchError.value = e;
      }

      return {
        data: refetchResult.value,
        loading: refetchLoading.value,
        error: refetchError.value,
      };
    }

    return { result, loading, error, refetch };
  }

  static async apiMutation(method_link, variables = {}, options = {}, mutates = null) {
    // return extractPropertyData(await method_link?.({ ...variables, ...options }), true);
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    try {
      loading.value = true;

      result.value = await baseMutation(method_link, variables, options);

      if (mutates && mutates.length) {
        result.value = result.value ? [Object.assign({}, result.value)] : [];

        for (let mutate of mutates) {
          result.value.push(
            await baseMutation(method_link, mutate.variables, mutate.options ?? options)
          );
        }
      }
    } catch (e) {
      error.value = e;

      console.log(e);
    }

    loading.value = false;

    async function mutate(mutate_variables, mutate_options) {
      try {
        return await baseMutation(
          method_link,
          mutate_variables ?? variables,
          mutate_options ?? options
        );
      } catch (e) {
        console.log("error", e);
      }
    }

    return { result, loading, error, mutate };
  }
}
