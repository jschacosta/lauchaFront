<template>
  <div>
    <v-row class="mx-5 d d-flex align-end"> 
    <v-btn rounded small color="#2C3A47" @click="$router.push({path:`/admin/create/`})" dark>Volver</v-btn> 
    <v-spacer></v-spacer>
    <v-btn color="success" @click="activar()" dark>Guardar Cambios</v-btn>
    </v-row>
      <v-card class="mt-3 elevation-12" color="grey lighten-4 ">
        <v-row class="d-flex justify-center align-center " dense>
            <v-col class="d-flex justify-end" cols="2">
                {{partido.local}}
            </v-col>
            <v-col class="mt-6" cols="2">
                <v-text-field label="Goles" class="pa-0 centered-input"  type="number" v-model.number='goles[0]' min="0"></v-text-field>
            </v-col >
            <v-col class="d-flex justify-center" cols="1">
                <h3>-</h3>
            </v-col>
            <v-col class="mt-2" cols="2">
                <v-text-field label="Goles" class="pa-0 centered-input" type="number" v-model.number='goles[1]' min="0"></v-text-field>
            </v-col>
            <v-col class="d-flex justify-start" cols="2"> 
                {{partido.visita}}
            </v-col>
        </v-row>
        <div  v-for="(item,i) of partido.rules" :key="i" >
          <h4 class="mt-1 mb-2 mx-5">{{item.text}}</h4>
            <v-radio-group v-model="radioGroup[i]">
            <v-radio
              class="mx-8"
              v-for="n in partido.rules[i].options.text.length"
              :key="n"
              :label="partido.rules[i].options.text[n-1]"
              :value="n"
            ></v-radio>
          </v-radio-group>
        </div>
          
      </v-card>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  data:()=>({
  }),
  computed:{
      ...mapState('relato',['partidosTerminados']),
      partido(){
          const idPartido = this.$route.params.id
          const index=this.partidosTerminados.findIndex(item=>item._id === idPartido);
          return this.partidosTerminados[index]
      },
      goles(){
          return this.partido.score
      },
      radioGroup(){
          return this.partido.ruleChoices
      },

      fontSize() {
        switch (this.$vuetify.breakpoint.name) {
            case 'xs': return '3em';
            default: return '5em';
        }
    },
  },
  methods:{
    ...mapActions( 'relato',['editarTerminados']),
    ...mapMutations('loading',['loadingFunction']),
    ...mapMutations('textoSnack',['agregarSnack']),

    activar(){
      this.loadingFunction()
      const partido = this.partido
      const a = this.partido.rules.length
      const b = this.radioGroup.length
      const respuestas =this.radioGroup
      for (let i=0 ; i< (a-b); i++){
        respuestas.push(null)

      }
      partido.score = this.goles
      partido.ruleResult = respuestas
      var j = 0
      const apuestas = []
      for(let coso of partido.ruleResult){
        console.log(coso)
        if(coso ===null){
          apuestas.push(null)
        }
        if(coso != null){
          apuestas.push(partido.rules[j].options.values[coso-1])
        }
        j++
      }
      partido.ruleApuesta=apuestas
      this.axios.put('/match-rule', partido)
      .then(res=>{
        let partidoNuevo=res.data;
        this.editarTerminados(partidoNuevo)
        const snack = 'Partido Actualizado'
        this.loadingFunction()
        this.agregarSnack(snack)
      })
      .catch(e=>{
          this.loadingFunction()
          this.agregarSnack(e.error.data.mensaje)
      })
    }
  }
}
</script>

<style scoped>
    .centered-input >>> input {
      text-align: center
    }
</style>