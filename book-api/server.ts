import express from "express";
import usersRouter from "./api/routes/usersRoute";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import vueshopRoute from "./api/routes/vueshopRoute";
import fileupload from 'express-fileupload';

mongoose.connect("mongodb://localhost:27017/vueshop-db").then(()=> {

  console.log("Connected to mongodb");
  
  const port = process.env.PORT || 4000;
  
  const app = express();
  
  
  app.use(
    cors({
      origin: "*",
    })
  );
  
  app.use("/static", express.static(`${__dirname}/public/files/`));
  
  app.use(helmet());
  app.use(fileupload());
  
  app.use(express.urlencoded({ extended: true }));
  
  app.use(express.json());

  
  
  app.use("/users", usersRouter);
  
  app.use("/vueshop", vueshopRoute);
  
  app.listen(port, () => {
    console.log(`Vue Shop api running on port ${port}`);
  });

})  
