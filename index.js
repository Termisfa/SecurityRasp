const dotenv = require('dotenv');
dotenv.config();

const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const chatIdCam = -535523553;

bot.sendMessage(chatIdCam, "Bot iniciado").catch((error) => {
    botLog(error.response.body.description, "Inicio", true)
 })


function botLog(msg, method, error = false)
 {
    if(!error)
      bot.sendMessage(chatIdCam, msg + "\n").catch((error) => {
        console.log(error)
     })
    else
      bot.sendMessage(chatIdCam, "ERROR EN " + method + ":\n" + msg +"\n").catch((error) => {
        console.log(error)
     })
 }

/*
//Para conseguir la info de un mensaje
bot.on("message", (msg) => {  
    console.log(msg)
  });
*/





const ipc = require('node-ipc');

ipc.config.id = 'index';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.serve(() => ipc.server.on('message', message => {
  bot.sendMessage(chatIdCam, message)
}));
ipc.server.start();




process.stdin.resume();//so the program will not close instantly

async function exitHandler(options, exitCode) {
  
  await bot.sendMessage(chatIdCam, "EL BOT HA DEJADO DE FUNCIONAR. \nSino se inicia solo de nuevo, reiniciar a mano")


    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));