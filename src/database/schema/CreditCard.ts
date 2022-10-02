import mongoose from 'mongoose';
const { Schema } = mongoose;

//interfaz typescript
// export interface ICreditCard {
//     card_number: number,
//     cvv: number,
//     expiration_month:string,
//     expiration_year: string,
//     email: string,
//     // date: Object,
// }

//Schema mongoose
export const creditCard = new Schema({
    id:String,
    card_number: Number,
    cvv: Number,
    expiration_month:   String,
    expiration_year: String,
    email: String,
    // date: { type: Date, default: Date.now },
});