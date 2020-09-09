export default{
    namespaced:true,
    name:'confirmar',
    state:{
        info:{
            titulo:"",
            cuerpo:'',
            estado:false,
            boton: "",
            datos:[]
        }
    },
    mutations:{
        confirmar(state,payload){ 
            state.info.titulo = payload.titulo
            state.info.cuerpo = payload.cuerpo
            state.info.estado = true,
            state.info.boton = payload.boton
            state.info.datos = payload.datos
        }
    }
}