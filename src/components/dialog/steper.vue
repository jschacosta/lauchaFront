<template >
  <v-dialog v-model='dialogo' persistent max-width="800px" >

      <v-stepper v-model="paso" dark dense>
      <!-- ENCABEZADO - PASO 1 -->
      <v-stepper-header v-if="(imagen==='xl' || imagen ==='lg') && losPartidos.length<7 &&paso!=1">
        <v-stepper-step editable :complete="paso > 1" :step="1" >Inicio</v-stepper-step>
      <!-- ENCABEZADO - PASOS INTERMEDIOS-->
        <div v-for="(item,i) of losPartidos" :key="i">
          <v-stepper-step editable :complete="paso > i+2" :step="i+2" >P{{i+1}}</v-stepper-step>
          <v-divider  v-if="i !== losPartidos.length"></v-divider>
        </div>
      </v-stepper-header>

      <v-stepper-items >
      <!-- CUERPO - PASO 1 -->
        <v-stepper-content :step="1" >
          <v-card class="mb-12 pa-8" color="#2C3A47">
            <h2 class="ml-5  mb-2 font-weight-light"> Bienvenido al torneo {{espacio + espacio}} {{torneos[0].name}}</h2>
            <h4 class="ml-5 font-weight-regular">Este será tu carta de vaticinios para los próximos encuentros deportivos. Muestra tu jerarquía y sapiencia frente a tus débiles adversarios </h4>
            <h4 class="mt-5 ml-5 mb-10 font-weight-regular ">Escribe el nombre con el que serás Conocido en este torneo.</h4>
            <v-text-field
            label="Escribe tu nombre de Jugador"
            color="white"
            v-model="nickName.name"
            :rules="nameRules"
            @keyup.enter="estado===false?revNombre():nextStep(1)"
          >
          </v-text-field>
          </v-card>
          <v-row>
            <v-btn  class="mx-3" text @click ="cerrarDialog(); estado=false; paso=1">Salir</v-btn>
            <v-btn v-if="!estado" class="mx-3" color="primary" @click="revNombre()"> Siguiente</v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="estado" class="mx-3" color="success" @click="nextStep(1); estado=false"> Iniciar</v-btn>
          </v-row>
        </v-stepper-content>
      <!-- CUERPO - PASOS INTERMEDIOS -->
        <div v-for="(partido,j) of losPartidos" :key="j"  >
        <v-stepper-content :step="j+2"  class="ma-0 pa-0 pa-3">

          <v-stepper-header v-if="imagen==='xs' || imagen ==='sm' || imagen==='md' || losPartidos.length>=7">
        <v-row class="ma-0 pa-0">
                        <v-btn class="mx-2" color="primary" v-if="j+2===losPartidos.length+1" @click="nextStep(j+2)"> <v-icon left>keyboard_arrow_left</v-icon > Inicio</v-btn>

            <v-btn class="mx-3" fab small color="primary" @click="nextStep(j); scrollToTop()" @keyright="nextStep(j); scrollToTop()" v-if="j+2!=losPartidos.length+1"> 
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn class="mx-3" fab small color="primary" @click="nextStep(j+2); scrollToTop()"  v-if="j+2!=losPartidos.length+1"> 
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click ="cerrarDialog(); estado=false; paso=1">Salir</v-btn>
            <v-btn  class="mx-2" color="success" v-if="j+2===losPartidos.length+1" @click="enviar(); cerrarDialog()">
             Enviar <v-icon right>fas fa-share</v-icon></v-btn>
          </v-row>
      </v-stepper-header>
          
          <v-card class=" mb-12" color="#2C3A47">
            <v-row class="d-flex justify-center align-center " dense>
              <v-col class="d-flex justify-center align-center text-center text-caption" cols="3" v-if="imagen==='xs'">
                  {{partido.local}}
              </v-col>
              <v-col class="d-flex justify-center align-center text-center" cols="3" v-if="imagen!='xs'">
                  {{partido.local}}
              </v-col>
              <v-col class="mt-6 d-flex justify-start align-center" cols="2" >
                <v-text-field label="Goles" class="centered-input pa-0" type="number" v-model.number='partido.score[0]'  min="0"  :rules="numberRules"></v-text-field>
              </v-col >
              <v-col class="d-flex justify-center align-center" cols="2">
                <h3>-</h3>
              </v-col>
              <v-col class="mt-6 d-flex justify-start align-center" cols="2"> 
                <v-text-field label="Goles" class="centered-input pa-0" type="number" v-model.number='partido.score[1]' min="0" :rules="numberRules"></v-text-field>
              </v-col>
              <v-col class="d-flex justify-center align-center text-center" cols="3" v-if="imagen!='xs'"> 
                  {{partido.visita}}
              </v-col>
              <v-col class="d-flex justify-center align-center text-center text-caption" cols="3" v-if="imagen==='xs'">
                  {{partido.visita}}
              </v-col>
            </v-row>

            <v-row class="d-flex justify-center align-center" dense>
              <h2 class="font-weight-light mb-2" >Juega</h2>
            </v-row>

            <v-row class=" ma-0 pa-0 mb-5 " dense>
                <v-col class="  d-flex flex-column justify-center align-center ">
                  <p class="ma-0 pa-0 ">Local</p>
                    <v-chip class="ma-1 font-weight-bold"  color="lime accent-4" text-color="black"> {{partido.apuesta[0]}} </v-chip>
                </v-col>
                <v-col class=" pa-0 ma-0 d-flex flex-column justify-center align-center ">
                  <p class="ma-0 pa-0">Empate</p>
                    <v-chip class="ma-1 font-weight-bold"  color="lime accent-4" text-color="black"> {{partido.apuesta[1]}} </v-chip>
                </v-col>
                <v-col class=" pa-0 ma-0 d-flex flex-column justify-center align-center ">
                  <p class="ma-0 pa-0">Visita</p>
                    <v-chip class="ma-1 font-weight-bold"  color="lime accent-4" text-color="black"> {{partido.apuesta[2]}} </v-chip>
                </v-col>
            </v-row>


                <v-btn class="ml-2" color="primary" x-small  @click="uncheck(j)">Limpiar Valores</v-btn>
            <div  v-for="(item2,k) of partido.rules" :key="k" >
              <v-row >
              <h4 class="mt-1 mb-2 mx-5 font-weight-regular">{{item2.text}}</h4>
              </v-row>

                <v-radio-group v-model="partido.ruleElections[k]">
                  <v-row dense v-for="(texto,m) of partido.rules[k].options.text" :key="m">
                    <v-col>
                      <v-radio
                        class="mx-8"
                        :label="texto"
                        :value="m"
                      >
                      </v-radio>
                    </v-col>
                    <v-col>
                      {{partido.rules[k].options.values[m]}} pts
                    </v-col>
                  </v-row>
              </v-radio-group>
            </div>
          </v-card>
          
          <v-row>
            <v-btn class="mx-3" color="primary" v-if="j+2===losPartidos.length+1" @click="nextStep(j+2)"> <v-icon left>keyboard_arrow_left</v-icon > Inicio</v-btn>
            <v-btn class="mx-3" fab small color="primary" @click="nextStep(j); scrollToTop()"  v-if="j+2!=losPartidos.length+1"> 
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn class="mx-3" fab small color="primary" @click="nextStep(j+2); scrollToTop()"  v-if="j+2!=losPartidos.length+1"> 
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click ="cerrarDialog(); estado=false; paso=1">Salir</v-btn>
            <v-btn  class="mx-3" color="success" v-if="j+2===losPartidos.length+1" @click="enviar(); cerrarDialog()">
             Enviar <v-icon right>fas fa-share</v-icon></v-btn>
          </v-row>
        </v-stepper-content>
        </div>
      </v-stepper-items>

    </v-stepper>
  </v-dialog>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: 'steper',
  data:()=>( {
      paso: 1,
      espacio: '\u00A0',  // '\u00A0' es un espacio en html
      estado: false,
      numberRules: [
      (v) =>
        (v >= 0) || "Debe ser positivo",
      (v) =>
        (v < 10) || "¿No será mucho?", 
    ],
     nameRules: [
      (v) =>
        (v.length < 16) || "Apodo muy largo",
      (v) =>
        (v.length > 0) || "No haz escrito Apodo",
    ],
  }),
  computed:{
    ...mapState('torneo',['torneos','porJugar','dialogo']),
    ...mapState(['_id','nombre','apellido','losTorneos','usuarioDB']),

    losPartidos(){
      if(this.torneos[0].players.length===0){ //no hay jugadores
        for(let item of this.porJugar){
          item.ruleElections=[]
        }
        return this.porJugar
      }
      if(this.torneos[0].players.length!=0){  // hay jugadores
        const index=this.torneos[0].players.findIndex(item=>item._id === this._id);
        if(index=== -1){
          for(let item of this.porJugar){
          item.ruleElections=[]
          }
          return this.porJugar
        }
        if(index != -1){
          const arrayJugador=[]
            const matchUsuario = this.torneos[0].players[index].matches
            for(let item of matchUsuario){
                for(let item2 of this.porJugar){
                    if( item._id===item2._id){
                        item2.score=item.score
                        item2.ruleElections=item.ruleElections
                        arrayJugador.push(item2)
                    }
                } 
            }
            return arrayJugador
        }
      }
    },
    nickName(){
      var index=this.torneos[0].players.findIndex(item=>item._id === this._id);
      if(index!=-1 && index!=undefined){
        var jugador = this.torneos[0].players[index]
        if(!jugador.nickName){
          var nombre= this.nombre.charAt(0).toUpperCase() + '.' + this.apellido.charAt(0).toUpperCase() +this.apellido.slice(1)
        }
        if (!!jugador.nickName){
          var nombre= jugador.nickName
        }
      }
      if(index===-1 || index===undefined){
        var nombre= this.nombre.charAt(0).toUpperCase() + '.' + this.apellido.charAt(0).toUpperCase() +this.apellido.slice(1)
      }
      return {name:nombre}
    },
    imagen(){
      switch (this.$vuetify.breakpoint.name){
          case 'xs': return 'xs'
          case 'sm': return 'sm'
          case 'md': return 'md'
          case 'lg': return 'lg'
          case 'xl': return 'xl'
      }
    }
  },
  methods:{
    ...mapActions( ['guardarUsuario']),
    ...mapMutations( 'loading',['loadingFunction']),
    ...mapMutations( 'torneo',['cambiarDialog','obtenerTorneos']),
    ...mapMutations( 'textoSnack',['agregarSnack']),
    ...mapActions( 'torneo',['agregarPorJugar','puntajes']),
    nextStep(n){
      if (n === this.losPartidos.length+1){
        this.paso = 1
      } 
      else{
        this.paso = n + 1
      }
    },
    scrollToTop(){
      document.getElementsByClassName('v-dialog--active')[0].scrollTop = 0
    },
    cerrarDialog(){
      this.cambiarDialog(false)
    },
    uncheck(j){
      this.losPartidos[j].ruleElections=[]
    },
    enviar(){
        this.loadingFunction()
        const player ={
              _id:this._id, 
              nickName:this.nickName.name,
              position:null,  
              matches:[]
          }
        var j = 0
        for (let partido of this.losPartidos){
          if(partido.score[0]<0){
            partido.score[0]=0
          }
          if(partido.score[1]<0){
            partido.score[1]=0
          }
          player.matches.push({ _id:partido._id , score:partido.score , ruleElections:[]})
          const a = partido.rules.length
          const b = partido.ruleElections.length
          player.matches[j].ruleElections =partido.ruleElections
          for (let i=0 ; i< (a-b); i++){
            player.matches[j].ruleElections.push(null)
          }
          j++
        }
        const index=this.torneos[0].players.findIndex(item=>item._id === this._id);
        // En caso que sea nuevo en el torneo, se debe agregar el id de torneo a su usuario
          if(index===-1){
          const paraToken = {torneoId:this.torneos[0]._id, usuarioId:this._id}
          this.axios.put(`/user-torneo`,paraToken)
          .then(res=>{
            localStorage.removeItem('token');
            this.guardarUsuario(res.data)
          })
          .catch(e=>{
            console.log(e.response.data.mensaje);
          })
          const elTorneo = this.torneos[0]
          elTorneo.players.push(player)
          //Luego se agregan los datos del jugador al torneo
          this.axios.put(`/torneos`,elTorneo)
          .then(res=>{
            const array=[]
            array.push(res.data)
            this.puntajes(array)
            let aviso="Jugadas ingresadas con éxito"
            this.agregarSnack(aviso)
            this.loadingFunction()
          })
          .catch(e=>{
            console.log(e.response.data.mensaje);
            this.loadingFunction()
          })
          }
        // En caso que esté editando sus datos del torneo 
        if(index!=-1){

      }
        const elTorneo = this.torneos[0]
        const indexPlayer=elTorneo.players.indexOf(player.idPlayer);
        elTorneo.players[index].nickName=this.nickName.name
        for(let item of  elTorneo.players[index].matches){
          for(let item2 of player.matches){
            if(item._id===item2._id){ item=item2}
          }
        }
        this.axios.put(`/torneos-confirmar`,elTorneo)
          .then(res=>{
            if(res.data==='false'){
              let aviso="No es momento de editar ahora"
              this.agregarSnack(aviso)
              this.loadingFunction()
            }
            if(res.data!='false'){
              const array=[]
              array.push(res.data)
              this.puntajes(array)
              let aviso="Jugadas actualizadas"
              this.agregarSnack(aviso)
              this.loadingFunction()
            }
          })
          .catch(e=>{
            console.log(e.response.data.mensaje);
            this.loadingFunction()
          })
    },
    revNombre(){
      const array=[]
      const largo = this.nickName.name.length
      if(this.torneos[0].players.length>0){
        for (let jugador of this.torneos[0].players){
          let coso= jugador.nickName.toLowerCase()
          array.push(coso) 
        }
        const index=this.torneos[0].players.findIndex(item=>item._id === this._id);
        if(index!=-1){
          var index2 = array.findIndex(item=>item === this.torneos[0].players[index].nickName)
          array.splice(index2,1)
        }
      }
      if(array.includes( this.nickName.name)){
        let aviso="Este apodo ya está en uso"
        this.agregarSnack(aviso)
      }
      if(largo==0  ){
        let aviso="No haz escrito apodo"
        this.agregarSnack(aviso)
      }
      if(largo>15){
        let aviso="Apodo muy Largo"
        this.agregarSnack(aviso)
      }
      if(array.includes( this.nickName.name)===false && largo<16 && largo>0){
        this.estado=true
      }

    }
  },
  
}
</script>
<style scoped>
  .centered-input >>> input {
    text-align: center
  }
.ancho{
  margin: 0 auto;
  display: flex;
  justify-content: center;
}


</style>