import Vue from 'vue'
import Vuex from 'vuex'
//para decodificar el token jwt
import decode from 'jwt-decode';
//modulos
import teams from './modules/teams'
import TextoSnack from './modules/TextoSnack'
import loading from './modules/loading'
import rule from './modules/rule'
import elections from './data/elections'
import match from './modules/match'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    usuarioDB: '',
    role:"",
    nombre:"",
    apellido:"",
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
        
      }
      else{
        state.usuarioDB=decode(payload);
        state.role=state.usuarioDB.data.role;
        state.nombre=state.usuarioDB.data.name;
        state.apellido=state.usuarioDB.data.lastName
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
    TextoSnack, 
    loading,
    rule,
    elections
  }
})
