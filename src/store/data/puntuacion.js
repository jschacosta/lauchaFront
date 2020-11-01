function score(p,j,apuesta) {
    //const p = [ p1, p2 ];  Resultado partido final [ local , visita ]
    //const j = [ j1, j2 ];  Resultado jugador final [ local , visita ]
    // const apuesta = [local,empate,visita]
    //desglose = [resultado, dif gol, marc exacto]
    var suma = 0;
    var desglose = [null,null,null]
    console.log('jugador')
    console.log(j)
    if (p[0] - p[1] === 0 && p[0]!=null && (j[0]!=="" || j[1]!=="") && (j[0]!=null || j[1]!=null) && apuesta[1]!=0 ){
        if (j[0] - j[1] === 0) {
            suma += apuesta[1] //resultado Empate
            suma += 50 ; //diferencia goles
            desglose[0] = apuesta[1]
            desglose[1] = 50 
            if (j[0] - p[0] === 0) {
                suma += 100; //exacto con goles
                desglose[2]=100
            }
        }
    }
    if (p[0] - p[1] != 0 && (j[0]!="" || j[1]!="") && (j[0]!=null || j[1]!=null) ) { 
        if ( (p[0] - p[1] > 0 && j[0] - j[1] > 0) || (p[0] - p[1] < 0 && j[0] - j[1] < 0) ) {
            if(p[0] - p[1] > 0 && j[0] - j[1] > 0 && apuesta[0]!=0){
                suma += apuesta[0]; //resultado Local
                desglose[0] = apuesta[0]
                if (p[0] - p[1] === j[0] - j[1] || p[1] - p[0] === j[1] - j[0]) {
                    suma += 50 + 50 * Math.abs(p[0] - p[1]); // diferencia goles
                    desglose[1] = 50 + 50 * Math.abs(p[0] - p[1]);
                    if (p[0] === j[0] && p[1] == j[1]) {
                        suma += 100; // exacto con goles
                        desglose[2]=100
                    }
                }
            }
            if(p[0] - p[1] < 0 && j[0] - j[1] < 0 && apuesta[2]!=0){
                suma += apuesta[2]; //resultado Visita
                desglose[0] = apuesta[2]
                if (p[0] - p[1] === j[0] - j[1] || p[1] - p[0] === j[1] - j[0]) {
                    suma += 50 * Math.abs(p[0] - p[1]); // diferencia goles
                    desglose[1] = 50 * Math.abs(p[0] - p[1]);

                    if (p[0] === j[0] && p[1] == j[1]) {
                        suma += 100; // exacto con goles
                        desglose[2]=100
                    }
                }
            }
        }
    }
    return {suma:suma,desglose:desglose}  
}

module.exports = {score}