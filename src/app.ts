import http from "http"
import express from "express";
import config from "config";
import bodyParser from "body-parser";
import connect from "./utils/connect";
import logger from "./utils/logger";
import { createUserR } from "./routes/user/create_user";
import { deleteUserR } from "./routes/user/delete_user";
import { fetchUserR } from "./routes/user/fetch_user";
import { createConnection } from "typeorm";
import { UserE } from "./entity/userE";

const NAMESPACE = 'Server';
const port = config.get<number>("common.port");
const hostname = config.get<number>("common.hostname");
const app = express();

const main = async () => {
    try {
        await connect();

        /** Log the request */
        app.use((req, res, next) => {
            /** Log the req */
            logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

            res.on('finish', () => {
                /** Log the res */
                logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
            })
            
            next();
        });

        /** Parse the body of the request */
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        /** Rules of our API */
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

            if (req.method == 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
                return res.status(200).json({});
            }

            next();
        });

        /** Routes go here */
        app.use(createUserR);
        app.use(deleteUserR);
        app.use(fetchUserR);

        /** Error handling */
        app.use((req, res, next) => {
            const error = new Error('Not found');

            res.status(404).json({
                message: error.message
            });
        });

        const httpServer = http.createServer(app);
        
        app.use(express.json());
        
        httpServer.listen(port, () => logger.info(`Server is running ${hostname}:${port}`));
    } catch (error) {
        console.error(error);
        throw new Error('The application did not start');
    }
};

main();