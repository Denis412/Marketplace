import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import {
  filesUpload,
  fileUpdate,
  fileDelete,
} from "src/graphql/files/mutations";
import { Notify } from "quasar";
import { useFileStore } from "src/stores/file";
import pageApi from "src/sdk/page.js";
import EventBus from "../sdk/files/eventBus";

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
  await pageApi.deleteById(page_id, 13);

  await deleteFiles({
    id,
  });

  EventBus.emit("document-deleted");
  response("Документ удален", "Ошибка", () => {}, fileStore.refetchFiles);
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

const filesFunc = {
  uploadFiles,
  createHtmlFile,
  updateFile,
  deleteDoc,
};

export { filesFunc };
