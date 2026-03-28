require("dotenv").config()

const TelegramBot = require("node-telegram-bot-api")
const express = require("express")

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
require("./handlers/router")
require("./handlers/payment")

console.log("Handlers loaded successfully")

}catch(err){

console.log("Handler loading error:",err)

}


// ==========================
// EXPRESS SERVER (RENDER PORT FIX)
// ==========================

const app = express()

app.get("/",(req,res)=>{
res.send("Telegram bot is running")
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
})


// ==========================
// KEEP ALIVE PING
// ==========================

setInterval(()=>{

const https = require("https")

https.get(process.env.RENDER_EXTERNAL_URL,(res)=>{
console.log("Self ping success")
})

}, 300000) // every 5 minutes


// ==========================
// CRASH PROTECTION
// ==========================

process.on("uncaughtException",(err)=>{
console.log("Uncaught Exception:",err)
})

process.on("unhandledRejection",(err)=>{
console.log("Unhandled Rejection:",err)
})

bot.on("polling_error",(err)=>{
console.log("Polling Error:",err.message)
})