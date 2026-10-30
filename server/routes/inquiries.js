import { Router } from 'express'
import { db, dbConfigured } from '../lib/db.js'
const router=Router()
router.post('/',async(req,res,next)=>{try{if(req.body.website)return res.json({ok:true});if(!dbConfigured())return res.status(503).json({message:'database_not_configured'});const {name,company,email,phone,projectType,units,timing,message}=req.body;if(!name||!email||!message)return res.status(400).json({message:'Name, email and project details are required.'});await db().execute('INSERT INTO cozy_contract_inquiries (name,company,email,phone,project_type,estimated_units,target_timing,message) VALUES (?,?,?,?,?,?,?,?)',[name,company||null,email,phone||null,projectType||null,units||null,timing||null,message]);res.status(201).json({ok:true})}catch(e){next(e)}})
export default router
