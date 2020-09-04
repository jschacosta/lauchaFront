<template>
    <div>
        <v-data-table
            :headers="headers"
            dense
            :items="rules"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            show-expand
            item-key="name"
            :search="search"
            class="elevation-4"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-row>
                        <v-col>
                            <v-toolbar-title class="mr-2 hidden-sm-and-down">Reglas </v-toolbar-title>

                        </v-col>
                        <v-col>
                            <v-btn class="mr-3" small dark ml-auto color="green accent-5" @click="nuevaRegla()">Crear Regla</v-btn>

                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field 
                                v-model="search"
                                append-icon="mdi-magnify"
                                label=" Buscar Regla"
                                single-line
                                hide-details
                                class="elevation-1 hidden-sm-and-down">
                            </v-text-field>

                        </v-col>
                        <v-col>
                            <v-switch v-model="singleExpand" label="Unico"></v-switch>
                            
                        </v-col>
                    </v-row>
                            
                </v-toolbar>
            </template>
            <template v-slot:[`item.accion`]="{ item }" >
                <v-btn class="mr-2"  tile large color="primary" icon  @click="editarRegla(item)">
                    <v-icon dark>mdi-pencil</v-icon>
                </v-btn>      
                <v-btn class="mr-2"  tile large color="error" icon @click="borrarRegla(item)">
                    <v-icon dark>mdi-delete</v-icon>
                </v-btn>
            </template>
            <template v-slot:expanded-item="{headers,item}">
                <v-list-item-group v-if="headers">
                    <v-row class="d-flex flex-nowrap">
                        <v-col>
                            <v-list-item v-for="(alternativa,i) of item.options.text " :key="i" >
                                    <v-list-item-title > {{i+1}}) {{alternativa}}   </v-list-item-title>
                            </v-list-item>
                        </v-col>
                        <v-col>
                            <v-list-item v-for="(apuesta,j) of item.options.values " :key="j+15" >
                                <!-- el j+15 es para que no cause conflicto :key i con :key j -->
                                    <v-list-item-title >({{apuesta}} pts)     </v-list-item-title>
                            </v-list-item>
                        </v-col>
                    </v-row>
                </v-list-item-group>
            </template>
    </v-data-table>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
  export default {
      name:'TablaReglas',
    data:()=>({   
        search:"",
        expanded: [],
        singleExpand: true,
        headers: [
            { text: 'Nombre Regla', align: 'start', sortable: true, value: 'name'},
            { text: 'Tipo', value: 'type' },
            { text: 'Description', value: 'text' },
            { text: 'actions',  value: 'accion', sortable: false },
            { text: '', value: 'data-table-expand' },
        ]
    }),
    computed:{
        ...mapState(["token"]),
        ...mapState('rule',['rules']),
    },
    methods:{
        ...mapMutations('rule',['ruleDialog','deleteDialog']),
        ...mapActions('rule',['getRules']),
        nuevaRegla(){
            let item={}
            this.ruleDialog(item)
        },
        editarRegla(item){
            this.ruleDialog(item)
        },
        borrarRegla(item){
            this.deleteDialog(item)
        }
    },
    created(){
        if(this.rules.length === 0 || this.rules === undefined){
            this.getRules()
        }
    }
  }
</script>

