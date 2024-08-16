import { Mutation } from './node_modules/apollo-server-core/src/plugin/schemaReporting/generated/operations.d';
import Article from "./models/article.model"

export const resolvers = {
    Query : {
        hello : () => "Hello World",
        getListArticles : async () =>{
            const article = await Article.find({
                deleted : false
            })

            return article;
        },
        getArticle : async (_ ,args) =>{
            const {id} = args;
            const article = await Article.findOne({
                deleted : false,
                _id : id,
            })

            return article;
        }
        
    },
    Mutation : {
        createArticle : async (_ , args) =>{
            const {title, avatar, description} = args;
            const article = new Article({
                title : title,
                avatar : avatar,
                description : description
            })
            await article.save();
            return article 
        }
    }
}


/**
 * Get : Lấy ra nhiều bài viết
    query {
        getListArticles{
            title,
            avatar
        }
    }
 * Get : Lấy ra 1 bài viết
    query {
        getArticle(id : "6545d26fd3edd487ec1691b4"){
            title,
            avatar
        }
    }
 * Create : Thêm mới 1 bài viết
    mutation {
        createArticle(
            title :  "Bai bao 1",
            avatar : "Link", 
            description : "Mo ta",
        ) {
            id
            title
        }
    }
 */