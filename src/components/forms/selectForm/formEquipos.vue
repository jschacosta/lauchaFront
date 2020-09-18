<template>  
    <v-form>
        <!-- Eleccion 1 -->
        <v-row>
            <v-col sm="10">
                <v-select :items="caso1" v-model="eleccion1" label="Tipo de Partido"></v-select>
            </v-col>
        </v-row>
        <!-- Caso 1 -->
        <div v-if="opciones===1">
            <v-row>
                <v-col sm="6">
                    <v-select :items="caso2" v-model="eleccion2" label="Confederación"></v-select>
                </v-col>
            </v-row>
            <v-row >
                <v-col sm="6">
                    <v-select :items="caso3" v-model="eleccion3" label="Torneo"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="6">
                    <v-btn color="primary" dark @click="buscarEquipos()">Buscar Equipos</v-btn>
                </v-col>
            </v-row>
        </div>
        <!-- Caso 2 -->
        <div v-if="opciones===2">
            <v-row >
                <v-col sm="6">
                    <v-select :items="caso2" v-model="eleccion2" label="Formato" @change="onChange($event)"></v-select>
                </v-col>
            </v-row>
            <div v-if="opciones2===1">
                <v-row>
                    <v-col sm="6">
                        <v-select :items="caso3" v-model="eleccion3" label="Confederación"></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="6">
                        <v-select :items="caso4" v-model="eleccion4" label="Torneo"></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="6">
                        <v-btn color="primary" dark @click="buscarEquipos()">Buscar Equipos</v-btn>
                    </v-col>
            </v-row>
            </div>
            <div v-if="opciones2===2">
                <v-row>
                    <v-col sm="6">
                        <v-select :items="caso3" v-model="eleccion3" label="Zona"></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="6">
                        <v-select :items="caso4" v-model="eleccion4" label="País"></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="6">
                        <v-select :items="caso5" v-model="eleccion5" label="Torneo"></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="6">
                        <v-btn color="primary" dark @click="buscarEquipos()">Buscar Equipos</v-btn>
                    </v-col>
                </v-row>
            </div>
            
        </div> 
    </v-form>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import elections from '@/store/data/elections.js'
export default {
    name: 'formEquipos',
    data: ()=>({
        eleccion1:"",
        eleccion2:"",
        eleccion3:"",
        eleccion4:"",
        eleccion5:""
    }),
    computed: {
        ... mapState('elections',['categories']),
        opciones(){
            if(this.eleccion1==="seleccion"){
                return 1
            }if(this.eleccion1==="club"){
                return 2
            }
        },
        opciones2(){
            if(this.eleccion2==="internacional"){
                return 1
            }if(this.eleccion2==="nacional"){
                return 2
            }
        },
        caso1(){
            return Object.keys(this.categories)
        },
        caso2(){
            if(this.eleccion1=== undefined){
                return ["Seleccione una opcion"]
            }else{
                return Object.keys(this.categories[this.eleccion1])
            }
        },
        caso3(){
            if(this.eleccion2=== "" || this.categories[this.eleccion1][this.eleccion2]=== undefined ){              
                return ["Seleccione una opcion"]       
            }else{        
                return Object.keys(this.categories[this.eleccion1][this.eleccion2])
            }
        },
        caso4(){
            if(this.eleccion3=== "" || this.categories[this.eleccion1][this.eleccion2][this.eleccion3]=== undefined ){
                return ["Seleccione una opcion"] 
            }else{            
                return Object.keys(this.categories[this.eleccion1][this.eleccion2][this.eleccion3])
            }
        },
        caso5(){
            if(this.eleccion4=== "" || this.categories[this.eleccion1][this.eleccion2][this.eleccion3][this.eleccion4]=== undefined){
                return ["Seleccione una opcion"] 
            }else{
                let auxiliar = this.categories[this.eleccion1][this.eleccion2][this.eleccion3]
                return Object.keys(auxiliar[this.eleccion4])
            }
        },
    },
    methods: {
        ...mapMutations( 'loading',['loadingFunction']),
        ...mapMutations('teams',['agregarFiltro','confirmar']),
        ...mapMutations('textoSnack',['agregarSnack']),
        onChange(event) { //se ocupa en el opciones 2 c
            this.eleccion4=""
            this.eleccion5=""
        },
        buscarEquipos(){
            this.loadingFunction()
            if(this.opciones===1){             
                this.axios.get(`/teams?1=${this.eleccion1}&2=${this.eleccion2}&3=${this.eleccion3}`)
                .then(res=>{
                    this.equipo =res.data;
                    this.agregarFiltro({equipos:this.equipo,torneo:this.eleccion3,elecciones:[this.eleccion1,this.eleccion2,this.eleccion3]});
                    this.confirmar(true)
                    this.loadingFunction()
                })
                .catch(e=>{ 
                    this.loadingFunction()
                    const snack= e.response.data.mensaje
                    this.agregarSnack(snack)
                    this.confirmar(false)
                })
            }
            if(this.opciones===2 && this.opciones2===1){
                this.axios.get(`/teams?1=${this.eleccion1}&2=${this.eleccion2}&3=${this.eleccion3}&4=${this.eleccion4}`)
                .then(res=>{
                    this.equipo =res.data;
                    this.agregarFiltro({equipos:this.equipo,torneo:this.eleccion4,elecciones:[this.eleccion1,this.eleccion2,this.eleccion3,this.eleccion4]})
                    this.confirmar(true)
                    this.loadingFunction()
                })
                .catch(e=>{ 
                    this.loadingFunction()
                    const snack= e.response.data.mensaje
                    this.agregarSnack(snack)
                    this.confirmar(false)
                })
            }
            if(this.opciones===2 && this.opciones2===2){
                this.axios.get(`/teams?1=${this.eleccion1}&2=${this.eleccion2}&3=${this.eleccion3}&4=${this.eleccion4}&5=${this.eleccion5}`)
                .then(res=>{
                    this.equipo =res.data;
                    this.agregarFiltro({equipos:this.equipo,torneo:this.eleccion5,elecciones:[this.eleccion1,this.eleccion2,this.eleccion3,this.eleccion4,this.eleccion5]})
                    this.confirmar(true)
                    this.loadingFunction()
                })
                .catch(e=>{ 
                    this.loadingFunction()
                    const snack= e.response.data.mensaje
                    this.agregarSnack(snack)
                    this.confirmar(false)
                })
            }
        }   
    }
}
</script>