export default{
    namespaced:true,
    state:{
        tiempo:null,
        fecha:null,
        partidos: [],
        verReglas: {
            estado: false,
            partido: {}
        },
        reglasEditadas: {
            estado: false,
            partido: {}
        },
        pedido:false
    },
    mutations:{
        saveTime(state,payload){
            state.tiempo=payload
        },
        saveDate(state,payload){
            state.fecha=payload
        },
        agregarPartido(state,payload){
            let partido=payload
            partido.boton=true
            state.partidos.push(partido)
        },
        verPartidos(state,payload){
            var matches = payload 
            for (let i of matches){
                if(i.rules.length === 0){
                    i.boton= true
                }else{
                    i.boton= false
                }
            }
            state.partidos=matches
        },
        deletePartido(state,payload){ 
            let eliminar = payload;
            const index=state.partidos.findIndex(item=>item._id === eliminar._id);
            state.partidos.splice(index,1);
        },
        dialogReglas(state,payload){
            state.verReglas.estado = !state.verReglas.estado
            state.verReglas.partido = payload
        },
        actualizarReglas(state,payload){
            let partido = payload
            const index=state.partidos.findIndex(item=>item._id === partido._id);
            state.partidos.splice(index,1);
            state.partidos.push(partido)
        },
        subirReglas(state,payload){
            state.reglasEditadas.estado = !state.reglasEditadas.estado
            state.reglasEditadas.partido = payload
        },
        limpiarPartidos(state){
            state.partidos=[]
        },
        pedir(state){
            state.pedido=true
        }
    }  
}