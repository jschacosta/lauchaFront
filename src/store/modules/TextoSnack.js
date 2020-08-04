export default{
    namespaced:true,
    name:'TextoSnack',
    state:{
        superTexto:{texto:"",estado:false},
    },
    mutations:{
        agregarSnack(state,payload){ //{texto: bla bla, estado:true}
            state.superTexto=payload
        },
        apagarSnack(state){ // deja texto.estado en false
            state.superTexto.estado=false
        }
    },
    actions:{        
    },
    getters:{
    } 
}