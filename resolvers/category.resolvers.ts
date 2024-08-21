import { Mutation } from 'apollo-server-core/src/plugin/schemaReporting/generated/operations';
import Article from "../models/article.model"
import Category from '../models/category.model';

export const categoryResolvers = {
    Query : {
        getListCategory : async () =>{
            const categories = await Category.find({
                deleted : false
            })

            return categories;
        },
        getCategory : async (_ ,args) =>{
            const {id} = args;
            const category = await Category.findOne({
                deleted : false,
                _id : id,
            })

            return category;
        },
        
    },
    Mutation : {
        createCategory: async (_, args) => {
            const { category } = args;
            
            const newCategory = new Category(category);
            await newCategory.save();
      
            return newCategory;
          },
          deleteCategory: async (_, args) => {
            const { id } = args;
            
            await Category.updateOne({
              _id: id
            }, {
              deleted: true,
              deletedAt: new Date()
            });
      
            return "Đã xóa";
          },
          updateCategory: async (_, args) => {
            const { id, category } = args;
      
            await Category.updateOne({
              _id: id,
              deleted: false
            }, category);
      
            const data = await Category.findOne({
              _id: id,
              deleted: false
            });
      
            return data;
          },
    },
    
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