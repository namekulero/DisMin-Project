module.exports = {
    name: 'iniciar',
    description: 'starts arg server',
    execute(message, args, serverConfigs, path, serverList, singleServer) {

        if (singleServer == true){
            if(singleServerFunc(serverList) == true){
                return message.reply('solo puedes iniciar un servidor a la vez.\n Por favor, detén el servidor iniciado antes de iniciar otro.')
            }
        }

        var serverConfigs1 = JSON.parse(JSON.stringify(serverConfigs));

        for (i = 0; i < serverConfigs1.length; i++) {
            if(args[0] == serverConfigs1[i][0]){
                var name = serverConfigs1[i].shift();
                var java = serverConfigs1[i].shift();
                var consoleChan = serverConfigs1[i].pop();
                var port = serverConfigs1[i].pop();
                var commands = serverConfigs1[i];
                break;
            } else if (i === serverConfigs.length-1) {
                message.reply("el servidor no fue encontrado, asegúrate de usar la capitalización correcta.\nUsa +servidores para revisar.");
                return;
            }
        }

        if (eval('typeof ' + name + ' != "undefined"')){
            message.reply(name + ' ya está iniciado.');
            return;
        }else{message.reply('por favor espera mientras ' + name + ' haya iniciado.\nEsto puede tomar un par de minutos mientras puedas entrar.')}

        var currentDir = path+  '/'+ name + '/';

        // Require Node.js standard library function to spawn a child process
        var spawn = require('child_process').spawn;

        // Create a child process for the Minecraft server using the same java process
        // invocation we used manually before
        eval('global.' + name + ' = spawn(java, commands, { cwd: currentDir });');
        
        // Listen for events coming from the minecraft server process - in this case,
        // just log out messages coming from the server
        function log(data) {
            process.stdout.write(data.toString());

        }
        
    
        var msg;
        var consoleOutput = "> Console Output:\n";

        eval(name).stdout.on('data', code => {
            console.log( consoleOutput + `${code}`);
            message.client.channels.cache.find(channel => channel.name === consoleChan).send(`Console Output:\n${code}`);
            msg = `${code}`;

        });


        eval(name).stderr.on('data', log);


        eval(name).on('exit', code => {
            console.log(`Exit code is: ${code}`);
            message.channel.send(name + ' se detuvo, revisa ' + consoleChan + ' para más información.');
            message.client.channels.cache.find(channel => channel.name === consoleChan).send(`Server Exit Code:\n${code}`);
            message.client.channels.cache.find(channel => channel.name === consoleChan).send('Last Console Output:\n' + msg);
            eval('delete ' + name);
        });


        
        //single server function
        function singleServerFunc(arrayserverList) {
            
            for (i = 0; i < serverList.length; i++) {
                if (eval('typeof ' + serverList[i] + ' != "undefined"')) {
                    return true;
                } else if (i == serverList.length){
                    return false;
                }
            }

        }//function


    }
    
}