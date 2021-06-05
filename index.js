// 簡易読み上げBOT

const fs = require('fs');
const http = require('http');
const discord = require('discord.js');
const config = require('config');

var OpenJTalk=undefined;
(process.platform==='win32')? OpenJTalk = require('./openjtalk') : OpenJTalk = require('openjtalk');

// Settings
let DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
if(config.get("DISCORD_BOT_TOKEN")!=""){
    DISCORD_BOT_TOKEN=config.get("DISCORD_BOT_TOKEN");
}
const TEXT_CHANNEL = config.TEXT_CHANNEL;
const VOICE_CHANNEL = config.VOICE_CHANNEL;

// OpenJTalk.
var mei = new OpenJTalk({
	sampling_rate   : 48000,
	stage           : 0,
	audio_buff_size : 48000,
	alpha           : 0.5,
	beta            : 0.8,
	uv_threshold    : 0.5,
	gv_weight_mgc   : 1.0,
	gv_weight_lf0   : 1.0,
	gv_weight_lpf   : 1.0
});

// Discord Client
const client = new discord.Client();
client.on('ready', message =>{
	console.log('bot ready!');
});
// Message Event
client.on('message', message => {
    // console.log(message.id, message.content);
    if(message.channel.name!=TEXT_CHANNEL){
        return;
    }
    const sender = message.member;
    const voiceChannel = sender.voice.channel;
    if(voiceChannel && voiceChannel.name == VOICE_CHANNEL){
        let content = message.content.replace(/\r?\n/g,"");
        mei._makeWav(content, 300, (e,re)=>{
            // console.log(re);
            voiceChannel.join().then(connection => {
                const dispatcher = connection.play(re.wav);
                dispatcher.on('finish', () => {
                    try {
                        fs.unlinkSync(re.wav);
                      } catch(err) {
                        console.error(err);
                      }
                });
            });
        });
    }
});

// Main
if(DISCORD_BOT_TOKEN == ""){
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Discord bot is running... \n');
}).listen(3000);

client.login( DISCORD_BOT_TOKEN );
