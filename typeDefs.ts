import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Query {
        hello : String,
        getArticles : [Article]
    }
    type Article {
        id : ID,
        title : String,
        avatar : String,
        description: String,
    }
`;