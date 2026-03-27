const bot = require("../bot")

bot.on("callback_query",(query)=>{

const data = query.data

const adminMsg = query.message

if(data.startsWith("approve_")){

const user = data.split("_")[1]

bot.sendMessage(user,"Payment approved ✅")

}

if(data.startsWith("reject_")){

const user = data.split("_")[1]

bot.sendMessage(user,"Payment rejected ❌")

}

})