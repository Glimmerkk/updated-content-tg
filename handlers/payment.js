const bot = require("../bot")
const config = require("../config")
const fs = require("fs")

const DATA_DIR = "./data"
const PAYMENTS_FILE = "./data/payments.json"


// ==========================
// ENSURE DATA FILE EXISTS
// ==========================

if(!fs.existsSync(DATA_DIR)){
fs.mkdirSync(DATA_DIR)
}

if(!fs.existsSync(PAYMENTS_FILE)){
fs.writeFileSync(PAYMENTS_FILE,JSON.stringify([],null,2))
}


// ==========================
// READ PAYMENTS
// ==========================

function getPayments(){
return JSON.parse(fs.readFileSync(PAYMENTS_FILE))
}


// ==========================
// SAVE PAYMENTS
// ==========================

function savePayments(payments){
fs.writeFileSync(PAYMENTS_FILE,JSON.stringify(payments,null,2))
}


// ==========================
// GENERATE PAYMENT ID
// ==========================

function generatePaymentId(){
return "PAY"+Date.now()
}


// ==========================
// RECEIVE SCREENSHOT PAYMENT
// ==========================

bot.on("photo",(msg)=>{

const chatId = msg.chat.id
const photo = msg.photo[msg.photo.length-1].file_id

const paymentId = generatePaymentId()

let payments = getPayments()

let payment = {

id:paymentId,
user:chatId,
method:"crypto",
proof:photo,
status:"pending",
time:Date.now()

}

payments.push(payment)

savePayments(payments)

bot.sendMessage(chatId,
"✅ Payment proof received. Waiting for admin approval.")



bot.sendPhoto(

config.ADMIN_ID,
photo,

{
caption:`💰 New Payment

User ID: ${chatId}
Username: @${msg.from.username || "no_username"}

Payment ID: ${paymentId}`,

reply_markup:{
inline_keyboard:[
[
{text:"Approve",callback_data:`approve_${paymentId}`},
{text:"Reject",callback_data:`reject_${paymentId}`}
]
]
}

}

)

})


// ==========================
// RECEIVE GIFTCARD CODE
// ==========================

bot.on("message",(msg)=>{

if(!msg.text) return

const chatId = msg.chat.id
const text = msg.text.trim()

if(text.startsWith("/")) return

if(text.length >= 6){

const paymentId = generatePaymentId()

let payments = getPayments()

let payment = {

id:paymentId,
user:chatId,
method:"giftcard",
code:text,
status:"pending",
time:Date.now()

}

payments.push(payment)

savePayments(payments)

bot.sendMessage(chatId,
"🎁 Giftcard received. Waiting for admin approval.")


bot.sendMessage(

config.ADMIN_ID,

`🎁 New Giftcard Payment

User ID: ${chatId}
Username: @${msg.from.username || "no_username"}

Code:
${text}

Payment ID: ${paymentId}`,

{
reply_markup:{
inline_keyboard:[
[
{text:"Approve",callback_data:`approve_${paymentId}`},
{text:"Reject",callback_data:`reject_${paymentId}`}
]
]
}

}

)

}

})