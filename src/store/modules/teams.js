export default{
    namespaced:true,
    state:{
        torneos:'',
        equipos:[],
        jugadores:[],
        confirmacion:false
    },
    mutations:{
        agregarFiltro(state,payload){
            state.equipos=[]
            state.torneos=payload; //{equipos:[chile,argentina,...],torneo:"eurocopa",elecciones:['seleccion','confederacion',..]}
            state.torneos.equipos.sort();
            for (let item of state.torneos.equipos){
                state.equipos.push({name:item})// arreglo equipos es: [{name:Chile},{name:Argentina},...]
            }
        },
        confirmar(state,payload){
            state.confirmacion=payload //manda true o false si se logra la respuesta de busqueda de equipos
        },
        updateEquipos(state,payload){ //agrega un {name:'Chile'} al arreglo equipos
            state.equipos.unshift({name:payload}) //unshift es un push pero deja en primera posicion
        },
        deleteEquipos(state,payload){ //elimina un {name:'Chile'} al arreglo equipos  
            let eliminar = payload;
            state.equipos=state.equipos.filter(function(dato){
                return dato.name == eliminar ? false : true
            });
        }
    }  
}