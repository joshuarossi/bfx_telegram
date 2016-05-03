var TelegramBot = require('node-telegram-bot-api')
var BFX = require('bitfinex-api-node')
cached_ticker = {
  "BTCUSD": null,
  "LTCUSD": null,
  "LTCBTC": null,
  "ETHUSD": null,
  "ETHBTC": null
}

// Bitfinex Related Code
function formatTicker(ticker) {
  ticker = JSON.stringify(ticker, null, 2)
  return ticker
}

var bfx = new BFX().ws

bfx.on('open', function() {
  bfx.subscribeTicker("BTCUSD")
  bfx.subscribeTicker("LTCUSD")
  bfx.subscribeTicker("LTCBTC")
  bfx.subscribeTicker("ETHUSD")
  bfx.subscribeTicker("ETHBTC")
})
console.log('subscribed...')
bfx.on('ticker', function(pair, ticker) {
  cached_ticker[pair] = formatTicker(ticker)
})

// Telegram Related Code
keyboard = [
  ['/BTCUSD'],
  ['/LTCUSD'],
  ['/LTCBTC'],
  ['/ETHUSD'],
  ['/ETHBTC']
]
reply_markup = {
  'keyboard': keyboard,
  'resize_keyboard': true
}

var token = '218504809:AAFDhDtv4YuKslqnFA1ATX6ObW0DJrQqlFw'
var bot = new TelegramBot(token, {
  polling: true
});
bot.getMe().then(a => console.log(a))
bot.onText(/\/ticker/, function(msg, match) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, "Please Select A Pair", {
    "reply_markup": reply_markup
  }).then(a => console.log(a));
})

bot.onText(/\/BTCUSD/, function(msg, match) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, cached_ticker["BTCUSD"])
})

bot.onText(/\/LTCUSD/, function(msg, match) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, cached_ticker["LTCUSD"])
})

bot.onText(/\/LTCBTC/, function(msg, match) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, cached_ticker["LTCBTC"])
})

bot.onText(/\/ETHUSD/, function(msg, match) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, cached_ticker["ETHUSD"])
})

bot.onText(/\/ETHBTC/, function(msg, match) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, cached_ticker["ETHBTC"])
})