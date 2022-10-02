import { connectDataBaseModel } from "src/database";
import { creditCard } from "../database/schema/CreditCard";

const { v4 } = require('uuid');

export const postCard = async (event,_context) => {
  
  let { card_number,cvv,expiration_month,expiration_year,email } = JSON.parse(event.body);
  const id = v4()

  const newCard = {
    id,
    card_number,
    cvv,
    expiration_month,
    expiration_year,
    email,
  }

  const Modelo = await connectDataBaseModel('CreditCardTest',creditCard)
  const newCreditCard = new Modelo(newCard)
  await newCreditCard.save();

  return {
    statusCode: 200,
    body: JSON.stringify(newCreditCard),
  };
};