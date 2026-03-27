const bot = require("../bot")
const config = require("../config")
const fs = require("fs")

const PAYMENTS = "./data/payments.json"

bot.onText(/\/payments/, (msg)=>{

if(msg.from.id != config.ADMIN_ID) return

let payments = JSON.parse(fs.readFileSync(PAYMENTS))

let pending = payments.filter(p => p.status === "pending")

bot.sendMessage(msg.chat.id,
`Pending Payments: ${pending.length}`)

})