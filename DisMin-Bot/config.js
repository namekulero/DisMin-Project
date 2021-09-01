// Token del bot de Discord
module.exports.token = '';

// IP del servidor
module.exports.serverIP = '';

// Dónde queda la carpeta con los servidores
module.exports.path = '';

// ¿Es solo un servidor?
module.exports.singleServer = true;

// Canal de comandos
module.exports.cmdChannel = '';

// Niveles de permiso
    //level1 puede usar info, servers e IP
module.exports.level1 = 'roleName';
    //level2 puede usar start y stop
module.exports.level2 = 'roleName';
    //level3 puede usar cmd y clear
module.exports.level3 = 'roleName';

/* to config each server they must have 3 arguments PROPER arguments
1. The name of the server this must match the file name in directory EXACTLY
2. This is the command arguments to start your server (this can also be found by editing you start .bat file)
3. This is the port number if you plan on running more than one server at a time
4. This is the amount of RAM the server is allocated again only matters for multi-server
copy the line below for each MC Server in directory path*/

module.exports.serverConfigs = [];

//copy the line below to add each of those servers
                  //ServerNumber   //Dir.Name   //StartCommands                                      //Port    //ConsoleChannel
module.exports.serverConfigs[0] = ['folderName', 'java', '-Xmx2G', '-Xms1G', '-jar', 'fileName.jar', '25565', 'consoleChannel'];

