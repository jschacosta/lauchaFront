<template>
  <div>
    <v-row > 
      <v-col>
        <formEquipos></formEquipos>
      </v-col>
      <v-col v-if="confirmacion===true">
        <pickerTime></pickerTime>
        <pickerDate></pickerDate>                   
        <v-select :items="torneos.equipos" v-model="equipo1" label="Equipo Local"></v-select>
        <v-select :items="torneos.equipos" v-model="equipo2" label="Equipo Visita"></v-select>
        <v-row class="d-flex justify-center mt-4">
          <v-btn dark color="orange accent-4" @click="nuevoPartido()">Crear Partido</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <tablaPartidos></tablaPartidos>      
  </div>
</template>

<script>
import formEquipos from '@/components/forms/selectForm/formEquipos';
import pickerTime from '@/components/forms/selectForm/pickerTime';
import pickerDate from '@/components/forms/selectForm/pickerDate';
import tablaPartidos from '@/components/tables/tablaPartidos';
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'Create',
  components: {
      formEquipos,
      pickerTime,
      pickerDate,
      tablaPartidos,
  },
  data:()=>({
      equipo1:"",
      equipo2:""
  }),
  computed:{
    ...mapState('teams',['torneos','confirmacion']),
    ...mapState('match',['tiempo','fecha'])
  },
  methods:{
    ...mapMutations('match',['agregarPartido']),
    nuevoPartido(){
      let nuevoPartido={
        local : this.equipo1,
        visita : this.equipo2,
        torneo : this.torneos.torneo,
        horaPartido : this.tiempo,
        fechaPartido : this.fecha
      }
      this.axios.post(`/match`,nuevoPartido)
      .then(res=>{
        let partido =res.data;
        this.agregarPartido(partido)
      })
      .catch(e=>{ 
        console.log(e.response.data.mensaje);
      })
    }
  }
}
</script>

