module.exports = {
    name: 'ayuda',
    description: 'Lista de comandos',
    execute(message, args){
        message.reply('así que necesitas ayuda, ¡pues aquí están los comandos que puedes usar para interactuar conmigo!.\n\
        \nTodos los comandos deben iniciar con el prefijo <+>, y no tienen que ser escritos exactamente, mientras que los nombres de los servidores sí.\n\
        \n> +servidores - Este comando provee una lista de los servidores disponibles.\n\
        \n> +ip - Este comando te provee la IP del servidor.\n\
        \n> +estado - Este comando te permitirá ver qué servidores están en línea.\n\
        \n> +info "Nombre del servidor" - Este comando te dará la información del servidor que hayas indicado.\n\
        \n> +iniciar "Nombre del servidor" - Este comando iniciará el servidor que hayas indicado.\n\
        \n> +detener "Nombre del servidor" - Este comando detendrá el servidor que hayas indicado.\n\
        \n> +borrar "Cantidad" - Este comando borrará la "Cantidad" de mensajes del canal en que se escriba.\n\
        \n> +cmd "Nombre del servidor" "Comando" - Este comando ejecutará el "Comando" que hayas indicado en la consola del servidor.');
    }
}