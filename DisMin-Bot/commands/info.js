module.exports = {
    name: 'info',
    description: 'información de cada servidor',
    execute(util, message, args, Discord){
        switch(args[0]){
            case 'Escoria':
                util.status('mc.vecindadpayaso.com')  
                    .then((response) => {
                        const Embed = new Discord.MessageEmbed()
                        .setColor('#FFFF00')
                        .setAuthor('+info ' + args[0])
                        .setTitle('Estado del servidor')
                        .setThumbnail('https://vulcan.dl.playstation.net/img/cfn/11307x4B5WLoVoIUtdewG4uJ_YuDRTwBxQy0qP8ylgazLLc01PBxbsFG1pGOWmqhZsxnNkrU3GXbdXIowBAstzlrhtQ4LCI4.png?w=50&h=50&bg_color=000000&opacity=100&_version=00_09_000')
                        .addFields(
                            { name: 'IP del servidor', value: response.host },
                            { name: 'Versión del servidor', value: response.version },
                            { name: 'Jugadores en línea', value: response.onlinePlayers, inline: true },
                            { name: 'Máxima cantidad de jugadores', value: response.maxPlayers, inline: true },              
                        )
                        .setTimestamp()
                        .setFooter('Información sobre el servidor de ' + args[0])
                        message.channel.send(Embed)
                    })
                    .catch((error) => { 
                        throw error;
                    });
                }
            }
        }