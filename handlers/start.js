const bot = require("../bot")

bot.onText(/\/start/, (msg) => {

const chatId = msg.chat.id

bot.sendMessage(chatId,
`🔥 *Welcome to Premium Private Hub*

Access exclusive content and private connections.

━━━━━━━━━━━━━━━

📁 *Premium Content*  
Direct HD videos and private mega folders.

🔥 *VIP Groups*  
Private members-only communities.

❤️ *Hookup Connections*  
Trusted private introductions.

━━━━━━━━━━━━━━━

Choose a service below to continue.`,
{
parse_mode:"Markdown",
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