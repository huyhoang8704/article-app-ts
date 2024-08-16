import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Query {
        hello : String,
        getArticle(id : ID) : Article,
        getListArticles : [Article]
    }
    type Article {
        id : ID,
        title : String,
        avatar : String,
        description: String,
    }
`;