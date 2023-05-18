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
import pageApi from '../page.js'

const fileStore = useFileStore()

provideApolloClient(apolloClient)

const uploadFiles = async (files) => {
  const { mutate } = useMutation(filesUpload)

  let data = mutate(
    {
      files,
    },
    {
      context: {
        hasUpload: true,
      },
    },
  )
  data.then((result)=>{pageApi.create({
    input: {
      title: files[0].name.slice(0,-5),
      page_type: "node",
      object: {
        id: BigInt(result.data.filesUpload.ids[0]).toString(),
        type_id: "6923351168454209144", //id типа файла
      },
    },
    space_id: 13,
  })})

  await response(
    'Файл добавлен',
    'Ошибка',
    () => {},
    fileStore.refetchFiles,
  )

  
}

const getFileHtmlByUrl = async (path, id, name, extension) => {
  //mode: no-cores
  const response = await fetch(
    `https://cdn.stud.druid.1t.ru/${path}/${id}.${extension}?n=${name}`,
    {
      mode: 'cors',
    },
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
  console.log('editorValue, fileName', editorValue, fileName)
  const blob = new Blob([editorValue], { type: 'text/html' })
  const formData = new FormData()

  formData.append('files', blob, `${fileName}.html`)

  const file = formData.getAll('files')

  upload(file)
}

const setTimeoutFunc = ({ minutes, func }) => {
  setTimeout(func, minutes * 60)
}

const updateFile = (name, doc) => {
  console.log(33333, doc)
  const { mutate } = useMutation(fileUpdate, () => ({
    variables: {
      input: {
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

export { filesApi }
