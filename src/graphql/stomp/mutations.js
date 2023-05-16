import gql from "graphql-tag";

export const createQueue = gql`
  mutation {
    notificationSubscribe {
      hash
    }
  }
`;
