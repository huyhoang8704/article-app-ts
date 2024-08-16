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
        
    }
}


/**
    query {
        getListArticles{
            title,
            avatar
        }
    }
    query {
        getArticle(id : "6545d26fd3edd487ec1691b4"){
            title,
            avatar
        }
    }
 */