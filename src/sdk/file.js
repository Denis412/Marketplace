import { provideApolloClient, useMutation, useQuery } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { filesUpload } from "src/graphql/files/mutations";
import { getFiles } from "src/graphql/files/queries";

provideApolloClient(apolloClient);

const { mutate } = useMutation(filesUpload);
const { refetch } = useQuery(getFiles);

const uploadFiles = async (files) => {
  console.log("file", files);

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

const filesApi = { uploadFiles, get };

export default filesApi;
