<template>
    <v-row justify="center">
        <v-dialog v-model="verReglas.estado" persistent max-width="800px">
            <v-card>
                <v-card-title>
                    <span class="headline" >Seleccionar Reglas</span>
                    </v-card-title>
                <v-card-text>Escoge las reglas que utilizará el usuario para este partido.</v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="rules"
                    v-model="selected"
                    item-key="name"
                    class=" mx-2 elevation-2"
                    show-select
                    :single-expand="singleExpand"
                    :expanded.sync="expanded"
                    show-expand
                    >
                    <template v-slot:expanded-item="{headers,item}">
                        <v-list-item-group v-if="headers" >
                            <v-row class="d-flex flex-wrap">
                                <v-col class="hola">
                                    <v-list-item  v-for="(alternativa,i) of item.options.text " :key="i" >
                                            <v-list-item-title > {{i+1}}) {{alternativa}}   </v-list-item-title>
                                    </v-list-item>
                                </v-col>
                                <v-col >
                                    <v-list-item v-for="(apuesta,j) of item.options.values " :key="j+15" >
                                        <!-- el j+15 es para que no cause conflicto :key i con :key j -->
                                    <v-text-field label="Valor Apuesta" type="number" v-model.number="item.options.values[j]" require></v-text-field>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                        </v-list-item-group>
                    </template>
                </v-data-table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialogReglas(idVacio)">Cancelar</v-btn>
                    <v-btn color="green darken-1" text @click="reglasPartido()">Añadir Reglas</v-btn>
                </v-card-actions>   
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex' 
    export default {
        name:'allRules',
        data:()=>({
            idVacio: "",
            singleExpand: true,
            expanded: [],
            headers: [
                { text: 'Nombre Regla',  sortable: true, value: 'name'},
                { text: 'Tipo', value: 'type' },
                { text: 'Description', value: 'text' },
                { text: '', value: 'data-table-expand' },
            ],
            selected:[]
        }),
        computed:{
            ...mapState('rule',['rules']),
            ...mapState('match',['verReglas'])
        },
        methods:{
            ...mapMutations('match',['dialogReglas','actualizarReglas']),
            ...mapMutations( 'loading',['loadingFunction']),
            ...mapActions('rule',['getRules']),
            reglasPartido(){
                this.loadingFunction()
                let nuevoPartido=this.verReglas.partido
                nuevoPartido.rules=this.selected
                this.axios.put('/match-rule', nuevoPartido)
                .then(res=>{
                    let partido =res.data;
                    partido.boton=false
                    this.actualizarReglas(partido)
                    this.dialogReglas(this.idVacio)
                    this.loadingFunction()   
                })
                .catch(e=>{
                    this.loadingFunction()
                    console.log(e.response.data.mensaje);
                })
            },
        },
        created(){
            if(this.rules.length === 0 || this.rules === undefined){
                this.getRules()
            }
        }
    }
</script>

<style  scoped>
    .hola{
        width:400px

    }
</style>>
    
