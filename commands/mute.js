async function muteUser(user, timeFrame, guild, msg) {
    const time = parseFloat(timeFrame);
    if (isNaN(time)){
        msg.reply("Pilas que eso no es un tiempo valido.");
        return;
    }
    if(time < 0) {
        msg.reply("Haces eso de nuevo y te meto la mano.");
        return;
    }

    const members = await guild.members.fetch();
    // Trying with usernames
    let member = members.filter((member) => member.user.username.toLowerCase().includes(user));
    // Trying with nicknames
    if ([...member].length === 0) member = members.filter((member) => member.nickname != null && member.nickname.toLowerCase().includes(user));
    if ([...member].length === 0) {
        msg.reply("Ese man solo lo conoce la mama.");
        return;
    }
    const memberToMute = [...member][0][1];

    let timeInMs = time * 1000 * 60;
    if(timeInMs > 2147483647){
        msg.reply("Ponte serio pri, mejor mandalo a dormir");
        return;
    }
    await memberToMute.edit({mute: true});

    const channels = await guild.channels.fetch();
    const replyChannelMap = channels.filter((channel => channel.type === "GUILD_TEXT" && channel.name === "bots"));
    const commandChannelMap = channels.filter((channel => channel.type === "GUILD_TEXT" && channel.name === "wmd"));

    const replyChannel = [...replyChannelMap][0][1];
    const commandChannel = [...commandChannelMap][0][1];
    
    const timeAbrev = time === 1 ? 'minuto': 'minutos'
    replyChannel.send(`${memberToMute.user} y si te callas por ${time} ${timeAbrev}`);
    
    setTimeout(async () => {
        console.log('desmuteando')
        memberToMute.edit({mute: false});
        let oldMessages = await commandChannel.messages.fetch();
        commandChannel.bulkDelete(oldMessages);
    }, timeInMs);
}

export { muteUser };