module.exports = {
    name: 'estado',
    description: 'Estado de todos los servidores',
    execute(message, serverList) {

        var msg = '**Estado del servidor:**\n';

        for (i=0; i<serverList.length; i++){
            if (eval('typeof ' + serverList[i] + ' != "undefined"')){
                msg += (serverList[i] +  ' está en línea.\n');
            }else{
                msg += (serverList[i] + ' está apagado.\n');
            }
        }
        
        message.channel.send(msg);

    }
}
