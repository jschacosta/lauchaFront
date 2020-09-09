export default{
    namespaced:true,
    state:{
        partidosCalendario:[],
        partidosTerminados:[],
        pedido:false,
        pedido2:false
    },
    mutations:{
        ordenarCalendario(state){
            state.partidosCalendario.sort(function (valor1,valor2){
                //si valor1 tiene un valor mayor que valor2, se va hacia abajo
                if (valor1.fechaPartido < valor2.fechaPartido) return -1;
                if (valor1.fechaPartido > valor2.fechaPartido) return 1;
                //lo mismo pero para la hora
                if (valor1.horaPartido < valor2.horaPartido) return -1;
                if (valor1.horaPartido > valor2.horaPartido) return 1;
            })
        },
        ordenarTerminados(state){
            state.partidosTerminados.sort(function (valor1,valor2){
                //si valor1 tiene un valor mayor que valor2, se va hacia abajo
                if (valor1.fechaPartido < valor2.fechaPartido) return -1;
                if (valor1.fechaPartido > valor2.fechaPartido) return 1;
                //lo mismo pero para la hora
                if (valor1.horaPartido < valor2.horaPartido) return -1;
                if (valor1.horaPartido > valor2.horaPartido) return 1;
            })
        },
        pedir(state){
            state.pedido=true
        },
        pedir2(state){
            state.pedido2=true
        }
    },
    actions:{    
        añadirCalendario({commit, state},payload){
            const partidos = payload
            for (let item of partidos){
                state.partidosCalendario.push(item)    
            }
            commit('ordenarCalendario')
        },
        obtenerCalendario({commit, state},payload){ 
            state.partidosCalendario= payload
            commit('ordenarCalendario')
        },
        estadoCalendario({commit,state},payload){
            let partido = payload
            const index=state.partidosCalendario.findIndex(item=>item._id === partido._id);
            state.partidosCalendario.splice(index,1);
            state.partidosCalendario.push(partido)
            commit('ordenarCalendario')
        },
        eliminarCalendario({commit, state}, payload){
            let partido = payload
            const index=state.partidosCalendario.findIndex(item=>item._id === partido._id);
            state.partidosCalendario.splice(index,1);
            state.partidosTerminados.push(partido)
            commit('ordenarTerminados')
        },
        mostrarEliminados({commit, state}, payload){
            state.partidosTerminados = payload
            commit('ordenarTerminados')
        },
        
    }    
}