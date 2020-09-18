import puntuacion from '../data/puntuacion';
export default{
    namespaced:true,
    name:'torneo',
    state:{
        torneos:[{name:"",players:[]}],
        boton:true,
        botonDos:false,
        porJugar:[],
        matchJugador:[],
        dialogo:false
    },
    mutations:{
        cambiarDialog(state,payload){
            state.dialogo=payload
        },
        obtenerTorneos(state,payload){
            if(payload.length===0){
                state.torneos=[{name:"",players:[]}]
            }
            if(payload.length!=0){
                if(payload[0].players.length===0){
                    state.torneos=payload
                }
                if(payload[0].players.length!=0){
                    payload[0].players.sort(function (valor1,valor2){
                        //si valor1 tiene un valor mayor que valor2, se va hacia abajo
                        if (valor1.points > valor2.points) return -1;
                        if (valor1.points < valor2.points) return 1;
                        //lo mismo pero para el nombre
                        if (valor1.nickName < valor2.nickName) return -1;
                        if (valor1.nickName > valor2.nickName) return 1;
                    })
                    state.torneos=payload
                }    
            }
        }, 
        cambiarBoton(state, payload){ 
            state.boton= payload
        },
        cambiarBotonDos(state){
            state.botonDos=!state.botonDos
        },
        eliminarTorneo(state,payload){
            let eliminar = payload;
            const index=state.torneos.findIndex(item=>item._id === eliminar._id);
            state.torneos.splice(index,1);
            state.torneos=[{name:"",players:[]}]
        },
        ordenarPorJugar(state, payload){
            payload.sort(function (valor1,valor2){
                //si valor1 tiene un valor mayor que valor2, se va hacia abajo
                if (valor1.fechaPartido < valor2.fechaPartido) return -1;
                if (valor1.fechaPartido > valor2.fechaPartido) return 1;
                //lo mismo pero para la hora
                if (valor1.horaPartido < valor2.horaPartido) return -1;
                if (valor1.horaPartido > valor2.horaPartido) return 1;
            })
            state.porJugar=payload
        },
        ordenarJugador(state, payload){
            payload.sort(function (valor1,valor2){
                //si valor1 tiene un valor mayor que valor2, se va hacia abajo
                if (valor1.fechaPartido < valor2.fechaPartido) return -1;
                if (valor1.fechaPartido > valor2.fechaPartido) return 1;
                //lo mismo pero para la hora
                if (valor1.horaPartido < valor2.horaPartido) return -1;
                if (valor1.horaPartido > valor2.horaPartido) return 1;
            })
            state.matchJugador=payload
        }
    },
    actions:{
        agregarPorJugar({commit,rootState,state},payload){
            // let torneos = rootState.torneo.torneos[0].matches;
            const arrayPorjugar =[]
            const arrayJugador = []
            for(let item of payload[1]){
                for(let item2 of payload[0][0].matches){
                    if(item._id===item2._id){
                        arrayJugador.push(item)
                    }
                    if(item._id===item2._id && item.estado==='POR JUGAR'){
                        arrayPorjugar.push(item)
                    }
                }
            }
            console.log(arrayPorjugar)
            console.log(arrayJugador)
            commit('ordenarPorJugar',arrayPorjugar)
            commit('ordenarJugador',arrayJugador)
        },
        puntajes({commit},torneo){
            if(torneo[0].name==='' && torneo[0].players.length===0){
                const vacio= []
                commit('obtenerTorneos',vacio)
            }
            if(torneo[0].name!='' && torneo[0].players.length===0){
                const vacio= []
                commit('obtenerTorneos',torneo)
            }
            if(torneo[0].players.length!=0){
                for (let jugador of torneo[0].players){
                    var ptsAcumulados=0
                    for (let partido of jugador.matches){
                        const index=torneo[0].matches.findIndex(item=>item._id === partido._id);
                        //Funcion que suma puntajes según score, las entradas son arreglos
                        const suma = puntuacion.score(torneo[0].matches[index].score, partido.score)
                        ptsAcumulados+=suma
                        //funcion que suma puntajes segun reglas escogidas
                        const i = 0
                        for(let reglas of partido.ruleElections){
                            if(reglas===torneo[0].matches[index].ruleResult[i]-1 && reglas!=null ){
                                ptsAcumulados+=torneo[0].matches[index].ruleApuesta[i]
                            }
                            i++
                        }
                    }
                    jugador.points=ptsAcumulados
                }
                commit('obtenerTorneos',torneo)
            }
        }

    },
    modules:{
        puntuacion
    }
}