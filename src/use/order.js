import orderApi from "src/sdk/order";

export const addTodo = (id, form, order) => {
  if (!order?.draft && order) return;

  if (!form.hasOwnProperty("order_type") && order) {
    form.order_type = [];
    Object.assign(form.order_type, order.order_type);
  }

  if (
    form.order_type.includes(id) &&
    (order?.order_type.length > 1 || form.order_type.length > 1)
  )
    form.order_type.splice(form.order_type.indexOf(id), 1);
  else if (!form.order_type.includes(id)) form.order_type = id;

  if (!order) return;
  else order.order_type = form.order_type;
};

export const setValue = (value, form, order) => {
  form[value] = order[value];
};

export const setPrice = (form, order) => {
  form.price_start = order.price_start;
  form.price_end = order.price_end;
};

export const editOrder = (form, order) => {
  if (form.name) order.name = form.name;
  orderApi.orderEdit(form, order.id, order.name);
};
