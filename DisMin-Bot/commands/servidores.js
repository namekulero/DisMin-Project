module.exports = {
    name: 'servidores',
    description: 'Muestra la lista de servidores',
    execute(message, serverList) {
        var msg = 'Ahora mismo hay ' + serverList.length + ' servidor(es)...\n';

        msg += serverList[0] + ',\n';
        for (i = 1; i < serverList.length; i++) {
            msg += serverList[i] + ',\n';
        }

        msg += 'Para más información de cualquier servidor en línea, escribe: +info "Nombre del servidor"';
        message.channel.send(msg);
    }
}