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

export const statuses = [
  {
    id: process.env.ORDER_STATUS_1,
    label: "Поиск исполнителя",
    color: "#C2410C",
    editable: true,
    icon: "/assets/icons/orders/magnifier.svg",
  },
  {
    id: process.env.ORDER_STATUS_2,
    label: "Есть кандидат",
    color: "#166534",
    editable: true,
    icon: "/assets/icons/orders/human_orders.svg",
  },
  {
    //Нет макета в фигме
    id: process.env.ORDER_STATUS_3,
    label: "Заключается сделка",
    color: "",
    editable: true,
    icon: "",
  },
  {
    id: process.env.ORDER_STATUS_4,
    label: "Выполняется",
    color: "#C2410C",
    editable: false,
    icon: "/assets/icons/orders/clocks_orders.svg",
  },
  {
    id: process.env.ORDER_STATUS_5,
    label: "Завершен",
    color: "#166534",
    editable: false,
    icon: "/assets/icons/orders/done_orders.svg",
  },
  {
    //Нет макета в фигме
    id: process.env.ORDER_STATUS_6,
    label: "Оспаривается",
    color: "",
    editable: false,
    icon: "",
  },
  {
    id: process.env.ORDER_STATUS_7,
    label: "Отменен заказчиком",
    color: "#B91C1C",
    editable: false,
    icon: "/assets/icons/orders/cancelled_orders.svg",
  },
  {
    //Нет макета в фигме
    id: process.env.ORDER_STATUS_8,
    label: "Отменен исполнителем",
    color: "",
    editable: false,
    icon: "",
  },
  {
    id: process.env.ORDER_STATUS_0,
    label: "Черновик",
    color: "#1D4ED8",
    editable: true,
    icon: "/assets/icons/orders/document_orders_blue.svg",
  },
];