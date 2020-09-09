import axios from 'axios'
export default{
    namespaced:true,
    name:'rule',
    state:{
        rules:[],
        newItem:{
            nuevoNombre:"",
            seleccion:"",
            text:"",
            chips: [],   
            selectNum:"",
            chipsnumb:[],
            max:null,
            min:null,
            id:"",
            estado:false,
            // valores de apuestas
            valores:[],
            ultimoValor:null
        },
        deleteItem:{nombre:"",id:"",estado:false}
    },
    mutations:{
        ruleDialog(state,payload){
            state.newItem.estado=!state.newItem.estado;
            if (Object.keys(payload).length === 0 ){
                state.newItem.nuevoNombre="",
                state.newItem.seleccion="",
                state.newItem.text="",
                state.newItem.chips=[],   
                state.newItem.selectNum="",
                state.newItem.chipsnumb=[],
                state.newItem.max=null,
                state.newItem.min=null,
                state.newItem.id="",
                state.newItem.valores = []
            }
            else{
                state.newItem.date=payload.date;
                if(payload.type==="EVENTO"){
                    state.newItem.nuevoNombre=payload.name;
                    state.newItem.seleccion=payload.type;
                    state.newItem.text=payload.text;
                    state.newItem.chips=payload.options.text;
                    state.newItem.valores=payload.options.values;
                    state.newItem.id=payload._id;
                }
                if(payload.type==="BOLEANO"){
                    state.newItem.nuevoNombre=payload.name;
                    state.newItem.seleccion=payload.type;
                    state.newItem.text=payload.text;
                    state.newItem.valores=payload.options.values;
                    state.newItem.id=payload._id;
                }
                if(payload.type==="NUMERICO"){
                    if(payload.numeric==="VALORES FIJOS"){
                        state.newItem.nuevoNombre=payload.name;
                        state.newItem.selectNum="VALORES FIJOS",
                        state.newItem.seleccion=payload.type;
                        state.newItem.text=payload.text;
                        state.newItem.valores=payload.options.values;
                        state.newItem.chipsnumb=payload.options.text,
                        state.newItem.id=payload._id;
                    }
                    if(payload.numeric==="RANGOS"){
                        console.log(payload)
                        state.newItem.nuevoNombre=payload.name;
                        state.newItem.selectNum="RANGOS",
                        state.newItem.seleccion=payload.type;   
                        state.newItem.text=payload.text; 
                        state.newItem.valores=payload.options.values
                        state.newItem.ultimoValor=payload.options.values[payload.options.values.length-1]
                        state.newItem.min=parseInt(payload.options.text[0].charAt(0)),
                        state.newItem.max=parseInt(payload.options.text[payload.options.text.length-1].charAt(0));
                        for (let i=1; i<payload.options.text.length-1; i++){
                            state.newItem.chipsnumb.push(payload.options.text[i])
                        }
                       state.newItem.id=payload._id;
                    }
                } 
            }
        },
        deleteDialog(state,payload){ 
            state.deleteItem.estado=!state.deleteItem.estado;
            state.deleteItem.nombre=payload.name;
            state.deleteItem.id=payload._id;
        },
        createRule(state,payload){
            state.rules.push(payload)
            state.rules.sort(function(a,b){
                return new Date(b.date) - new Date(a.date)
            })
        },
        updateRule(state,payload){
            let index = state.rules.findIndex( item => item._id === payload._id);
            state.rules.splice(index,1);
            state.rules.push(payload)
            state.rules.sort(function(a,b){
                return new Date(b.date) - new Date(a.date)
            })

        },
        deleteRule(state,payload){
            const index=state.rules.findIndex(item=>item._id === payload._id);
            state.rules.splice(index,1);
        },
        showRules(state,payload){
            state.rules=payload;
        },
    },
    actions:{
        getRules({commit,rootState}){
            commit('loading/loadingFunction', null, { root: true })
            let token= rootState.token
            let config = {
                    headers: {
                    token
                    }
                }
            axios.get('/rules', config)    
            .then(res=>{
                let rules=res.data
                rules.sort(function(a,b){
                    return new Date(b.date) - new Date(a.date)
                })
                commit('showRules',rules)
                commit('loading/loadingFunction', null, { root: true })
            })
            .catch(e=>{                    
                commit('loading/loadingFunction', null, { root: true })
            })
        },
    }
}