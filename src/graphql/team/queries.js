import gql from "graphql-tag"

//отображение команд как пространства
export const getTeams = gql`query User($id: String!) {
    user(id: $id) {
        spaces
    }
},`

