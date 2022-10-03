import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
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
const creditCardSchema = new Schema(
    {
    id:String,
    card_number: Number,
    cvv: Number,
    expiration_month:   String,
    expiration_year: String,
    email: String,
    createdAt: Date,
    },
    {
        timestamps:false,
        versionKey: false
    }
);

creditCardSchema.statics.encryptCCV = async (cvv) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(cvv,salt)
}

export default creditCardSchema