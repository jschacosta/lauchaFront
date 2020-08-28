<template>
    <div>
        <v-dialog ref="dialog" v-model="modal" :return-value.sync="time" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                v-model="time"
                label="Defina Hora"
                prepend-icon="access_time"
                readonly
                v-bind="attrs"
                v-on="on"
                >
                </v-text-field>
            </template>
            <v-time-picker v-if="modal" v-model="time" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click=" $refs.dialog.save(time);enviar()">OK</v-btn>
            </v-time-picker>
        </v-dialog>
    </div>
</template>
<script>
import { mapMutations} from 'vuex';
export default {
    name:'pickerTime',
    data:()=>({
        time: null,
        modal: false,
    }),
    methods:{
        ...mapMutations('match',['saveTime']),
        enviar(){
            this.saveTime(this.time)
        }
    }
}
</script>
