<template>
    <div>
        <v-data-table
            :headers="headers"
            dense
            :items="rules"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="name"
            show-expand
            :search="search"
            class="elevation-4"
        >
            <template v-slot:top>
                <v-toolbar flat >
                    <v-toolbar-title>Reglas del Juego</v-toolbar-title>
                    <v-btn class="mx-3" dark ml-auto color="green accent-5" @click="nuevaRegla()">Crear Regla</v-btn>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label=" Buscar Regla    "
                        single-line
                        hide-details
                        class="elevation-1 mx-3">
                    </v-text-field>
                    <v-switch v-model="singleExpand" label="Single expand" class="mt-5"></v-switch>
                </v-toolbar>
            </template>
            <template v-slot:item.accion="{ item }" >
                <v-btn class="mr-2"  tile large color="primary" icon  @click="editarRegla(item)">
                    <v-icon dark>mdi-pencil</v-icon>
                </v-btn>      
                <v-btn class="mr-2"  tile large color="error" icon @click="borrarRegla(item)">
                    <v-icon dark>mdi-delete</v-icon>
                </v-btn>
            </template>
            <template v-slot:expanded-item="{headers,item}">
                <v-list-item-group v-if="headers">
                    <v-row>
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
        this.getRules()
    }
  }
</script>

