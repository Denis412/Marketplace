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

export const statuses = [
  {
    id: "2363916507227203881",
    label: "Поиск исполнителя",
    color: "#C2410C",
    editable: true,
    icon: "/assets/icons/orders/magnifier.svg",
  },
  {
    id: "3814249250560291482",
    label: "Есть кандидат",
    color: "#166534",
    editable: true,
    icon: "/assets/icons/orders/human_orders.svg",
  },
  {
    //Нет макета в фигме
    id: "4837591619999500045",
    label: "Заключается сделка",
    color: "",
    editable: true,
    icon: "",
  },
  {
    id: "3133592897321301481",
    label: "Выполняется",
    color: "#C2410C",
    editable: false,
    icon: "/assets/icons/orders/clocks_orders.svg",
  },
  {
    id: "7494949799001030133",
    label: "Завершен",
    color: "#166534",
    editable: false,
    icon: "/assets/icons/orders/done_orders.svg",
  },
  {
    //Нет макета в фигме
    id: "2375299492231411693",
    label: "Оспаривается",
    color: "",
    editable: false,
    icon: "",
  },
  {
    id: "1725305287553643069",
    label: "Отменен заказчиком",
    color: "#B91C1C",
    editable: false,
    icon: "/assets/icons/orders/cancelled_orders.svg",
  },
  {
    //Нет макета в фигме
    id: "6243889424355631278",
    label: "Отменен исполнителем",
    color: "",
    editable: false,
    icon: "",
  },
  {
    id: "1744362893253691369",
    label: "Черновик",
    color: "#1D4ED8",
    editable: true,
    icon: "/assets/icons/orders/document_orders_blue.svg",
  },
];