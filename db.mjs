import { createPool } from "mysql2/promise";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from './config.mjs'



export const pool = createPool({
    connectionLimit : 10,
    port: DB_PORT,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
})