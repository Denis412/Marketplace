import orderApi from "src/sdk/order";

export const addTodo = (id, form, order) => {
  if (!order?.draft && order) return;

  if (!form.hasOwnProperty("todos") && order) {
    form.todos = [];
    Object.assign(form.todos, order.todos);
  }

  if (
    form.todos.includes(id) &&
    (order?.todos.length > 1 || form.todos.length > 1)
  )
    form.todos.splice(form.todos.indexOf(id), 1);
  else if (!form.todos.includes(id)) form.todos.push(id);

  if (!order) return;
  else order.todos = form.todos;
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
