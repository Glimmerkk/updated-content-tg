require("dotenv").config()

const TelegramBot = require("node-telegram-bot-api")

const config = require("./config")

console.log("Content bot starting...")

// ==========================
// CREATE TELEGRAM BOT
// ==========================

const bot = new TelegramBot(config.BOT_TOKEN,{
polling:true
})

module.exports = bot



// ==========================
// LOAD HANDLERS
// ==========================

try{

require("./handlers/start")
require("./handlers/router")   // MAIN MENU SYSTEM
require("./handlers/payment")  // PAYMENT PROOF

require("./admin/dashboard")

console.log("Handlers loaded successfully")

}catch(err){

console.log("Handler loading error:",err)

}



// ==========================
// CRASH PROTECTION
// ==========================

process.on("uncaughtException",(err)=>{
console.log("Uncaught Exception:",err)
})

process.on("unhandledRejection",(err)=>{
console.log("Unhandled Rejection:",err)
})



// ==========================
// BOT STATUS LOG
// ==========================

bot.on("polling_error",(err)=>{
console.log("Polling Error:",err.message)
})