import { Mutation } from 'apollo-server-core/src/plugin/schemaReporting/generated/operations';
import { gql } from "apollo-server-express";

export const typeDefsCategory = gql`
    type Category {
        id : ID,
        title : String,
        avatar : String,
    }
    input CategoryInput {
        title: String,
        avatar: String
    }

    type Query {
        getListCategory: [Category],
        getCategory(id: String): Category,
    }
    type Mutation {
        createCategory(category: CategoryInput): Category,
        deleteCategory(id: String): String,
        updateCategory(id: String, category: CategoryInput): Category,
    }

`;