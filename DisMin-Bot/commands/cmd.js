module.exports = {
    name: 'cmd',
    description: 'envía argumento de comando al servidor especificado',
    execute(message, args, serverConfigs) {

        var serverConfigs1 = JSON.parse(JSON.stringify(serverConfigs));
        console.log(args[0])

        for (i = 0; i < serverConfigs1.length; i++) {
            if (args[0] == serverConfigs1[i][0]) {
                var name = serverConfigs1[i].shift();
                var consoleChan = serverConfigs1[i].pop();
                break;
            } else if (args[0] == serverConfigs1[i][0]) {
                var name = serverConfigs1[i].shift();
                var consoleChan = serverConfigs1[i].pop();
                break;
            } else if (i === serverConfigs1.length - 1) {
                message.reply("el servidor no fue encontrado, asegúrate de usar la capitalización correcta.\nUsa +servidores para revisar.");
                return;
            }
        }

        var entr = '\n';
        var command = '';
        
        

        if (eval('typeof ' + name + '=== "undefined"')) {
            message.reply(args[0] + ' no está en línea.');
        }
        else {
            if (!args[1]) { return message.reply('necesita un argumento de comando.') }
            else {
                command += args[1];
                for (i = 2; i < args.length; i++) {
                    command += (' ' + args[i]);
                }
                command += entr;
                console.log(command);
            }
            eval(name).stdin.write(command);
        }
    }
}
