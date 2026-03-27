const bot = require("../bot")

bot.onText(/\/start/, (msg) => {

const chatId = msg.chat.id

bot.sendMessage(chatId,
"Welcome 👋\n\nChoose an option:",
{
reply_markup:{
inline_keyboard:[
[
{text:"📁 Content",callback_data:"content"}
],
[
{text:"🔥 Join Group",callback_data:"group"}
],
[
{text:"❤️ Hookup",callback_data:"hookup"}
]
]
}
})

})