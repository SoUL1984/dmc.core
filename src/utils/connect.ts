import {createConnection, Connection} from "typeorm"
import config from "config";
import logger from "./logger";

// Мастер база данных балансировщика основного приложения, если имеется
const configMySql: any = config.get<any>("mysql");
export async function connect(): Promise<Connection> {
    let dbConnection:Connection;
    try {
        dbConnection = await createConnection(configMySql);
        logger.info('Connected to DB');
    } catch (e) {
        logger.error('Could not connect to DB');
        process.exit(1);
    }
    return dbConnection;
}

export default connect;

