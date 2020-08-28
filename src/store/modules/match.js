export default{
    namespaced:true,
    state:{
        tiempo:null,
        fecha:null,
        partidos: []
    },
    mutations:{
        saveTime(state,payload){
            state.tiempo=payload
        },
        saveDate(state,payload){
            state.fecha=payload
        },
        agregarPartido(state,payload){
            state.partidos.push(payload)
        },
        verPartidos(state,payload){
            state.partidos=payload
        },
        deletePartido(state,payload){ //elimina un {name:'Chile'} al arreglo equipos  
            let eliminar = payload;
            const index=state.partidos.findIndex(item=>item._id === eliminar._id);
            state.partidos.splice(index,1);
        }
    },    
}