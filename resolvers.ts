import Article from "./models/article.model"

export const resolvers = {
    Query : {
        hello : () => "Hello World",
        getArticles : async () =>{
            const article = await Article.find({
                deleted : false
            })

            return article;
        }
    }
}


/**
    query {
        getArticles{
            title,
            avatar
        }
    }
 */