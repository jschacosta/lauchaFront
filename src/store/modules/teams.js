import axios from 'axios';
export default{
    namespaced:true,
    state:{
        torneos:'',
        equipos:[],
        allPartidos:"",
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
        listarPartidos(state){ // se ocupa para formularios
            axios.get('/all-partidos')
            .then(res=>{
                state.allPartidos= res.data;
                state.allPartidos.sort(function(a,b){return new Date(b.fechaIngreso) - new Date(a.fechaIngreso)});
            })
            .catch(e=>{
                console.log(e.response);
            })  
        },
        confirmar(state,payload){
            state.confirmacion=payload //manda true o false si se logra la respuesta de busqueda de equipos
        },
        updateEquipos(state,payload){ //agrega un {name:'Chile'} al arreglo equipos
            state.equipos.unshift({name:payload}) //unshift es un push pero deja en primera posicion
        },
        deleteEquipos(state,payload){ //elimina un {name:'Chile'} al arreglo equipos
            console.log(payload)   
            let eliminar = payload;
            state.equipos=state.equipos.filter(function(dato){
                if(dato.name == eliminar){
                    return false;
                }else{
                    return true;
                }
            });
        }
    } 
}