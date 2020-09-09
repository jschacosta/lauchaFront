<template>
  <div>
      <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Defina Fecha "
            prepend-icon="event"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable :min="new Date().toISOString().substr(0, 10)">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date);enviar()">OK</v-btn>
        </v-date-picker>
      </v-dialog>
  </div>
</template>
<script>
import { mapMutations} from 'vuex';
export default {
    name:'pickerTime',
    data:()=>({
        date: null,
        modal: false,
    }),
    methods:{
        ...mapMutations('match',['saveDate']),
        enviar(){
            this.saveDate(this.date)
        }
    }
}
</script>
