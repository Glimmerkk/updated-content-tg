const bot = require("../bot")
const config = require("../config")
const fs = require("fs")

const PAYMENTS_FILE = "./data/payments.json"


function getPayments(){

if(!fs.existsSync(PAYMENTS_FILE)){
fs.writeFileSync(PAYMENTS_FILE,JSON.stringify([],null,2))
}

return JSON.parse(fs.readFileSync(PAYMENTS_FILE))

}


function savePayments(payments){

fs.writeFileSync(PAYMENTS_FILE,JSON.stringify(payments,null,2))

}


function generateId(){

return "PAY"+Date.now()

}


// ================= SCREENSHOT PAYMENT =================

bot.on("photo",(msg)=>{

const chatId = msg.chat.id
const photo = msg.photo[msg.photo.length-1].file_id
const id = generateId()

let payments = getPayments()

let payment = {

id:id,
user:chatId,
method:"screenshot",
proof:photo,
status:"pending",
time:Date.now()

}

payments.push(payment)

savePayments(payments)

bot.sendMessage(chatId,
"✅ Screenshot received. Waiting for admin approval.")


// SEND TO ADMIN

bot.sendPhoto(

config.ADMIN_ID,
photo,

{
caption:`💰 New Payment Screenshot

User ID: ${chatId}
Username: @${msg.from.username || "No username"}

Payment ID: ${id}`,

reply_markup:{
inline_keyboard:[
[
{text:"Approve",callback_data:`approve_${id}`},
{text:"Reject",callback_data:`reject_${id}`}
]
]
}

}

)

})




// ================= GIFTCARD CODE =================

bot.on("message",(msg)=>{

if(!msg.text) return

const chatId = msg.chat.id
const text = msg.text.trim()

// ignore commands
if(text.startsWith("/")) return

// detect possible giftcard codes
if(text.length >= 6){

const id = generateId()

let payments = getPayments()

let payment = {

id:id,
user:chatId,
method:"giftcard",
code:text,
status:"pending",
time:Date.now()

}

payments.push(payment)

savePayments(payments)

bot.sendMessage(chatId,
"🎁 Giftcard code received. Waiting for admin approval.")


// SEND TO ADMIN

bot.sendMessage(

config.ADMIN_ID,

`🎁 New Giftcard Payment

User ID: ${chatId}
Username: @${msg.from.username || "No username"}

Giftcard Code:
${text}

Payment ID: ${id}`,

{
reply_markup:{
inline_keyboard:[
[
{text:"Approve",callback_data:`approve_${id}`},
{text:"Reject",callback_data:`reject_${id}`}
]
]
}

}

)

}

})