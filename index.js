const Discord = require('v11-discord.js');
const { red, green, blue, yellow, cyan, magenta } = require('chalk');
const bot = new Discord.Client();
const settings = require('./settings.json');
const prefixEmote = "e-"

console.log(yellow('============================================================================'));
console.log(magenta(`[COMMAND LIST] :: ${settings.prefix}ping :: Displays your ping`));
console.log(magenta(`[COMMAND LIST] :: ${settings.prefix}purge [100]:: Deletes 100 messages you sent.`));
console.log(magenta(`[COMMAND LIST] :: ${settings.prefix}embed [content] :: Send a message in a embed.`));
console.log(magenta(`[COMMAND LIST] :: ${settings.prefix}restart :: Restarts the bot`));
console.log(magenta(`[COMMAND LIST] :: ${settings.prefix}spam [ID] [content] :: Spam a users DM`));
console.log(magenta(`[COMMAND LIST] :: ${settings.prefix}join [ID] :: Join channel on other server`));
bot.on('ready', () => {

    console.log(green(`[SELF BOT] :: ${bot.user.tag} is online and ready`));
    console.log(green(`[SELF BOT] :: my prefix is: ${settings.prefix}`));
    console.log(yellow('============================================================================'));
});

bot.on('message', async (msg) => {
    if (msg.author.id !== settings.ID) {
        return;
    }
    ///////////////////////////////////////////////////////////////////////
    let cmd = msg.content.split(" ")[0]
    cmd = cmd.slice(settings.prefix.length);
    let args = msg.content.split(" ").slice(1);
    if (msg.content.startsWith(settings.prefix) && msg.author.id === settings.ID) {
        console.log(magenta(`COMMAND RAN | ${msg.content}`));
    }
    if (msg.content.startsWith(prefixEmote) && msg.author.id === settings.ID) {
        console.log(magenta(`E-COMMAND RAN | ${msg.content}`));
    }
    ///////////////////////////////////////////////////////////////////////
    if (cmd === 'ping') {
        msg.edit(`:ping_pong: pong! your ping is: *${bot.ping.toFixed()}ms*`);
    }
    ///////////////////////////////////////////////////////////////////////
    if (cmd === 'purge') {
        msg.channel.fetchMessages({ limit: 100 }).then(msgs => msgs.filter(m => m.author.id === bot.user.id).map(r => r.delete()))
    }
    ///////////////////////////////////////////////////////////////////////
    if (cmd === 'embed') {

        let eContent = args.slice(0).join(" ");
        msg.delete();
        msg.channel.send("", { embed: new Discord.RichEmbed().setColor(`5500FF`).setDescription(eContent).setFooter(msg.client.user.tag, msg.author.displayAvatarURL).setTimestamp() });
    }
    ///////////////////////////////////////////////////////////////////////
    if (cmd === 'restart') {
        process.exit();
    }
    ///////////////////////////////////////////////////////////////////////
    if (cmd === 'spam') {
        let user = (args[0]);
        let mContent = args.slice(1).join(" ");
        bot.setInterval(() => {
            bot.users.get(user).send(mContent);
        }, 1500);
        console.log(red(`[CMD INFOMATION] :: YOU MUST RESTART THE BOT IN ORDER TO STOP THE SPAM`));
    }
    ///////////////////////////////////////////////////////////////////////
    if (cmd === "join") {
        let idchannel = (args[0]);
        let channel = msg.client.channels.get(idchannel)
        channel.join();
        msg.delete();
        console.log("Channel Join");
    }
    ///////////////////////////////////////////////////////////////////////
    // if(cmd === 'leave'){
    //     msg.client.shardDisconnect;
    // }
    ///////////////////////////////////////////////////////////////////////
    /////////////////////////////COMMANDS EMOTES///////////////////////////
    ///////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////
    /////////////////////////////KISS//////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    const randomKiss = [
        "https://i.imgur.com/gNg8bdQ.gif",
        "https://i.imgur.com/i9Zni5X.gif",
        "https://i.imgur.com/XoYMeXM.gif",
        "https://i.imgur.com/7e6ZLEl.gif",
        "https://i.imgur.com/YT8k2Sp.gif",
        "https://i.imgur.com/rOYqN9n.gif",
        "https://i.imgur.com/6AM7iqS.gif",
        "https://i.imgur.com/Oovk8xo.gif",
        "https://i.imgur.com/461lHE5.gif",
        "https://i.imgur.com/JKqAJUc.gif",
        "https://i.imgur.com/UUysZYs.gif",
        "https://i.imgur.com/RyHIckV.gif",
        "https://i.imgur.com/MDCQUfy.gif",
        "https://i.imgur.com/9KG4QkN.gif",
        "https://i.imgur.com/rPKF89t.gif",
        "https://i.imgur.com/Nh0dS7e.gif",
        "https://i.imgur.com/sKSW2pl.gif",
        "https://i.imgur.com/F7gmjb3.gif",
        "https://i.imgur.com/qy962w8.gif",
        "https://i.imgur.com/7OWbZuE.gif"
    ]
    let reponseKiss = randomKiss[Math.floor(Math.random() * randomKiss.length)];
    if (msg.content == prefixEmote + "kiss") {
        msg.delete();
        msg.channel.send("", { embed: new Discord.RichEmbed().setColor(`5500FF`).setImage(reponseKiss).setFooter(msg.client.user.tag, msg.author.displayAvatarURL).setTimestamp()})
    }
    ///////////////////////////////////////////////////////////////////////
    /////////////////////////////DECLARATION///////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    if (msg.content == prefixEmote + "déclaration") {
        msg.delete();
        msg.channel.send("", { embed: new Discord.RichEmbed().setColor(`5500FF`).setDescription("Voudrais-tu partager cette image avec moi ?").setImage("https://i.imgur.com/5tXvZFc.gif").setFooter(msg.client.user.tag, msg.author.displayAvatarURL).setTimestamp() })
            .then(msg => {
                msg.react('✅').then(() => msg.react('❌'));

                const filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id != msg.author.id;
                };

                msg.awaitReactions(filter, { max: 1, time: 1800000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();

                        if (reaction.emoji.name === '✅') {
                            msg.reply("", { embed: new Discord.RichEmbed().setColor(`5500FF`).setDescription("Mooh... I love you <3").setImage("https://i.imgur.com/we0v0R0.gif").setFooter(msg.client.user.tag, msg.author.displayAvatarURL).setTimestamp() });
                        } else {
                            msg.reply("", { embed: new Discord.RichEmbed().setColor(`5500FF`).setDescription("Je-euh... Sorry </3").setImage("https://i.imgur.com/wWUl51r.gif").setFooter(msg.client.user.tag, msg.author.displayAvatarURL).setTimestamp() })
                            
                        }
                    })
                    .catch(collected => {
                        msg.reply('No problem...');

                    });
            });
    }
    ///////////////////////////////////////////////////////////////////////
    /////////////////////////////HUGS//////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    if (msg.content == prefixEmote + "hug") {
        msg.delete();
        msg.channel.send("", { embed: new Discord.RichEmbed().setColor(`5500FF`).setDescription("J'aimerai te hug...").setImage("https://i.imgur.com/Ej4Huqe.gif").setFooter(msg.client.user.tag, msg.author.displayAvatarURL).setTimestamp() })
            .then(msg => {
                msg.react('✅').then(() => msg.react('❌'));

                const filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id != msg.author.id;
                };
                const hugArray = [
                    "https://i.imgur.com/TqWDaY1.gif",
                    "https://i.imgur.com/wAlJ5eF.gif",
                    "https://i.imgur.com/tEUNbkn.gif",
                    "https://i.imgur.com/qKkooU8.gif",
                    "https://i.imgur.com/s2i97Ue.gif",
                    "https://i.imgur.com/hu1tdJE.gif",
                    "https://i.imgur.com/ohGN7Hs.gif",
                    "https://i.imgur.com/E05LIyy.gif",
                    "https://i.imgur.com/g9aQZn6.gif",
                ]
                let reponseHug = hugArray[Math.floor(Math.random() * hugArray.length)];
                msg.awaitReactions(filter, { max: 1, time: 1800000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();

                        if (reaction.emoji.name === '✅') {
                            
                            msg.reply("", { embed: new Discord.RichEmbed().setColor(`5500FF`).setDescription("*Saute dans tes bras*").setImage(reponseHug).setFooter(msg.client.user.tag, msg.author.displayAvatarURL).setTimestamp() });
                        } else {
                            msg.reply("", { embed: new Discord.RichEmbed().setColor(`5500FF`).setDescription("Pas de soucis, no means no :)").setImage("https://i.imgur.com/R9albUo.gif").setFooter(msg.client.user.tag, msg.author.displayAvatarURL).setTimestamp() })
                        }
                    })
                    .catch(collected => {
                        msg.reply('No problem...');

                    });
            });
    }
});


bot.login(settings.token);
