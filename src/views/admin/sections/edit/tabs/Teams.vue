<template>
    <div >
        <h4>Acá se editan todos los equipos que componen un torneo (un equipo puede estar en más de un torneo, obviamente)</h4>
        <v-row>
            <!-- Columna 1 con buscador -->
            <v-col cols="12" md="6">
                <v-row v-if="busqueda===false">
                    <v-btn  class="ml-4" dark color="indigo darken-4" @click="mostrar()">
                    <v-icon>mdi-chevron-down</v-icon>Mostrar Menú
                    </v-btn> 
                </v-row>
                <v-row v-if="busqueda===true">
                    <v-btn class="ml-4" dark color="grey darken-4" @click="mostrar()"> 
                        <v-icon>mdi-chevron-up</v-icon>Ocultar Menu
                    </v-btn>
                </v-row>
                <!-- Componente Formulario Equipos -->
                <formEquipos  v-if="busqueda===true"></formEquipos>
            </v-col>
            <!-- Columna 2 con Tabla -->
            <v-col sm="12" md="6">
                    <!-- Componente Tabla -->
                   <tablaEquipos></tablaEquipos>        
            </v-col>
        </v-row>
        <!-- Dialog para Agregar Nuevo Equipo -->   
  </div>
</template>

<script>
import formEquipos from '@/components/forms/selectForm/formEquipos';
import tablaEquipos from '@/components/tables/tablaEquipos'
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'Teams',
    components: {
        formEquipos,
        tablaEquipos
    },
    data(){
    
        return{  
            busqueda:true,
        }
    },
    methods: {
        mostrar(){
            this.busqueda=!this.busqueda   
        }
    }
}
</script>
