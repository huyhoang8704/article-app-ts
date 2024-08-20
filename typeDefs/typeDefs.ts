import { Mutation } from 'apollo-server-core/src/plugin/schemaReporting/generated/operations';
import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Article {
        id: String,
        title: String,
        avatar: String,
        description: String,
        category: Category
    }

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
        hello : String,

        getArticle(id : ID) : Article,
        getListArticles : [Article],

        getListCategory: [Category],
        getCategory(id: String): Category,
    }
    type Mutation {
        createArticle(
            title : String, 
            avatar : String, 
            description : String
        ) : Article
        deleteArticle(id : ID) : String
        updateArticle(id : ID , title : String, avatar : String, description : String) : Article

        createCategory(category: CategoryInput): Category,
        deleteCategory(id: String): String,
        updateCategory(id: String, category: CategoryInput): Category,
    }

`;