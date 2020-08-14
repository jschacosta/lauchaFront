export default{
    namespaced:true,
    name:'TextoSnack',
    state:{
        superTexto:{texto:"",estado:false},
    },
    mutations:{
        agregarSnack(state,payload){ //{texto: bla bla, estado:true}
            state.superTexto.texto=payload;
            state.superTexto.estado=true
        },
        apagarSnack(state){ // deja texto.estado en false
            state.superTexto.estado=false
        }
    }
}