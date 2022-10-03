import { APIGatewayProxyHandler } from 'aws-lambda'
import { connectDataBaseModel } from "src/database";
import creditCardSchema from '../database/schema/CreditCard';

const jwt =  require('jsonwebtoken')

export const getCard: APIGatewayProxyHandler = async (event,_context) => {
  
  const token = event.headers['auth-token']
  
  if(!token){
    return {
      statusCode: 401,
      body: JSON.stringify(
        {
          message: "No token provided!"
        },
      ),
    };
  }

  //intento de decodificacion de token
  try{
    const decoded = jwt.verify(token,'tokenKey')

    _context.callbackWaitsForEmptyEventLoop = false;

    const Modelo = await connectDataBaseModel('CreditCardTest',creditCardSchema)
    //Uso de querys
    const creditCardsDB = await Modelo.findOne({id:decoded.id},{_id:0,__v:0,cvv:0});
    
    //Caso en que ya no exista la tarjeta de credito en la base de datos
    if(!creditCardsDB){
      return {
        statusCode: 404,
        body: JSON.stringify(
          {
            message: "No creditCard found!"
          },
        ),
      };
    }

    //Caso en que se encuentre la tarjeta de credito
    return {
      statusCode: 200,
      body: JSON.stringify(creditCardsDB),
    };
  }
  catch(error){
    return {
      statusCode: 401,
      body: JSON.stringify(
        {
          message: "invalid or expired Token!"
        },
      ),
    };
  }
};
  