import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import apolloClient from 'src/apollo/apollo-client'
import {
  filesUpload,
  fileUpdate,
  fileDelete,
} from 'src/graphql/files/mutations'
import { ApolloClient } from '@apollo/client/core'
import { getClientOptions } from 'src/apollo/index'
import { Notify } from 'quasar'
import { useFileStore } from 'src/stores/file'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const fileStore = useFileStore()

provideApolloClient(apolloClient)

const uploadFiles = async (files) => {
  const { mutate } = useMutation(filesUpload)

  await mutate(
    {
      files,
    },
    {
      context: {
        hasUpload: true,
      },
    },
  )

  const data = await response(
    'Файл добавлен',
    'Ошибка',
    () => {},
    fileStore.refetchFiles,
  )

  // console.log(BigInt(data.data.filesUpload.ids[0]).toString())
}

const getFileHtmlByUrl = async (path, id, name) => {
  //mode: no-cores
  const response = await fetch(
    `https://cdn.stud.druid.1t.ru/${path}/${id}.html?n=${name}`,
  )
  const html = await response.text()

  let res = await Promise.resolve(html)

  return res
}

const upload = async (files) => {
  try {
    await uploadFiles(files)
  } catch (error) {
    console.log(error)
  }
}

const createHtmlFile = async function (editorValue = '', fileName = 'UNKNOWN') {
  const blob = new Blob([editorValue], { type: 'text/html' })
  console.log('blob', blob)
  const formData = new FormData()

  formData.append('files', blob, `${fileName}.html`)

  const file = formData.getAll('files')

  upload(file)
}

const setTimeoutFunc = ({ minutes, func }) => {
  setTimeout(func, minutes * 60)
}

const updateFile = (name, doc) => {
  console.log(name)
  const { mutate } = useMutation(fileUpdate, () => ({
    variables: {
      input: {
        title: name,
        path: doc.path,
        size: doc.size,
        name: name + '.html',
        short_link: doc.short_link,
        extension: doc.extension,
        disk: doc.disk,
        hash: doc.hash,
      },
      id: doc.id,
    },
  }))

  response('Файл обновлен', 'Ошибка', mutate, fileStore.refetchFiles)
}

const deleteDoc = function (id) {
  const apolloClient = new ApolloClient(getClientOptions())
  provideApolloClient(apolloClient)
  const { mutate } = useMutation(fileDelete, () => ({
    variables: {
      id: id,
    },
  }))

  response('Документ удален', 'Ошибка', mutate, fileStore.refetchFiles)
}

const updateRouteId = (id_route, routeParamsId) => {
  id_route = routeParamsId
}

const response = async function (
  ms1,
  ms2,
  mutation = async () => {
    console.log('empty refetch')
  },
  refetch = async () => {
    console.log('empty refetch')
  },
) {
  try {
    let data = await mutation()
    await refetch()
    Notify.create({
      type: 'positive',
      message: ms1,
    })
    return data
  } catch (err) {
    console.log(err)
    Notify.create({
      type: 'negative',
      message: ms2,
    })
  }
}

const filesApi = {
  uploadFiles,
  getFileHtmlByUrl,
  createHtmlFile,
  upload,
  setTimeoutFunc,
  updateFile,
  deleteDoc,
  updateRouteId,
}

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
export { filesApi, data }
