import { Mutation } from './node_modules/apollo-server-core/src/plugin/schemaReporting/generated/operations.d';
import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Article {
        id : ID,
        title : String,
        avatar : String,
        description: String,
    }

    type Query {
        hello : String,
        getArticle(id : ID) : Article,
        getListArticles : [Article]
    }
    type Mutation {
        createArticle(
            title : String, 
            avatar : String, 
            description : String
        ) : Article
    }

`;