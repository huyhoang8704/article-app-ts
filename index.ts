import express , { Express , Request , Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import Article from "./models/article.model";

const app : Express  = express()
const port : number | string = process.env.PORT || 3001;

dotenv.config();
database.connect();

// Rest API
app.get('/articles', async(req : Request, res : Response) => {
    const articles = await Article.find({
        deleted : false
    })
    
    res.json({
        articles : articles
    })
})


app.listen(port , () =>{
    console.log(`App listening on port ${port}`);
})