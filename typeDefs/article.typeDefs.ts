import { Mutation } from 'apollo-server-core/src/plugin/schemaReporting/generated/operations';
import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
    type Article {
        id: String,
        title: String,
        avatar: String,
        description: String,
        categoryId : String,
        category: Category
    }


    type Query {
        hello : String,

        getArticle(id : ID) : Article,
        getListArticles(
            sortKey : String , 
            sortValue : String,
            currentPage : Int = 1,
            limitItems : Int = 2,
            filterKey : String,
            filterValue : String,
            keywords : String
        ) : [Article],
    }
    type Mutation {
        createArticle(
            title : String, 
            avatar : String, 
            description : String,
            categoryId : String
        ) : Article
        deleteArticle(id : ID) : String
        updateArticle(id : ID , title : String, avatar : String, description : String , categoryId : String) : Article
    }

`;