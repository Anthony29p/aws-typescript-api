import { APIGatewayProxyHandler } from 'aws-lambda'
import { connectDataBaseModel } from "src/database";
import { dataValidator } from 'src/validations/cardValidation';
import creditCardSchema from '../database/schema/CreditCard';


const { v4 } = require('uuid');
const jwt =  require('jsonwebtoken')

export const postCard: APIGatewayProxyHandler = async (event,_context) => {
  
  let { card_number,cvv,expiration_month,expiration_year,email } = JSON.parse(event.body);
  let error =dataValidator(card_number,cvv,expiration_month,expiration_year,email)

  
  if(error==='no errors'){
    const id = v4()
    const token:string =jwt.sign({id},'tokenKey',{expiresIn:15*60})

    const createdAt = new Date();
    
    const Modelo = await connectDataBaseModel('CreditCardTest',creditCardSchema)

    const newCard = {
      id,
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email,
      createdAt,
    }
    const newCreditCard = new Modelo(newCard)
    await newCreditCard.save();

    return {
      statusCode: 200,
      body: JSON.stringify(newCreditCard),
      headers: {
        'auth-token': token,
      },
    };
  }
  else{
    return{
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
  
  
};