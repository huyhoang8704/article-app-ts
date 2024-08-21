import { Mutation } from 'apollo-server-core/src/plugin/schemaReporting/generated/operations';
import Article from "../models/article.model"
import Category from '../models/category.model';

export const articleResolvers = {
    Query : {
        hello : () => "Hello World",
        getListArticles : async (_ , args) =>{
            const {
                sortKey, 
                sortValue , 
                currentPage , 
                limitItems,
                filterKey,
                filterValue,
                keyword
            } = args;
            const find = {
                deleted : false
            };



            // Sort
            const sort = {};
            if(sortKey && sortValue){
                sort[sortKey] = sortValue
            }
            // Pagination
            const skip = (currentPage - 1) * limitItems;
            // Filter
            if(filterKey && filterValue){
                find[filterKey] = filterValue
            }
            // Tìm kiếm
            if(keyword) {
                const keywordRegex = new RegExp(keyword, "i");
                find["title"] = keywordRegex;
            }

            const article = await Article.find(find).sort(sort).limit(limitItems).skip(skip);

            return article;
        },
        getArticle : async (_ ,args) =>{
            const {id} = args;
            const article = await Article.findOne({
                deleted : false,
                _id : id,
            })

            return article;
        },
        
    },
    Mutation : {
        createArticle : async (_ , args) =>{
            const {title, avatar, description , categoryId} = args;
            const article = new Article({
                title : title,
                avatar : avatar,
                description : description,
                categoryId : categoryId
            })
            await article.save();
            return article 
        },
        deleteArticle : async (_ , args) =>{
            const {id} = args;
            await Article.updateOne({
                _id : id,
            }, {
                deleted : true,
                deletedAt : new Date()
            })
            return "Đã xóa thành công!"
        },
        updateArticle : async (_ , args) =>{
            const {id, title, avatar, description} = args;
            await Article.updateOne({
                _id : id,
            }, {
                title : title,
                avatar : avatar,
                description : description
            })
            return await Article.findOne({
                _id : id
            })
        },
    },
    
    Article: {
        category: async (article) => {
          const categoryId = article.categoryId;
    
          const category = await Category.findOne({
            _id: categoryId
          });
    
          return category;
        }
    }
}


/**
 * Get : Lấy ra nhiều bài viết
    query {
        getListArticles(
            sortKey : "title",
            sortValue : "asc"
        ),{
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
 * Delete : Xóa 1 bài viết
    mutation {
        deleteArticle(id:"66bfc21f84f2e0e9048f6145")
    }
 * Patch : Chỉnh sửa bài viết
    mutation {
        updateArticle(
            id:"66bfc21f84f2e0e9048f6145",
            title :  "Bai bao 2",
            avatar : "Link", 
            description : "Mo ta"
        )
        {
            id
            title
        }
    }
 */