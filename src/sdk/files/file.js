import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import {
  filesUpload,
  fileUpdate,
  fileDelete,
} from "src/graphql/files/mutations";
import { ApolloClient } from "@apollo/client/core";
import { getClientOptions } from "src/apollo/index";
import { Notify } from "quasar";
import { useFileStore } from "src/stores/file";
import pageApi from "src/sdk/page.js";
import { getFileById } from "src/graphql/files/queries";
import { spaceHeader } from "src/utils/spaceHeader";
import EventBus from "./eventBus";

const fileStore = useFileStore();

provideApolloClient(apolloClient);

const { mutate: uploadFile } = useMutation(filesUpload);
const { mutate: updateFiles } = useMutation(fileUpdate);
const { mutate: deleteFiles } = useMutation(fileDelete);

const uploadFiles = async ({ files, parent_id, space_id, fileName }) => {
  console.log("upload", files);

  let data = await uploadFile(
    {
      files,
    },
    {
      context: {
        hasUpload: true,
      },
    }
  );
  await response("Файл добавлен", "Ошибка", () => {}, fileStore.refetchFiles);
  console.log(data);
  await pageApi.create({
    input: {
      title: fileName,
      page_type: "node",
      parent_id: parent_id || "4440891212883535597",
      object: {
        id: data.data.filesUpload.ids[0],
        type_id: "6923351168454209144",
      },
    },
    space_id: space_id,
  });
  EventBus.emit("document-added");
};

const getFileHtmlByUrl = async (path, id, name, extension) => {
  //mode: no-cores
  const response = await fetch(
    // `${process.env.FILE_STORAGE_URI}${path}/${id}.${extension}?n=${name}`,
    `https://cdn.stud.druid.1t.ru/${path}/${id}.${extension}?n=${name}`,
    {
      mode: "cors",
    }
  );
  const html = await response.text();

  let res = await Promise.resolve(html);

  return res;
};

// const upload = async (files) => {
//   try {
//     await uploadFiles(files)
//   } catch (error) {
//     console.log(error)
//   }
// }

const createHtmlFile = async function ({
  editorValue = "",
  fileName = "UNKNOWN",
  parent_id = "",
  space_id,
}) {
  console.log("editorValue, fileName", editorValue, fileName);
  const blob = new Blob([editorValue], { type: "text/html" });
  const formData = new FormData();

  formData.append("files", blob, `${fileName}.html`);

  const file = formData.getAll("files");

  await uploadFiles({ files: file, parent_id, space_id, fileName });
};

const setTimeoutFunc = ({ minutes, func }) => {
  setTimeout(func, minutes * 60);
};

const updateFile = async (name, doc, page_id, parent_id = "") => {
  await updateFiles(
    {
      input: {
        path: doc.path,
        size: doc.size,
        name: name + ".html",
        short_link: doc.short_link,
        extension: doc.extension,
        disk: doc.disk,
        hash: doc.hash,
      },
      id: doc.id,
    },
    () => ({
      variables: {
        input: {
          path: doc.path,
          size: doc.size,
          name: name + ".html",
          short_link: doc.short_link,
          extension: doc.extension,
          disk: doc.disk,
          hash: doc.hash,
        },
        id: doc.id,
      },
    })
  );

  await pageApi.update({
    input: {
      title: name,
    },
    id: page_id,
    space_id: 13,
  });

  EventBus.emit("document-update");
  response("Файл обновлен", "Ошибка", () => {}, fileStore.refetchFiles);
};

const deleteDoc = async (id, page_id) => {
  const apolloClient = new ApolloClient(getClientOptions());
  provideApolloClient(apolloClient);

  await pageApi.deleteById(page_id, 13);

  await deleteFiles({
    id,
  });

  EventBus.emit("document-deleted");
  response("Документ удален", "Ошибка", () => {}, fileStore.refetchFiles);
};

const updateRouteId = (id_route, routeParamsId) => {
  id_route = routeParamsId;
};

const response = async function (
  ms1,
  ms2,
  mutation = async () => {
    console.log("empty refetch");
  },
  refetch = async () => {
    console.log("empty refetch");
  }
) {
  try {
    let data = await mutation();
    await refetch();
    Notify.create({
      type: "positive",
      message: ms1,
    });
    return data;
  } catch (err) {
    console.log(err);
    Notify.create({
      type: "negative",
      message: ms2,
    });
  }
};


const getRootPage = async (rootPageId, space_id) => {
  let data_tree = [];
  let rootPages = await pageApi.refetchPaginatePagesNew({
    where: {
      column: "id",
      operator: "EQ",
      value: rootPageId,
    },
    space_id: space_id,
  });

  for (const rootPage of rootPages) {
    const rootData = {
      title_page: rootPage.title,
      object_id: rootPage.object.id,
      page_id: rootPage.id,
      page_parent_id: rootPage.parent_id,
      children: [],
    };

    // data_tree.push(rootData);

    if (rootPage.children.data.length > 0) {
      await getChildrenPages(rootPage.children.data, rootData, data_tree);
    }
  }

  console.log("data_tree", data_tree);
  return data_tree;
};

const getChildrenPages = async (
  children,
  parent,
  data_tree,
  isTopLevel = true
) => {
  for (const child of children) {
    const childData = {
      title_page: child.title,
      object_id: child.object.id,
      page_id: child.id,
      page_parent_id: child.parent_id,
      children: [],
    };

    // Проверяем, определено ли свойство children у родительского элемента
    if (parent.children == undefined) {
      // Если свойство children не определено, добавляем данные текущего дочернего элемента в массив родительского элемента
      parent.push(childData);
    } else {
      // Если свойство children определено, добавляем данные текущего дочернего элемента в массив children родительского элемента
      parent.children.push(childData);
      if (isTopLevel) {
        data_tree.push(childData);
      }
    }

    // Проверяем, имеет ли текущий дочерний элемент свойство children и имеет ли оно дочерние элементы
    if (child.children && child.children.data.length > 0) {
      // Если текущий дочерний элемент имеет дочерние элементы, вызываем функцию getChildrenPages для обработки его дочерних элементов
      await getChildrenPages(child.children.data, childData, data_tree, false);
    }
  }
};


const queryFileById = ({ id, space_id }) => {
  return useQuery(
    getFileById,
    { id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const refetchQueryFileById = async ({ id, space_id }) => {
  const { refetch } = queryFileById({ id, space_id });

  const { data: fileData } = await refetch({ id });

  return fileData;
};

const filesApi = {
  uploadFiles,
  getFileHtmlByUrl,
  createHtmlFile,
  // upload,
  setTimeoutFunc,
  updateFile,
  deleteDoc,
  updateRouteId,
  getRootPage,
  getChildrenPages,
  refetchQueryFileById,
  queryFileById,
};

export { filesApi };
