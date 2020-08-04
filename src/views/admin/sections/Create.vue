<template>
  <v-container>
      <v-row>
          <v-col>
              <formEquipos></formEquipos>
          </v-col>
          <v-col>
              <template>
                <v-row>
                    <v-menu
                        ref="menu"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="time"
                            label="Picker in menu"
                            prepend-icon="access_time"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-time-picker
                        v-if="menu2"
                        v-model="time"
                        full-width
                        @click:minute="$refs.menu.save(time)"
                        ></v-time-picker>
                    </v-menu>
                </v-row>
                  <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker without buttons"
            prepend-icon="event"
            readonly 
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
      </v-menu>
                    
                </template>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import formEquipos from '../../../components/forms/selectForm/formEquipos';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'Create',
    components: {
        formEquipos
    },
    data:()=>({
        //Horas
        time: null,
        menu1:false,
        menu2: false,
        modal2: false,
        //Fechas
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
    })
}
</script>

