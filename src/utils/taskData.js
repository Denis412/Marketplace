const columns = 
[
    {
      name: "Задача",
      align: "left",
      label: "Задача",
      field: "name",
      headerStyle:
        "font-family: 'Play'; font-weight: 400; font-size: 20px; padding-right: 200px; width: 600px",
      headerClasses: 'text-subtitle3'
      
    },
    {
      name: "Проект",
      label: "Проект",
      align: 'left',
      field: "Проект",
      sortable: true,
      headerStyle:
        "font-family: 'Play', Regular; font-weight: 400; font-size: 20px; padding-right: 20px;",
      headerClasses: 'text-subtitle3'
    },
    {
      name: "Дата начала",
      label: "Дата начала",
      field: "Дата начала",
      align: 'left',
      sortable: true,
      headerStyle:
        "font-family: 'Play', Regular; font-weight: 400; font-size: 20px;",
      headerClasses: 'text-subtitle3'
    },
    {
      name: "Дата окончания",
      label: "Дата окончания",
      field: "Дата окончания",
      align: 'left',
      sortable: true,
      headerStyle:
        "font-family: 'Play', Regular; font-weight: 400; font-size: 20px;",
      headerClasses: 'text-subtitle3'
    },
    {
      name: "Статус",
      label: "Статус",
      field: "Статус",
      align: 'left',
      sortable: true,
      headerStyle: "font-family: 'Play'; font-weight: 400; font-size: 20px;",
      headerClasses: 'text-subtitle3'
    },
];

const data = {  
    columns,
}

export { data }