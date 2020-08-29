 <template>
    <v-row justify="center">
        <v-dialog v-model="newItem.estado" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline" v-if="newItem.id===''">Nueva Regla</span>
                    <span class="headline" v-if="newItem.id!=''">Editar Regla</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col>
                            <v-text-field label="Nombre*" v-model="newItem.nuevoNombre" require></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select v-model="newItem.seleccion" @change="limpiarArray()" :items="opciones" label="Tipo de regla*"></v-select>
                            </v-col>      
                        </v-row>
                        <v-row v-if="newItem.seleccion!=''">
                            <v-col>
                            <v-text-field label="Descripción* (lo que verá el usuario)" v-model="newItem.text" require></v-text-field>
                            </v-col>
                        </v-row>
                        <!-- Formato para Regla tipo Evento -->
                        <v-row v-if="newItem.seleccion==='EVENTO'">
                            <v-col>
                                <v-combobox
                                    v-model="newItem.chips"
                                    chips
                                    deletable-chips
                                    label="Escribe las alternativas"
                                    multiple
                                    prepend-icon="filter_list"   
                                >   
                                </v-combobox>
                                <v-list-item-group>
                                    Vista Previa Usuario: <br>
                                    <b><h3>{{newItem.text}}</h3></b>
                                    <v-list-item v-for="(item,i) of newItem.chips " :key="i">
                                            <v-list-item-title> {{i+1}}) {{item}} </v-list-item-title>
                                            <v-text-field v-model.number="newItem.valores[i]" min=100 type="number" label="Valor Apuesta" outlined dense></v-text-field>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-col>
                        </v-row>
                        <!-- Formato Regla tipo Boleana -->
                        <v-row v-if="newItem.seleccion === 'BOLEANO'">
                            <v-col>
                                <v-list-item-group >
                                        Vista Previa Usuario: <br>
                                        <b><h3>{{newItem.text}}</h3></b>
                                        <v-list-item>
                                                <v-list-item-title>a) Sí </v-list-item-title>
                                            <v-text-field v-model.number="newItem.valores[0]" min=100 type="number" label="Valor Apuesta" outlined dense></v-text-field>

                                        </v-list-item>
                                        <v-list-item>
                                                <v-list-item-title>b) No </v-list-item-title>
                                            <v-text-field v-model.number="newItem.valores[1]" min=100 type="number" label="Valor Apuesta" outlined dense></v-text-field>

                                        </v-list-item>
                                </v-list-item-group>
                            </v-col>
                        </v-row>
                        <!-- Regla tipo Numerico -->
                        <v-row v-if="newItem.seleccion==='NUMERICO'">
                            <v-col>
                                <v-select v-model="newItem.selectNum" :items="numericos" label="Tipo de valores*"></v-select>
                            </v-col>
                        </v-row>
                        <div  v-if="newItem.seleccion==='NUMERICO' && newItem.selectNum==='VALORES FIJOS'">
                            <v-row>
                                <v-combobox
                                type="number"
                                v-model="newItem.chipsnumb"
                                chips
                                deletable-chips
                                label="Escribe las alternativas"
                                multiple
                                prepend-icon="filter_list"   
                                >
                                </v-combobox>
                            </v-row>
                            <v-row>
                                    Vista Previa Usuario: <br>
                                    <b><h3>{{newItem.text}}</h3></b>
                                    <v-list-item v-for="(item,i) of newItem.chipsnumb " :key="i" >
                                            <v-list-item-title > {{i+1}}) {{item}} </v-list-item-title>
                                            <v-text-field v-model.number="newItem.valores[i]" min=100 type="number" label="Valor Apuesta" outlined dense></v-text-field>
                                    </v-list-item>
                            </v-row>
                        </div>
                        <div v-if="newItem.seleccion==='NUMERICO' && newItem.selectNum==='RANGOS'">
                            <v-row>
                                <v-col>
                                <v-text-field type="number" label="Valor Minimo*" v-model="newItem.min" require></v-text-field>      
                                </v-col>
                                <v-col>
                                <v-text-field type="number" label="Valor Max*" v-model="newItem.max" require></v-text-field>      
                                </v-col>
                            </v-row>
                                <v-row>
                                <v-combobox
                                type="number"
                                v-model="newItem.chipsnumb"
                                chips
                                deletable-chips
                                label="Escribe las alternativas"
                                multiple
                                prepend-icon="filter_list"   
                                >
                                </v-combobox>
                            </v-row>
                            <v-row>
                                <v-list-item-group >
                                    Vista Previa Usuario: <br>
                                    <b><h3>{{newItem.text}}</h3></b>
                                    <v-list-item>
                                            <v-list-item-title > 1) {{newItem.min}} o menos </v-list-item-title>
                                            <v-text-field v-model.number="newItem.valores[0]" min=100 type="number" label="Valor Apuesta" outlined dense></v-text-field>
                                    </v-list-item>
                                    <v-list-item v-for="(item,i) of newItem.chipsnumb " :key="i" >
                                            <v-list-item-title > {{i+2}}) {{item}} </v-list-item-title>
                                            <v-text-field v-model.number="newItem.valores[i+1]" min=100 type="number" label="Valor Apuesta" outlined dense></v-text-field>
                                    </v-list-item>
                                    <v-list-item>
                                            <v-list-item-title > {{newItem.chipsnumb.length+2}}) {{newItem.max}} o más </v-list-item-title>
                                            <v-text-field v-model.number="newItem.ultimoValor" min=100 type="number" label="Valor Apuesta" outlined dense></v-text-field>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-row>
                        </div>
                        <small>*campo requerido</small>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cerrarDialog()">Cancelar</v-btn>
                    <v-btn color="blue darken-1"  v-if="newItem.id===''" text @click="crearRegla()">Crear Regla</v-btn>
                    <v-btn color="blue darken-1"  v-if="newItem.id!=''" text @click="actualizarRegla()">Actualizar Regla</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name:'dialogRule',
    data:()=>({
        opciones: ['BOLEANO', 'EVENTO', 'NUMERICO'],
        numericos: ['VALORES FIJOS', 'RANGOS'],
    }),
    computed:{
        ...mapState(['token']),
        ...mapState('rule',['newItem']),
    },
    methods:{
        ...mapMutations('rule',['ruleDialog','createRule','updateRule']),
        ...mapMutations('TextoSnack',['agregarSnack']),
        ...mapMutations('loading',['loadingFunction']),
        limpiarArray(){
            this.newItem.valores=[],
            this.newItem.utimoValor=null
        },
        crearRegla(){
            this.loadingFunction();
            let config = {
                headers: {
                token: this.token
                }
            };
            let nuevo={
                name:this.newItem.nuevoNombre,
                text:this.newItem.text,
                type:this.newItem.seleccion,
                options:{text:[],values:[]},
                numeric:""
            };
            if(nuevo.type==='EVENTO'){
                nuevo.options.text=this.newItem.chips
                nuevo.options.values=this.newItem.valores
            };
            if(nuevo.type==='BOLEANO'){
                nuevo.options.text=['Sí','No']
                nuevo.options.values=this.newItem.valores
            };
            if(nuevo.type==='NUMERICO'){
                if(this.newItem.selectNum==="RANGOS"){
                    nuevo.numeric="RANGOS";
                    nuevo.options.text.push(`${this.newItem.min} o menos`);
                    for (let i of this.newItem.chipsnumb ){
                        nuevo.options.text.push(i);
                    }
                    nuevo.options.text.push(`${this.newItem.max} o más`);
                    nuevo.options.values=this.newItem.valores
                    nuevo.options.values.push(this.newItem.ultimoValor)
                }
                else{
                    nuevo.numeric="VALORES FIJOS";
                    for (let i of this.newItem.chipsnumb ){
                        nuevo.options.text.push(i);
                    }
                    nuevo.options.values=this.newItem.valores
                }
            }
            this.axios.post('/rules',nuevo,config)
                .then(res=>{
                    let regla=res.data
                    this.createRule(regla)
                    this.agregarSnack(`Regla ${regla.name} creada`)
                    this.loadingFunction();
                })
                .catch(e=>{ 
                    console.log(e.response);
                    this.loadingFunction();
                })
            let item={}
            this.ruleDialog(item)
        },
        actualizarRegla(){
            this.loadingFunction();
            let config = {
                headers: {
                token: this.token
                }
            };
            let nuevo={
                name:this.newItem.nuevoNombre,
                text:this.newItem.text,
                type:this.newItem.seleccion,
                options:[],
                numeric:"",
                date:this.newItem.date
            };
            if(nuevo.type==='EVENTO'){
                nuevo.options=this.newItem.chips
            };
            if(nuevo.type==='BOLEANO'){
                nuevo.options=['Sí','No']
            };
            if(nuevo.type==='NUMERICO'){
                    nuevo.numeric="RANGOS";
                if(this.newItem.selectNum==="RANGOS"){
                    nuevo.options.push(`${this.newItem.min} o menos`);
                    for (let i of this.newItem.chipsnumb ){
                        nuevo.options.push(i);
                    }
                    nuevo.options.push(`${this.newItem.max} o más`);
                }
                else{
                    nuevo.numeric="VALORES FIJOS";
                   for (let i of this.newItem.chipsnumb ){
                        nuevo.options.push(i);
                    } 
                }
            }
            this.axios.put(`/rules/${this.newItem.id}`,nuevo,config)
                .then(res=>{
                    let regla=res.data
                    this.updateRule(regla);
                    this.agregarSnack(`Regla ${regla.name} actualizada`);
                    this.loadingFunction();
                })
                .catch(e=>{ 
                    console.log(e.response);
                })
            let item={}
            this.ruleDialog(item)
        },
        cerrarDialog(){
            let item={}
            this.ruleDialog(item)
        }
    }   
}
</script>
