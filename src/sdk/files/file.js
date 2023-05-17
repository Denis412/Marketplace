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
import pageApi from 'src/sdk/page'

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

const getFileHtmlByUrl = async (path, id, name, extension) => {
  //mode: no-cores
  const response = await fetch(
    // `${process.env.FILE_STORAGE_URI}${path}/${id}.${extension}?n=${name}`,
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

const getRootPage = async (rootPageId, space_id) => {
  let data_tree = []
  let rootPage = null
  rootPage = await pageApi.refetchQueryPageById({
    id: rootPageId,
    space_id: space_id,
  })

  if (rootPage.page.children.data.length > 0) {
    await getChildrenPages(rootPage.page.children.data, data_tree, space_id)
  }
  console.log(8, data_tree)
  return data_tree
}

const getChildrenPages = async (children, parent, space_id) => {
  let page = null
  for (const child of children) {
    page = await pageApi.refetchQueryPageById({
      id: child.id,
      space_id: space_id,
    })

    const childData = {
      title_page: page.page.title,
      object_id: page.page.object.id,
      page_id: page.page.id,
      children: [],
    }

    if (parent.children == undefined) {
      parent.push(childData)
    } else {
      parent.children.push(childData)
    }
    if (page.page.children.data.length > 0) {
      await getChildrenPages(page.page.children.data, childData, space_id)
    }
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
  getRootPage,
  getChildrenPages,
}

export { filesApi }
