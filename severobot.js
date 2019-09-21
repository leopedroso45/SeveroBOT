const Discord = require("discord.js");
const client = new Discord.Client();
const path = "D:/Projetos/Discord/SeveroBOT/audio/";

var prefix = "-";
var sufix = ["bem?", "oi", "Tchau"];

var audio = ["1", "2", "3", "4", "5", "6"];
//var random = Math.floor(Math.random() * (5 - 0 + 1)) + 0;

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", message => {
  if (!message.content.startsWith(prefix)) {
    return;
  } else if (!message.guild) {
    return;
  } else if (message.content.startsWith(prefix + sufix[0])) {
    message.channel.send("Sim, estou bem e você?");
  } else if (message.content.startsWith(prefix + sufix[1])) {
    message.channel.send("Oi :)");
  } else if (message.content.startsWith(prefix + sufix[2])) {
    message.channel.send("Tchau!");
  } else if (message.content.startsWith(prefix + "meu avatar")) {
    message.reply(message.author.avatarURL);
  } else if (message.content.startsWith(prefix + "join")) {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel
        .join()
        .then(connection => {
          // Connection is an instance of VoiceConnection
          message.reply("I have successfully connected to the channel!");
          var random = Math.floor(Math.random() * (5 - 0) + 0);
          var dispatcher = connection.playFile(path + audio[random] + ".m4a");
          dispatcher.on("end", () => {
            // The song has finished
            message.reply("Acabou o audio!");
          });

          dispatcher.on("error", e => {
            // Catch any errors that may arise
            console.log("Deu erro" + e);
            message.reply("Deu erro, olha lá no log programador burro!");
          });

          //dispatcher.setVolume(0.5); // Set the volume to 50%
          dispatcher.setVolume(1); // Set the volume back to 100%

          //console.log(dispatcher.time); // The time in milliseconds that the stream dispatcher has been playing for
          //dispatcher.pause(); // Pause the stream
          //dispatcher.resume(); // Carry on playing
          //dispatcher.end();
        })
        .catch(console.log);
    } else {
      message.reply("You need to join a voice channel first!");
    }
  } else if (message.content.startsWith(prefix + "leave")) {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave();
      message.reply(":sob:");
    } else {
      message.reply("??????????");
    }
  }
});

client.on("guildMemberAdd", member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === "welcome");
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, we love you :heart:  ${member}`);
});

client.login("Your token");
