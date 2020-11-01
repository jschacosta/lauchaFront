<template>
  <v-container >
     <v-card
    class="mt-5" :class="imagen==='xs'?'mx-3':'mx-auto'"
    max-width="800"
  >
    <v-list >
      <h1 class="text-h6 text-center mb-4">Reglas de Puntajes</h1>

      <v-list-item-group v-model="item">
        
        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-arrow-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="eltexto">
          <p class="font-weight-black text-body-1">Acierta al resultado:</p> Si aciertas al resultado Local, Empate o Visita te llevas el puntaje destinado a cada partido. En el caso de que esos puntajes tengan valor 0, significa que aún no están actualizados para el partido por los admin, pero puedes apostar de todas maneras y cambiarlos cuando lo desees (hasta el inicio del partido). 
            <v-list-item-title ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-arrow-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="eltexto">
          <p class="font-weight-black text-body-1">Acierta a la Dif de Goles:</p>  En caso de acertar al resultado, si aciertas a la diferencia de goles te llevaras un bonus de: <p class="font-weight-black text-body-2">50 pts + (50 pts x DG)</p>Donde DG es la diferencia de goles del partido.<br>
          <i class="fas fa-arrow-down"></i>Ej:  Supongamos que  el marcador de un partido finaliza en 4-2, te llevaras el puntaje de la dif de goles si apuestas un 2-0, 3-1, 5-3, etc. es decir, un marcador con una diferencia de goles de 2. El puntaje de diferencia de gol para este caso sería: 50 + 50 x 2 = 150 pts.
            <v-list-item-title ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-arrow-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="eltexto">
          <p class="font-weight-black text-body-1">Acierta al Marcador Exacto:</p> Te llevas un puntaje adicional de 100 pts en caso de acertar al marcador exacto es decir, acertar a tanto a los goles del equipo local como el visitante.
            <v-list-item-title ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-arrow-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="eltexto">
          <p class="font-weight-black text-body-1">Pronósticos Especiales:</p> Cada partido puede tener preguntas adicionales que tiene su puntaje propio. Te llevas el puntaje en caso de acertar al evento exacto. <p  class="font-weight-black text-body-2">Pero en el caso que no aciertes, el puntaje de la alternativa que escogiste se descontará de tu acumulado.</p>Este tipo de jugada puede llevarte a la cima o dejarte en el abismo.
            <v-list-item-title ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>
    </v-list>
  </v-card>
  </v-container>
</template>

<script>
export default {
    name:'Rules',
    data:()=>({
      item:''
    }),
    computed:{
      imagen(){
      switch (this.$vuetify.breakpoint.name){
        case 'xs': return 'xs'
        case 'sm': return 'sm'
        case 'md': return 'md'
        case 'lg': return 'lg'
        case 'xl': return 'xl'
      }
    },
  }
}
</script>

<style>
.ancho{
  margin: 0 auto;
  display: flex;
  justify-content: center;
  max-width: 800px;
}
.eltexto{
  text-align: justify;
  text-justify: inter-word;
}
</style>