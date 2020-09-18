function score(p,j) {
    //const p = [ p1, p2 ];  Resultado partido final [ local , visita ]
    //const j = [ j1, j2 ];  Resultado jugador final [ local , visita ]
    var suma = 0;
    if (p[0] - p[1] === 0 && p[0]!=null) {
        if (j[0] - j[1] === 0) {
            suma += 100; //resultado
            suma += 50 * p[0]; //diferencia goles
            if (j[0] - p[0] === 0) {
                suma += 100; //exacto con goles
            }
        }
    }
    if (p[0] - p[1] != 0) {
        if ( (p[0] - p[1] > 0 && j[0] - j[1] > 0) || (p[0] - p[1] < 0 && j[0] - j[1] < 0) ) {
            suma += 100; //resultado
            if (p[0] - p[1] === j[0] - j[1] || p[1] - p[0] === j[1] - j[0]) {
                suma += 50 * Math.abs(p[0] - p[1]); // diferencia goles
                if (p[0] === j[0] && p[1] == j[1]) {
                    suma += 100; // exacto con goles
                }
            }
        }
    }
    return suma  
}

module.exports = {score}