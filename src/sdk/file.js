import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import apolloClient from 'src/apollo/apollo-client'
import {
  filesUpload,
  fileUpdate,
  fileDelete,
} from 'src/graphql/files/mutations'
import { ApolloClient } from '@apollo/client/core'
import { getClientOptions } from 'src/apollo/index'

provideApolloClient(apolloClient)

const { mutate } = useMutation(filesUpload)

const uploadFiles = async (files) => {
  console.log(files)

  const data = await mutate(
    {
      files,
    },
    {
      context: {
        hasUpload: true,
      },
    },
  )

  console.log(BigInt(data.data.filesUpload.ids[0]).toString())
}

const getFileFetch = (path, id, name) => {
  fetch(`https://cdn.stud.druid.1t.ru/${path}/${id}.html?n=${name}`).then(
    (response) => {
      response
        .text()
        .then((html) => {
          console.log(html)
          return html
        })
        .catch((err) => console.log(err))
    },
  )
}

const upload = async (files) => {
  try {
    console.log(files)
    await uploadFiles(files)
  } catch (error) {
    console.log(error)
  }
}

const createHtmlFile = async function ({ editorValue, fileName }) {
  const blob = new Blob([editorValue], { type: 'text/html' })

  const formData = new FormData()
  formData.append('files', blob, `${fileName}.html`)
  const file = formData.getAll('files')

  upload(file)
}

const setTimeoutFunc = ({ minutes, func }) => {
  setTimeout(func, minutes * 60)
}

const renameDocument = (scope, doc) => {
  console.log(scope)
  console.log(doc)
  const { mutate } = useMutation(fileUpdate, () => ({
    variables: {
      input: {
        title: scope,
        path: doc.path,
        size: doc.size,
        name: scope,
        short_link: doc.short_link,
        extension: doc.extension,
        disk: doc.disk,
        hash: doc.hash,
      },
      id: doc.id,
    },
  }))
  mutate()
}

const deleteDoc = function (id) {
  console.log(id)
  const apolloClient = new ApolloClient(getClientOptions())
  provideApolloClient(apolloClient)
  const { mutate } = useMutation(fileDelete, () => ({
    variables: {
      id: id,
    },
  }))
  mutate()
}

const filesApi = {
  uploadFiles,
  getFileFetch,
  createHtmlFile,
  upload,
  setTimeoutFunc,
  renameDocument,
  deleteDoc,
}

export default filesApi
