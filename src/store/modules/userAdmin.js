export default{
    namespaced:true,
    name:'userAdmin',
    state:{
        usuarios:[],
        usuarioEdit:{
            usuario:[],
            estado:false
        },
        dialogNew:false,
        pedido:false
    },
    mutations:{
        subirUsuarios(state,payload){ 
            state.usuarios=payload
        },
        agregarUsuario(state,payload){ 
            state.usuarios.push(payload)
            state.usuarios.sort(function(a,b){
                return new Date(b.date) - new Date(a.date)
            })
        },
        editarRol(state,payload){
            state.usuarioEdit.usuario=payload
            state.usuarioEdit.estado=true
        },
        nuevoUsuario(state){
            state.dialogNew=!state.dialogNew
        },
        pedir(state){
            state.pedido=true
        },
        nuevoRol(state,payload){
            const newUser = payload
            let index = state.usuarios.findIndex( item => item._id === newUser._id);
            state.usuarios[index].role = payload.role;
        },
        eliminarUsuario(state,payload){
            const index=state.usuarios.findIndex(item=>item._id === payload._id);
            state.usuarios.splice(index,1);
        }
    }, 
    actions:{
        obtenerUsers({commit},payload){
            const users = payload
            var i=0
            for (let item of users ){
                let fecha=new Date(item.date)
                users[i].fecha=`${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()}`
                i++
            }
            users.sort(function(a,b){
                return new Date(b.date) - new Date(a.date)
            })
            commit('subirUsuarios',users)
        },
        
    }
}