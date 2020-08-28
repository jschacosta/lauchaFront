 <template>
        <div>
            <!-- Card con tabla de datos -->
            <v-card class="elevation-15">
                <!-- <v-system-bar color="grey darken-4"></v-system-bar> --> 
                <v-card-title >
                    Torneo: {{torneos.torneo}}
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label=" Buscar por nombre"
                        single-line
                        hide-details
                        class="elevation-3">
                    </v-text-field>
                </v-card-title>
                <v-row>
                    <v-col  class="ml-15" md="4">Total Equipos: {{equipos.length}}</v-col>
                    <v-col  md="4" class="ml-auto"> 
                        <v-btn dark ml-auto color="green accent-5" v-if="confirmacion===true" @click="dialog=true">Agregar</v-btn>
                    </v-col>
                </v-row>
                <v-data-table
                    :headers="headers"
                    :items="equipos"
                    :search="search"
                    class="elevation-2"
                    >
                    <template v-slot:item.accion="{ item }">          
                        <v-btn class="mr-2" fab dark small color="error" @click="borrarEquipo(item)">
                            <v-icon dark>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
            <!-- Dialog para Crear nuevo Equipo -->
            <template>
                <v-row justify="center">
                    <v-dialog v-model="dialog" persistent scrollable max-width="300px">
                    <v-card>
                        <v-card-title>Agregar a {{torneos.torneo}}</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text style="height: 200px;">
                        <v-text-field
                            v-model="nuevo"
                            label="Nombre de Equipo"
                            @keyup.enter="agregarEquipo()"
                        ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                        <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text @click="agregarEquipo()">Agregar</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-row>
            </template>
        </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    components:{
      
    },
    data(){
        return{
            todosEquipos:"",
            search:"",
            dialog:false,
            nuevo:"",
            headers: [
                {text: 'EQUIPO', align: 'start', sortable: true, value: 'name'},
                { text: 'ACCIONES',  value: 'accion', sortable: false },
            ],
        }
    },
    computed:{  
        ...mapState('teams',['equipos','torneos','confirmacion']), //confirmacion es para el boton verde de agregar salga sólo si 
        ...mapState('TextoSnack',['superTexto']),
        
        llenadoTabla(){ //para que vacie la tabla si se anota mal en formEquipos
            if(this.confirmacion===true){
                this.todosEquipos=this.equipos
            }else{
                this.todosEquipos=""
            }
        }
    },
    methods: {
        ...mapMutations('teams',['agregarFiltro','updateEquipos','deleteEquipos']),
        ...mapMutations( 'TextoSnack',['agregarSnack']),
        ...mapMutations( 'loading',['loadingFunction']),
        mostrar(){
            this.busqueda=!this.busqueda   
        },
        agregarEquipo(){
            this.loadingFunction()
            if(this.torneos.torneo!=undefined){
                let variables= this.torneos.elecciones;
                let equipos= this.torneos.equipos;
                if(equipos.indexOf(this.nuevo)!=-1 && this.nuevo!=""){
                    let aviso="El equipo ya está registrado"
                    this.agregarSnack(aviso)
                }
                if(this.nuevo===""){
                    let aviso="No haz escrito equipo"
                    this.agregarSnack(aviso)
                }
                if(equipos.indexOf(this.nuevo)===-1 && this.nuevo!=""){
                    equipos.push(this.nuevo)
                    this.axios.put(`/teams`, {variables,equipos})
                        .then(res=>{
                            this.updateEquipos(this.nuevo)
                            this.nuevo=""
                        this.loadingFunction()
                        })
                        .catch(e=>{
                        this.loadingFunction()
                            
                            console.log(e.response);
                        })
                    let aviso=`${this.nuevo} ha sido agregado a ${this.torneos.torneo}`
                    this.agregarSnack(aviso)
                    this.dialog=false
                }
            }
        },
        borrarEquipo(item){
            this.loadingFunction()
            let variables= this.torneos.elecciones;
            let equipos= this.torneos.equipos;
            let index = this.torneos.equipos.indexOf(item.name)
            equipos.splice(index, 1);
            this.axios.put(`/teams`, {variables,equipos})
                .then(res=>{
                    this.deleteEquipos(item.name)
            this.loadingFunction()
                })
                .catch(e=>{ 
            this.loadingFunction()
                    
                    console.log(e.response);
                })
            let aviso=`Equipo ${item.name} Eliminado de ${this.torneos.torneo}`
            this.agregarSnack(aviso)
        },
    }
}
</script>