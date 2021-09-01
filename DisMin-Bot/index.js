
// Requerir comando de configuración
const fs = require('fs'); // Iniciar el administrador de archivos de sistema
const configFile = require('./config.js');


// Iniciación del bot de Discord
const Discord = require('discord.js'); // Requerir Discord.js del directorio
const bot = new Discord.Client(); // Crear una instancia de bot
const token = configFile.token; // Token de bot del archivo de configuración


// Iniciación de comandos
const prefix = '+'; // Prefijo de los comandos
bot.commands = new Discord.Collection(); // Crea una colección para los comandos
var commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); // Localización de los comandos
for (const file of commandFiles) {
    const command = require(`./commands/${file}`); // Añade comandos
    bot.commands.set(command.name, command);
}
// Obtener permisos de comandos por canal
const cmdChannel = configFile.cmdChannel;
const lvl1 = configFile.level1;
const lvl2 = configFile.level2;
const lvl3 = configFile.level3;

// Info. de iniciación del servidor
const util = require('minecraft-server-util'); // Iniciación para el comando de +info
var serverIP = configFile.serverIP; // IP del servidor, de el archivo de configuración
var path = configFile.path; // Directorio de carpeta de servidores
let serverList = [];
fs.readdir(path, serverList, function (err, items) {
    for (var i = 0; i < items.length; i++) {
        serverList.push(items[i]); // Añade cada servidor encontrado a la lista de servidores
    }
    return serverList;
});
const serverConfigs = configFile.serverConfigs; // Consigue las configuraciones del servidor del archivo de configuración
const singleServer = configFile.singleServer; // Consigue la configuración de único servidor

// Estados del bot
bot.on('ready', () => {
    console.log('¡Este bot está ahora en línea!'); // Si el bot está listo en consola
    bot.user.setActivity('saltar en el End', { type: 'PLAYING' });
})

bot.login(token); // Intento de inicio de sesión con el token


bot.on('guildMemberAdd', member => { // Cuando entra un nuevo miembro
    // Enviar el mensaje al servidor designado
    const channel = member.guild.channels.cache.find(ch => ch.name === 'circulo-1');
    // No hacer nada si el canal no fue encontrado en el servidor
    if (!channel) return;
    // Enviar el mensaje, etiquetando al usuario en el canal designado
    channel.send(`Hey, ${member}` + ' si necesitas ayuda con el servidor de Minecraft, escribe +ayuda en el chat. ¡Honk honk!');
});


bot.on('message', message => { // Si el bot ve un mensaje, que haga la función de la flecha

    if(!message.content.startsWith(prefix) || message.author.bot) return; // Si los contenidos del mensaje inician con el prefijo designado,
                                                                          // dividir el mensaje después de cada espacio
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(command === 'ayuda'){
        bot.commands.get('ayuda').execute(message, args);
    }

    if(command === 'ping'){
        message.reply('¡pog!');
    }

    if(command === 'ip'){
        if (!message.member.roles.cache.find(r => r.name === lvl1)) return message.reply("No tienes permiso para hacer eso.\nEtiqueta o escríbele a un administrador para volverte capaz.")
        message.author.send('La IP del servidor es ' + serverIP + '. \n¡Bienvenido a Vecindad Payaso!');
    }

    if(command === 'estado'){
        if (!message.member.roles.cache.find(r => r.name === lvl1)) return message.reply("No tienes permiso para hacer eso.\nEtiqueta o escríbele a un administrador para volverte capaz.")

        bot.commands.get('estado').execute(message, serverList);
    }

    if(command === 'servidores'){
        if (!message.member.roles.cache.find(r => r.name === lvl1)) return message.reply("No tienes permiso para hacer eso.\nEtiqueta o escríbele a un administrador para volverte capaz.")

        bot.commands.get('servidores').execute(message, serverList);
    }

    if(command === 'info'){
        if (!message.member.roles.cache.find(r => r.name === lvl1)) return message.reply("No tienes permiso para hacer eso.\nEtiqueta o escríbele a un administrador para volverte capaz.")
        if (args[0] === undefined) {
            message.reply("debes ingresar un nombre de servidor para obtener información.");
        } else { bot.commands.get('info').execute(util, message, args, Discord);
        }
    }

    if(command === 'iniciar'){
        if (message.channel.name != cmdChannel) return message.reply("por favor mantenga todos los comandos relacionados a comandos en " + cmdChannel + ".")
        if (!message.member.roles.cache.find(r => r.name === lvl2)) return message.reply("no tienes permiso para hacer eso.\nSolo administradores pueden realizar esto, intenta escribiéndole a uno o etiquetándolo.")

        if (args[0] === undefined) {
            message.reply("debes ingresar un nombre de servidor para iniciar.");
        } else { bot.commands.get('iniciar').execute(message, args, serverConfigs, path, serverList, singleServer) }

    }

    if(command === 'detener'){
        if (message.channel.name != cmdChannel) return message.reply("por favor mantenga todos los comandos relacionados a comandos en " + cmdChannel + ".")
        if (!message.member.roles.cache.find(r => r.name === lvl2)) return message.reply("No tienes permiso para hacer eso.\nEtiqueta o escríbele a un administrador para volverte capaz.")

        if (args[0] === undefined) {
            message.reply("debes ingresar un nombre de servidor para detener.");
        } else (bot.commands.get('detener').execute(message, args, serverConfigs));

    }

    if(command === 'cmd'){
        if (!message.member.roles.cache.find(r => r.name === lvl3)) return message.reply("Solo un administrador puede realizar este comando.")

        if (args[0] === undefined) {
            message.reply("debes ingresar un nombre de servidor para escribir en su consola.");
        } else { bot.commands.get('cmd').execute(message, args, serverConfigs, path) }

    }

    if(command === 'borrar'){
        if (!message.member.roles.cache.find(r => r.name === lvl3)) return message.reply("Solo un administrador puede realizar este comando.")

        bot.commands.get('borrar').execute(message, args);
    }

    }

)