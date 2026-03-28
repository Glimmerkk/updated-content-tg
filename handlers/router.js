const bot = require("../bot")
const config = require("../config")
const fs = require("fs")

bot.on("callback_query",(query)=>{

const chatId = query.message.chat.id
const data = query.data

bot.answerCallbackQuery(query.id)


// ================= START =================

if(data === "start"){

bot.sendMessage(chatId,
`🔥 Welcome

Choose what you want below:`,

{
reply_markup:{
inline_keyboard:[
[{text:"📚 Content",callback_data:"content"}],
[{text:"👥 Join Group",callback_data:"group"}],
[{text:"❤️ Hookup",callback_data:"hookup"}]
]
}
})

}


// ================= CONTENT =================

else if(data === "content"){

bot.sendMessage(chatId,
`📚 Choose age category`,

{
reply_markup:{
inline_keyboard:[
[
{text:"8 - 12",callback_data:"age_8_12"},
{text:"12+",callback_data:"age_12"}
],
[
{text:"⬅ Back",callback_data:"start"}
]
]
}
})

}


else if(data === "age_8_12" || data === "age_12"){

bot.sendMessage(chatId,
`Choose delivery type`,

{
reply_markup:{
inline_keyboard:[
[{text:"🔗 Mega Links",callback_data:"links"}],
[{text:"🎥 Direct HD Videos",callback_data:"videos"}],
[{text:"⬅ Back",callback_data:"content"}]
]
}
})

}


else if(data === "links" || data === "videos"){

bot.sendMessage(chatId,
`💰 Select your budget`,

{
reply_markup:{
inline_keyboard:[
[
{text:"$30",callback_data:"budget_30"},
{text:"$50",callback_data:"budget_50"}
],
[
{text:"$70",callback_data:"budget_70"},
{text:"$100 VIP",callback_data:"budget_100"}
],
[
{text:"⬅ Back",callback_data:"content"}
]
]
}
})

}


else if(data.startsWith("budget_")){

bot.sendMessage(chatId,
`💳 Choose payment method`,

{
reply_markup:{
inline_keyboard:[
[
{text:"₿ BTC",callback_data:"pay_btc"},
{text:"💲 USDT",callback_data:"pay_usdt"}
],
[
{text:"🎁 Giftcard",callback_data:"pay_gift"}
],
[
{text:"⬅ Back",callback_data:"content"}
]
]
}
})

}


// ================= GROUP =================

else if(data === "group"){

bot.sendMessage(chatId,
`👥 Choose group subscription`,

{
reply_markup:{
inline_keyboard:[
[{text:"$50 • 2 Weeks",callback_data:"group_50"}],
[{text:"$70 • 1 Month",callback_data:"group_70"}],
[{text:"$100 • Unlimited",callback_data:"group_100"}],
[{text:"⬅ Back",callback_data:"start"}]
]
}
})

}


else if(data.startsWith("group_")){

bot.sendMessage(chatId,
`💳 Choose payment method`,

{
reply_markup:{
inline_keyboard:[
[
{text:"₿ BTC",callback_data:"pay_btc"},
{text:"💲 USDT",callback_data:"pay_usdt"}
],
[
{text:"🎁 Giftcard",callback_data:"pay_gift"}
],
[
{text:"⬅ Back",callback_data:"group"}
]
]
}
})

}


// ================= HOOKUP =================

else if(data === "hookup"){

bot.sendMessage(chatId,
`❤️ Choose preferred age`,

{
reply_markup:{
inline_keyboard:[
[{text:"18 - 22",callback_data:"hook_18"}],
[{text:"23 - 30",callback_data:"hook_23"}],
[{text:"⬅ Back",callback_data:"start"}]
]
}
})

}


else if(data === "hook_18" || data === "hook_23"){

bot.sendMessage(chatId,
`🔥 Hookup connection fee: $700

Choose payment method`,

{
reply_markup:{
inline_keyboard:[
[
{text:"₿ BTC",callback_data:"pay_btc"},
{text:"💲 USDT",callback_data:"pay_usdt"}
],
[
{text:"🎁 Giftcard",callback_data:"pay_gift"}
],
[
{text:"⬅ Back",callback_data:"hookup"}
]
]
}
})

}


// ================= BTC PAYMENT =================

else if(data === "pay_btc"){

bot.sendMessage(chatId,
`₿ BTC Payment

Send BTC to:

${config.BTC_WALLET}

Then upload payment screenshot.`,
{
reply_markup:{
inline_keyboard:[
[
{text:"📋 Copy BTC Address",url:`https://t.me/share/url?url=${config.BTC_WALLET}`}
]
]
}
})

}


// ================= USDT PAYMENT =================

else if(data === "pay_usdt"){

bot.sendMessage(chatId,
`💲 USDT Payment

Send USDT to:

${config.USDT_WALLET}

Then upload payment screenshot.`,
{
reply_markup:{
inline_keyboard:[
[
{text:"📋 Copy USDT Address",url:`https://t.me/share/url?url=${config.USDT_WALLET}`}
]
]
}
})

}


// ================= GIFTCARD =================

else if(data === "pay_gift"){

bot.sendMessage(chatId,
`🎁 Giftcard Payment

Send either:

1️⃣ Giftcard Screenshot
or
2️⃣ Giftcard Code

Example:

Amazon
XXXX-XXXX-XXXX`)

}


// ================= ADMIN APPROVE =================

else if(data.startsWith("approve_")){

const id = data.split("_")[1]

let payments = JSON.parse(fs.readFileSync("./data/payments.json"))

let payment = payments.find(p => p.id === id)

if(!payment) return

payment.status = "approved"

fs.writeFileSync("./data/payments.json",JSON.stringify(payments,null,2))

bot.sendMessage(payment.user,
`✅ Payment Approved

Thank you for making the payment.

Contact admin to continue:

https://t.me/${config.ADMIN_USERNAME}`)

bot.sendMessage(chatId,"Payment approved.")

}


// ================= ADMIN REJECT =================

else if(data.startsWith("reject_")){

const id = data.split("_")[1]

let payments = JSON.parse(fs.readFileSync("./data/payments.json"))

let payment = payments.find(p => p.id === id)

if(!payment) return

payment.status = "rejected"

fs.writeFileSync("./data/payments.json",JSON.stringify(payments,null,2))

bot.sendMessage(payment.user,
"❌ Payment rejected. Please contact admin.")

bot.sendMessage(chatId,"Payment rejected.")

}

})