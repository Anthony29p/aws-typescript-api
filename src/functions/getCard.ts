import { connectDataBaseModel } from "src/database";
import { creditCard } from "../database/schema/CreditCard";


export const getCard = async (event,_context) => {
  
  _context.callbackWaitsForEmptyEventLoop = false;
  
  const Modelo = await connectDataBaseModel('CreditCardTest',creditCard)
  //Uso de querys
  const doc = await Modelo.find();

  return {
    statusCode: 200,
    body: JSON.stringify(doc),
  };
};
  