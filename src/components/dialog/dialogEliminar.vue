<template>
    <v-row justify="center">
        <v-dialog v-model="deleteItem.estado" persistent max-width="300">
        <v-card>
            <v-card-title class="h5 text-center">¿Estás seguro que quieres borrar la regla: <br> "{{deleteItem.nombre}}"?</v-card-title>
            <v-card-text>Se borrará toda la info de la regla y no podrá ser recuperada.</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="deleteDialog(deleteItem)">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="borrarRegla()">Borrar Regla</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        name:'dialogEliminar',
        data:()=>({
        }),
        computed:{
            ...mapState('rule',['deleteItem']),
            ...mapState(['token'])
        },
        methods:{
            ...mapMutations('rule',['deleteDialog','deleteRule']),
            ...mapMutations('TextoSnack',['agregarSnack']),
            ...mapMutations('loading',['loadingFunction']),
            borrarRegla(){
                this.loadingFunction();
                let config = {
                    headers: {
                    token: this.token
                    }
                };
                let id=this.deleteItem.id;
                this.axios.delete(`/rules/${id}`,config)
                    .then(res=>{
                        let respuesta=res.data;
                        this.deleteRule(respuesta);
                        this.agregarSnack(`Regla ${respuesta.name} borrada`);
                        this.loadingFunction();
                    })
                    .catch(e=>{
                        console.log(e.response);
                        this.loadingFunction();
                    })
                this.deleteDialog(this.deleteItem)
            }
        }
    }
</script>