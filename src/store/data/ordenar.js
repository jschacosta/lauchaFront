function ordenarFecha(payload) {
    const datos =payload.sort(function (valor1,valor2){
        //si valor1 tiene un valor mayor que valor2, se va hacia abajo
        if (valor1.fechaPartido < valor2.fechaPartido) return -1;
        if (valor1.fechaPartido > valor2.fechaPartido) return 1;
        //lo mismo pero para la hora
        if (valor1.horaPartido < valor2.horaPartido) return -1;
        if (valor1.horaPartido > valor2.horaPartido) return 1;
    })
    return datos
}

function ordenarPuntoNombre(payload){
    payload[0].players.sort(function (valor1,valor2){
        //si valor1 tiene un valor mayor que valor2, se va hacia abajo
        if (valor1.points > valor2.points) return -1;
        if (valor1.points < valor2.points) return 1;
        //lo mismo pero para el nombre
        if (valor1.nickName < valor2.nickName) return -1;
        if (valor1.nickName > valor2.nickName) return 1;
    })
    return payload
}
module.exports = {ordenarFecha, ordenarPuntoNombre}