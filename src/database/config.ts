require('dotenv').config();

// external import

import { Dialect, Model, Sequelize } from 'sequelize'


// internal import
import localCache from '../cache/local-cache'


const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: false,
  })
  
export default sequelizeConnection

/* 
import { Sequelize } from 'sequelize-typescript';


export const sequelize = new Sequelize('medist', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    //models: [__dirname + '/models']
    /* logging: false,
    models: [Todos] 
}); 

export const connection = async () => {
    try{
        await sequelize.authenticate();
        let result =  await sequelize.sync({force: true});
        console.log(result);

        console.log('Database connected');
    }
    catch(err : any){
        console.log(err.message);
    }
} */

