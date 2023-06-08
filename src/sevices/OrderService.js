import { ref } from "vue";

import orderApi from "src/sdk/order";
import BaseService from "src/sevices/BaseService";
import orderTypeApi from "src/sdk/order_type";

export default class OrderService {
  static fetchAllOrders(variables = {}, options = {}) {
    return BaseService.fetchApiPaginate(orderApi.ordersPaginate, variables, options);
  }

  static fetchOrderTypes(variables = {}, options = {}) {
    return BaseService.fetchApiPaginate(orderTypeApi.paginateOrderTypes, variables, options);
  }

  static fetchOrderById(id, options = {}) {
    return BaseService.fetchApiById(orderApi.queryOrderById, { id }, options);
  }

  static async createOrder(variables = {}, options = {}) {
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    try {
      loading.value = true;

      result.value = await BaseService.apiMutation(orderApi.orderCreate, variables, options);
    } catch (e) {
      error.value = e;

      console.log(e);
    }

    loading.value = false;

    return { result, loading, error };
  }

  static async updateOrder(variables = {}, options = {}) {
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    try {
      loading.value = true;

      result.value = await BaseService.apiMutation(orderApi.update, variables, options);
    } catch (e) {
      error.value = e;

      console.log(e);
    }

    loading.value = false;

    return { result, loading, error };
  }
}
