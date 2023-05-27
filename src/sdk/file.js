import { provideApolloClient, useMutation, useQuery } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { filesUpload, fileUpdate, fileDelete } from "src/graphql/files/mutations";
import { ApolloClient } from "@apollo/client/core";
import { getClientOptions } from "src/apollo/index";
import { getFiles } from "src/graphql/files/queries";

provideApolloClient(apolloClient);

const { mutate } = useMutation(filesUpload);
const { refetch } = useQuery(getFiles);

const uploadFiles = async (files) => {
  console.log(files);

  const { data: uploadedData } = await mutate(
    {
      files,
    },
    {
      context: {
        hasUpload: true,
      },
    }
  );

  return uploadedData.filesUpload.ids;
};

const getFileHtmlByUrl = async (path, id, name) => {
  //mode: no-cores
  console.log(path, id, name);
  const response = await fetch(`https://cdn.stud.druid.1t.ru/${path}/${id}.html?n=${name}`, {
    method: "post",
  });
  const html = await response.text();

  let res = await Promise.resolve(html);
  console.log(1111111111111, res);

  return res;
};

const fetchImageFile = async (url) => {
  const response = await fetch(url, {
    method: "no-cors",
  });
  const link = URL.createObjectURL(await response.blob());

  return link;
};

const upload = async (files) => {
  try {
    console.log(files);
    await uploadFiles(files);
  } catch (error) {
    console.log(error);
  }
};

const createHtmlFile = async function ({ editorValue, fileName }) {
  const blob = new Blob([editorValue], { type: "text/html" });

  const formData = new FormData();
  formData.append("files", blob, `${fileName}.html`);
  const file = formData.getAll("files");

  upload(file);
};

const setTimeoutFunc = ({ minutes, func }) => {
  setTimeout(func, minutes * 60);
};

const renameDocument = (scope, doc) => {
  console.log(scope);
  console.log(doc);
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
  }));
  mutate();
};

const deleteDoc = function (id) {
  console.log(id);
  const apolloClient = new ApolloClient(getClientOptions());
  provideApolloClient(apolloClient);
  const { mutate } = useMutation(fileDelete, () => ({
    variables: {
      id: id,
    },
  }));
  mutate();
};

const get = async (file_id) => {
  const { data: fileData } = await refetch({
    page: 1,
    perPage: 50,
    where: {
      column: "id",
      operator: "EQ",
      value: `${file_id}`,
    },
  });

  console.log(fileData);

  return fileData.paginate_file.data;
};

const getUrl = (file) => {
  return `${process.env.FILE_STORAGE_URI}/${file.path}/${file.id}.${file.extension}?n=${file.name}`;
};

const updateRouteId = (id_route, routeParamsId) => {
  id_route = routeParamsId;
  console.log(id_route);
};

const filesApi = {
  uploadFiles,
  getFileHtmlByUrl,
  createHtmlFile,
  upload,
  setTimeoutFunc,
  renameDocument,
  fetchImageFile,
  deleteDoc,
  getUrl,
  get,
  updateRouteId,
};

export default filesApi;
