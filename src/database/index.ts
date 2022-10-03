import mongoose from "mongoose";
import { blogSchema } from "./schema/schematest";



let conn = null;

export const connectDataBase = async (context) => {

    const {uri} = process.env

    context.callbackWaitsForEmptyEventLoop = false;
    //Conexion
    if (conn == null) {
    conn = mongoose.createConnection(uri, {
        serverSelectionTimeoutMS: 5000
    });
    await conn.asPromise();
    }

    conn.model('Test', blogSchema);

    //Creacion del model
    const M = conn.model('Test');
    //Uso de querys
    const doc = await M.find();
    return doc;
}
// git remote set-url https://github.com/Anthony29p/aws-typescript-dynamo-api.git
// git remote add origin https://github.com/Anthony29p/aws-typescript-dynamo-api.git