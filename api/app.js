import mysql from "mysql";
import winston from "winston";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Contract, getAddress, JsonRpcProvider } from "ethers";
import fs from "fs";
import { parse } from "csv-parse/sync" ;
import * as path from "node:path";


// 读取CSV文件
const csvData = fs.readFileSync("CardData.csv", "utf8");

// 将CSV数据解析为JSON对象数组
const jsonData = parse(csvData, {
  columns: true, // 将第一行作为列名
  skip_empty_lines: true, // 跳过空行
});

console.log(jsonData);

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT;


// 定义一个路由来处理元数据请求
app.get("/token/:tokenId", (req, res) => {
  const { tokenId } = req.params;

  const i = (tokenId % jsonData.length) + 1;
  const card = jsonData[i];
  const fileName = path.basename(card.ArtFull);

  const attributes = [];
  const keys = Object.keys(card);
  let values = Object.values(card);
  for (let x = 0; x < keys.length; x++) {
    attributes.push({
      trait_type: keys[x],
      value: values[x],
    });
  }

  // 在这里根据tokenId获取相应的NFT元数据
  // 这里只是一个示例，你需要替换为你自己的逻辑
  const metadata = {
    name: card.Title,//CONFIG.imgName + " #" + tokenId,
    description: card.Text,//CONFIG.description,
    tokenId: tokenId,
    image: "http://44.214.29.84:3333/images/" + fileName,
    attributes: attributes,
    // animation_url: "https://solmonkes.com/api/mp4/" + i + ".mp4",
  };

  res.json(metadata);
});


// 启动服务器
app.use(express.static("public"));
app.timeout = 600000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});