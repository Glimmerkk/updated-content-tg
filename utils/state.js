const fs = require("fs")

const USERS = "./data/users.json"

function getUsers(){

if(!fs.existsSync(USERS)) return {}

return JSON.parse(fs.readFileSync(USERS))

}

function saveUsers(users){

fs.writeFileSync(USERS,JSON.stringify(users,null,2))

}

function setState(userId,state){

let users = getUsers()

if(!users[userId]) users[userId] = {}

users[userId].state = state

saveUsers(users)

}

function getState(userId){

let users = getUsers()

return users[userId]?.state || null

}

module.exports = {setState,getState}