import gql from "graphql-tag"

//отображение команд 
export const getTeams = gql`query User($id: String!) {
    user(id: $id) {
        spaces
    }
}`

