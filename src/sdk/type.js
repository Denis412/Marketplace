import { useMutation, provideApolloClient } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { typeCreate, typeDelete } from "src/graphql/types/mutations";

provideApolloClient(apolloClient);

const { mutate: creatingType } = useMutation(typeCreate);
const { mutate: deletingType } = useMutation(typeDelete);

const createType = async () => {
  const { data: typeData } = await creatingType({
    input: {
      label: "temp",
    },
  });

  return typeData.typeCreate.recordId;
};

const deleteType = async (id) => {
  await deletingType({
    id: id,
  });
};

const typeApi = { createType, deleteType };

export default typeApi;
