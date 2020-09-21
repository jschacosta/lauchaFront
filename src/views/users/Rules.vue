<template>
  <v-container >
     <v-card
    class="mx-auto mt-5"
    max-width="800"
  >
    <v-list >
      <h1 class="text-h6 text-center mb-4">Reglas Simples</h1>

      <v-list-item-group v-model="item">
        
        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-arrow-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="eltexto">
          <p class="font-weight-black">Acierta al resultado:</p> Si aciertas al resultado Local, Empate o Visita te llevas el puntaje destinado a cada partido.
            <v-list-item-title ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-arrow-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="eltexto">
          <p class="font-weight-black">Acierta a la Dif de Goles:</p>  En caso de acertar al resultado, si aciertas a la diferencia de goles te llevaras un bonus de 50 pts + (50 pts x DG). Donde DF es la diferencia de goles del partido.<br>
          Ej:  En caso de que el marcador de un partido termine en 4-2, te llevaras el puntaje de la dif de goles al apostar un 2-0, 3-1, 5-3, etc. Es decir para este caso un partido con una diferencia de goles de 2.
            <v-list-item-title ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-arrow-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="eltexto">
          <p class="font-weight-black">Acierta al Marcador Exacto:</p> Te llevas un puntaje adicional de 100 pts en caso de acertar al marcador exacto es decir, acertar a tanto a los goles del equipo local como el visitante.
            <v-list-item-title ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>fas fa-arrow-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="eltexto">
          <p class="font-weight-black">Pronósticos Especiales:</p> Cada partido puede tener preguntas adicionales que tiene su puntaje propio. Te llevas el puntaje en caso de acertar al evento exacto. Puedes no responder estas preguntas.
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
    })
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