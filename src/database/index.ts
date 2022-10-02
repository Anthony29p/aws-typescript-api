import mongoose from "mongoose";

let conn = null;

export const connectDataBaseModel = async (modelName:string,schema) => {
    //Variables de entorno ya asignadas en serverless.ts
    const {MONGO_USER, MONGO_PASSWORD, MONGO_HOST, DB_NAME} = process.env;

    //Conexion
    if (conn == null) {
    conn = mongoose.createConnection(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${DB_NAME}`, {
        serverSelectionTimeoutMS: 5000
    });
    await conn.asPromise();
    //Creacion del modelo
    conn.model(modelName, schema);
    }
    
    //Conexion al modelo
    const Modelo = conn.model(modelName);

    return Modelo;
}