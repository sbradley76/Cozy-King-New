import mysql from 'mysql2/promise'
let pool
export function dbConfigured(){return Boolean(process.env.DB_HOST&&process.env.DB_USER&&process.env.DB_NAME)}
export function db(){
 if(!dbConfigured()) throw new Error('database_not_configured')
 if(!pool) pool=mysql.createPool({host:process.env.DB_HOST,port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_NAME,waitForConnections:true,connectionLimit:10,queueLimit:0,charset:'utf8mb4'})
 return pool
}
