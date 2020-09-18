import Vue from 'vue'
import Vuex from 'vuex'
//para decodificar el token jwt
import decode from 'jwt-decode';
//modulos
import teams from './modules/teams'
import userAdmin from './modules/userAdmin'
import textoSnack from './modules/textoSnack'
import loading from './modules/loading'
import rule from './modules/rule'
import relato from './modules/relato'
import match from './modules/match'
import confirmar from './modules/confirmar'
import torneo from './modules/torneo'
//arreglo de info EQUIPOS
import elections from './data/elections'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    usuarioDB: '',
    role:"",
    nombre:"",
    apellido:"",
    _id:"",
    losTorneos:[],
    estadoMenu:false
  },
  mutations: {
    obtenerUsuario(state,payload){
      state.token=payload;
      if(payload=== ''){
        state.usuarioDB =''
        state.nombre=""
        state.apellido=""
        state.role =''
        state._id = ""
        state.losTorneos= []
        
      }
      else{
        state.usuarioDB=decode(payload);
        state.role=state.usuarioDB.data.role;
        state.nombre=state.usuarioDB.data.name;
        state.apellido=state.usuarioDB.data.lastName
        state._id=state.usuarioDB.data._id
        state.losTorneos=state.usuarioDB.data.torneos
      }
    },
    activarMenuLateral(state,payload){ //para activar el menu lateral
      state.estadoMenu=payload
    }
  },
  actions: {
    guardarUsuario({commit},payload){
      localStorage.setItem('token',payload);
      commit('obtenerUsuario',payload)
    },
    cerrarSesion({commit}){
      commit('obtenerUsuario', '');
      localStorage.removeItem('token');
    },
    leerToken({commit}){
      const token = localStorage.getItem('token');
      if(token){
        commit('obtenerUsuario', token);
        
      }
      else{
        commit('obtenerUsuario', '');
      }
    }
  },
  getters:{
    estaActivo:state => !!state.token,
  },
  modules:{
    teams,
    match,
    relato,
    rule,
    userAdmin,
    torneo,
    //generales:
    textoSnack, 
    loading,
    confirmar,
    //arreglo Equipos:
    elections
  }
})
