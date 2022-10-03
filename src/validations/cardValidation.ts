
const luhnAlgorithm =(card_number:number) =>{
    var sum = 0;
    const sNumber = card_number.toString()

    for (var i = 0, len = sNumber.length; i < len; i += 1) {
        var num = Number(sNumber.charAt(i));

        if(i%2===0){
            num *= 2
        }
        if(num>10){
           num = Math.floor(num/10) +num%10
        }
        sum += num;
    }

    return(sum%10===0)
}

const cardValidation = (card_number:any) => {
    
    return(Number.isInteger(card_number) && Math.pow(10,13)<card_number && card_number<Math.pow(10,17) && luhnAlgorithm(card_number))
}

const cvvValidation = (cvv:any) => {
    
    return(Number.isInteger(cvv) && Math.pow(10,3)<cvv && cvv<=Math.pow(10,4))
}

const monthValidation = (month:any) => {
    
    return(typeof month === 'string' && 0<Number(month) && Number(month)<=12)
}

const yearValidation = (year:any) => {
    let fecha = new Date();
    let año = fecha.getFullYear()
    return(typeof year === 'string' && año-5<=Number(year) && Number(year)<=año+5)
}

const emailValidation = (email:any) => {
    if(typeof email !== 'string' || email.indexOf('@') === -1){
        return(false)
    }
    
    let mailList =['gmail.com','hotmail.com','yahoo.es']
    const mailType = email.substring(email.indexOf('@')+1,email.length)
    return(mailList.some(m => m === mailType))
}

export const dataValidator = (card_number,cvv,expiration_month,expiration_year,email) => {

    let error = 'error at'

    if(!card_number || !cardValidation(card_number)){error +=' card_number'}
    if(!cvv|| !cvvValidation(cvv)){error +=' cvv'}
    if(!expiration_month || !monthValidation(expiration_month)){error +=' expiration_month'}
    if(!expiration_year || !yearValidation(expiration_year)){error +=' expiration_year'}
    if(!email || !emailValidation(email)){error +=' email'}

    return(error==='error at'?'no errors':error)
}