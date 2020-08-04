export default{
    namespaced:true,
    name:'loading',
    state:{
        estadoLoading:false
    },
    mutations:{
        loadingFunction(state,payload){ //{estado:true}
            state.estadoLoading=!state.estadoLoading
        },
    },
}