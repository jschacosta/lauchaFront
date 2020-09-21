<template>
    <v-row justify="center">
        <v-dialog v-model="apuestaPartido.estado" persistent max-width="800px">
            <v-card class="pa-5">
                <v-card-title>
                    <span class="headline" >Valores de Apuesta: {{apuestaPartido.partido.local}} v/s {{apuestaPartido.partido.visita}}</span>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-text-field type="number" v-model.number="apuestas[0]" min="0" label="Apuesta L" outlined></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field type="number" v-model.number="apuestas[1]" min="0" label="Apuesta E" outlined></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field type="number" v-model.number="apuestas[2]" min="0" label="Apuesta V" outlined></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions >
                    <v-spacer></v-spacer>
                     <v-btn  @click="subirApuestas(idVacio)" color="success">Cambiar</v-btn>
                </v-card-actions>   
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    export default {
        name:'editApuesta',
        data:()=>({
            estado:true,
            idVacio: {
                    apuesta:[null,null,null],
                    local:"",
                    visita:"",
            },
        }),
        computed:{ 
            ...mapState('match',['apuestaPartido']),
            apuestas(){
                return this.apuestaPartido.partido.apuesta
            }
        },
        methods:{
            ...mapMutations('match',['subirApuestas'])
        }
    }
</script>

