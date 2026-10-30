import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { db, dbConfigured } from '../lib/db.js'
import { signUser, requireAuth } from '../middleware/auth.js'
const router=Router()
router.post('/login',async(req,res,next)=>{try{if(!dbConfigured())return res.status(503).json({message:'Local preview is running, but the database is not connected. Add Hostinger MySQL settings to .env.'});const email=String(req.body.email||'').trim().toLowerCase(),password=String(req.body.password||'');if(!email||!password)return res.status(400).json({message:'Email and password are required.'});const [rows]=await db().execute('SELECT id,email,password_hash,vendor_name,status FROM users WHERE email=? LIMIT 1',[email]);const user=rows[0];if(!user||user.status!=='active')return res.status(401).json({message:'Invalid dealer credentials.'});const hash=String(user.password_hash||'').replace(/^\$2y\$/,'$2b$');if(!(await bcrypt.compare(password,hash)))return res.status(401).json({message:'Invalid dealer credentials.'});const admins=(process.env.ADMIN_EMAILS||'').split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);const payload={id:user.id,email:user.email,vendorName:user.vendor_name,isAdmin:admins.includes(email)};try{await db().execute('INSERT INTO dealer_logins (dealer_id,ip_address,user_agent) VALUES (?,?,?)',[user.id,req.ip,req.get('user-agent')||''])}catch{}res.cookie('cozy_session',signUser(payload),{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:12*60*60*1000});res.json({user:payload})}catch(e){next(e)}})
router.get('/me',requireAuth,(req,res)=>res.json({user:req.user}))
router.post('/logout',(req,res)=>{res.clearCookie('cozy_session');res.json({ok:true})})
export default router
