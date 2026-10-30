import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import auth from './routes/auth.js'
import inquiries from './routes/inquiries.js'
import orders from './routes/orders.js'
import { dbConfigured } from './lib/db.js'

const app=express();const port=Number(process.env.PORT||8787)
app.set('trust proxy',1)
app.use(helmet({contentSecurityPolicy:false}))
app.use(cors({origin:process.env.CLIENT_ORIGIN||'http://localhost:5173',credentials:true}))
app.use(express.json({limit:'1mb'}));app.use(cookieParser())
app.use('/api',rateLimit({windowMs:60_000,limit:120,standardHeaders:'draft-8',legacyHeaders:false}))
app.get('/api/health',(req,res)=>res.json({ok:true,database:dbConfigured()?'configured':'not-configured'}))
app.use('/api/auth',auth);app.use('/api/inquiries',inquiries);app.use('/api/orders',orders)
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({message:'Something went wrong on the server.'})})

const __dirname=path.dirname(fileURLToPath(import.meta.url));const dist=path.resolve(__dirname,'../dist')
if(fs.existsSync(path.join(dist,'index.html'))){
 app.use(express.static(dist,{maxAge:'1d'}))
 app.get('*',(_,res)=>res.sendFile(path.join(dist,'index.html')))
}
app.listen(port,()=>console.log(`Cozy King API listening on http://localhost:${port}`))
