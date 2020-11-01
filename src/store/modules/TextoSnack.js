export default{
    namespaced:true,
    name:'textoSnack',
    state:{
        superTexto:{texto:"",estado:false},
        superTextoSteper:{texto:"",estado:false},
    },
    mutations:{
        agregarSnack(state,payload){ //{texto: bla bla, estado:true}
            state.superTexto.texto=payload;
            state.superTexto.estado=true
        },
        apagarSnack(state){ // deja texto.estado en false
            state.superTexto.estado=false
        },
        agregarSnackSteper(state,payload){ //{texto: bla bla, estado:true}
            state.superTextoSteper.texto=payload;
            state.superTextoSteper.estado=true
        },
        apagarSnackSteper(state){ // deja texto.estado en false
            state.superTextoSteper.estado=false
        }
    }
}