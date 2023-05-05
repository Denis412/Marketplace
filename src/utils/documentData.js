import { useQuasar } from 'quasar'

const $q = useQuasar()

const lightPalette = [
  '#ffccccaa',
  '#ffe6ccaa',
  '#ffffccaa',
  '#ccffccaa',
  '#ccffe6aa',
  '#ccffffaa',
  '#cce6ffaa',
  '#ccccffaa',
  '#e6ccffaa',
  '#ffccffaa',
  '#ffffffaa',
  '#00ff00aa',
  '#ff0000aa',
  '#ff8000aa',
  '#00ff80aa',
  '#00ffffaa',
  '#0080ffaa',
  '#0000ffaa',
  '#8000ffaa',
  '#ff00ffaa',
]

const textPalette = [
  '#ff0000',
  '#ff8000',
  '#ffff00',
  '#000000',
  '#00ff80',
  '#00ffff',
  '#0080ff',
  '#0000ff',
  '#8000ff',
  '#ff00ff',
]

const toolbar = [
  ['undo', 'redo'],
  [
    {
      label: $q?.lang.editor.fontSize,
      fixedIcon: true,
      list: 'no-icons',
      options: ['p', 'h4', 'h5', 'h6'],
    },
  ],
  ['token'],
  ['underline', 'strike', 'bold', 'italic'],
  [
    {
      icon: $q?.iconSet.editor.align,
      fixedLabel: true,
      list: 'only-icons',
      options: ['left', 'center', 'right', 'justify'],
    },
    'outdent',
    'indent',
    'ordered',
    'unordered',
  ],
  ['removeFormat', 'link', 'hr'],
  ['print'],
]

const monthNames = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
]

const data = {
  lightPalette,
  textPalette,
  toolbar,
  monthNames,
}

export { data }
