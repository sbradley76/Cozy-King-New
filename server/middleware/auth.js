import jwt from 'jsonwebtoken'
export function signUser(user){return jwt.sign(user,process.env.JWT_SECRET||'local-preview-secret-change-me',{expiresIn:'12h'})}
export function requireAuth(req,res,next){const token=req.cookies?.cozy_session;if(!token)return res.status(401).json({message:'Please sign in to continue.'});try{req.user=jwt.verify(token,process.env.JWT_SECRET||'local-preview-secret-change-me');next()}catch{return res.status(401).json({message:'Your session has expired.'})}}
