"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsArticle = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsArticle = (0, apollo_server_express_1.gql) `
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
