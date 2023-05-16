const columns = 
[
    {
      name: "Задача",
      align: "left",
      label: "Задача",
      field: "Задача",
      headerStyle:
        "font-family: 'Play'; font-weight: 400; font-size: 20px; padding-right: 260px;",
    },
    {
      name: "Проект",
      label: "Проект",
      align: "right",
      field: "Проект",
      sortable: true,
      headerStyle:
        "font-family: 'Play', Regular; font-weight: 400; font-size: 20px; padding-right: 30px;",
    },
    {
      name: "Дата начала",
      label: "Дата начала",
      field: "Дата начала",
      sortable: true,
      headerStyle:
        "font-family: 'Play', Regular; font-weight: 400; font-size: 20px;",
    },
    {
      name: "Дата окончания",
      label: "Дата окончания",
      field: "Дата окончания",
      sortable: true,
      headerStyle:
        "font-family: 'Play', Regular; font-weight: 400; font-size: 20px;",
    },
    {
      name: "Статус",
      label: "Статус",
      field: "Статус",
      sortable: true,
      headerStyle: "font-family: 'Play'; font-weight: 400; font-size: 20px;",
    },
];

const data = {  
    columns,
}

export { data }