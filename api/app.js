import mysql from "mysql";
import winston from "winston";
import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import {Contract, getAddress, JsonRpcProvider} from "ethers";

dotenv.config();

const app = express()
app.use(cors());
const port = process.env.PORT;
