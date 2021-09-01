module.exports = {
    name: 'borrar',
    description: 'borra mensajes',
    execute(message, args){
        if (!args[0]) return message.reply("Especifica el número de mensajes a borrar. Por ejemplo:\n+borrar 10");
        var num = parseInt(args[0]);
        if(num>100){
        for(i = 0;i<num/100;i++){
            message.channel.bulkDelete(100);
        }
        }else{
            message.channel.bulkDelete(args[0]);
        }
    }
}