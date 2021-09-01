module.exports = {
    name: 'detener',
    description: 'stops arg server',
    execute(message, args, serverConfigs) {

        var serverConfigs1 = JSON.parse(JSON.stringify(serverConfigs));

        for (i = 0; i < serverConfigs1.length; i++) {
            if (args[0] == serverConfigs1[i][0]) {
                var name = serverConfigs1[i].shift();
                var consoleChan = serverConfigs1[i].pop();
                break;
            } else if (i === serverConfigs1.length - 1) {
                message.reply("el servidor no fue encontrado, asegúrate de usar la capitalización correcta.\nUsa +servidores para revisar.");
                return;
            }
        }
        var stopCMD = 'stop\n';

        if (eval('typeof ' + name + '=== "undefined"')) {
            message.reply(args[1] + ' no está en línea.');
        }
        else {
            eval(name).stdin.write('stop\n');
            eval('delete ' + name);
        }
    }
}
