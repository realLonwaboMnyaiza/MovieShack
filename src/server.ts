import pathModule from "path";
import dotenv from 'dotenv';
import app from './index';
import Logger from "./startup/logging";
const environment = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || '3000';
const db = process.env.DATABASE;
const path = pathModule.join(process.cwd(), `.env.${environment}`);
dotenv.config({path});

// todo: refactor keep things DRY. Move to centralized loc. 
export default function serve() {
    app.listen(port);
    new Logger(db, 'logs', 'info')
    .log().info(`App listening on port ${port}`);
}
