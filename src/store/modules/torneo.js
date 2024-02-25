import puntuacion from "../data/puntuacion";
import ordenar from "../data/ordenar";

export default {
  namespaced: true,
  name: "torneo",
  state: {
    torneos: [{ name: "", players: [] }], // contiene todos los datos del torneo actual
    porJugar: [], // contiene datos detallados de Partidos del torneo en estado Por Jugar
    matchTorneo: [], // contiene datos detallados de Partidos del torneo (estado:Por Jugar-Jugando-Terminado)
    matchTodos: [], // contiene todos los datos los partidos de la app, incluso si no estan en el torneo
    dialogo: { estado: false, paso: 1, cambiarName: false },
    puntosSeparados: [], // es un array de puntajes de puntos por partido [RES, DIFGOL, MARC EXAC, REGLAS ADIC] para el jugador logueado
    puntosSeparadosTodos: [], // es un array de puntajes de puntos por partido [RES, DIFGOL, MARC EXAC, REGLAS ADIC] para todos los jugadores
    contadorTorneo: false,
  },
  mutations: {
    cambiarDialog(state, payload) {
      state.dialogo.estado = payload.estado;
      state.dialogo.paso = payload.paso;
    },
    changeNombre(state, payload) {
      console.log(payload);
      state.dialogo.estado = payload.estado;
      state.dialogo.paso = payload.paso;
      state.dialogo.cambiarName = payload.cambiarName;
    },
    obtenerTorneos(state, payload) {
      if (payload.length != 0) {
        if (payload[0].players.length === 0) {
          state.torneos = payload;
        }
        if (payload[0].players.length != 0) {
          const datos = ordenar.ordenarPuntoNombre(payload); //funcion que ordena por pts y luego por nombre (modulo aparte)
          state.torneos = datos;
        }
      }
    },
    eliminarTorneo(state, payload) {
      let eliminar = payload;
      const index = state.torneos.findIndex(
        (item) => item._id === eliminar._id
      );
      state.torneos.splice(index, 1);
      state.torneos = [{ name: "", players: [] }];
    },
    ordenarPorJugar(state, payload) {
      console.log("ordenando por jugar", payload);
      const datos = ordenar.ordenarFecha(payload); //funcion ordena por fecha y luego por hora (modulo aparte)
      state.porJugar = datos;
    },
    ordenarTodos(state, payload) {
      const datos = ordenar.ordenarFecha(payload);
      state.matchTodos = datos;
    },
    ordenarJugador(state, payload) {
      const datos = ordenar.ordenarFecha(payload);
      state.matchTorneo = datos;
    },
    enviarPtsPlayers(state, payload) {
      state.puntosSeparadosTodos = payload;
    },
    enviarPuntos(state, payload) {
      state.puntosSeparados = payload;
    },
    pedirContador(state) {
      state.contadorTorneo = true;
    },
  },
  actions: {
    agregarPorJugar({ commit, rootState, state }, payload) {
      // let torneos = rootState.torneo.torneos[0].matches;
      const torneo = payload[0][0];
      const allMatches = payload[1];
      const arrayPorjugar = [];
      const arrayJugador = [];
      console.log("wenardo", allMatches);
      for (let partido of allMatches) {
        for (let partidoTorneo of torneo.matches) {
          if (partido._id === partidoTorneo._id) {
            arrayJugador.push(partido);
          }
          if (
            partido._id === partidoTorneo._id &&
            partido.estado === "POR JUGAR"
          ) {
            arrayPorjugar.push(partido);
          }
        }
      }
      commit("ordenarPorJugar", arrayPorjugar);
      commit("ordenarJugador", arrayJugador);
      commit("ordenarTodos", payload[1]);
    },

    puntajes({ commit, rootState }, torneo) {
      if (torneo[0].name === "" && torneo[0].players.length === 0) {
        // No hay torneo creado
        const vacio = [];
        commit("obtenerTorneos", vacio);
      }
      if (torneo[0].name != "" && torneo[0].players.length === 0) {
        // Hay torneo creado pero no hay jugadores
        commit("obtenerTorneos", torneo);
      }
      if (torneo[0].players.length != 0) {
        // Hay torneo y hay jugadores
        var arrayResultados = [];
        var j = 0;
        for (let jugador of torneo[0].players) {
          arrayResultados.push({ jugador: jugador._id, matches: [] });
          var ptsAcumulados = 0;
          var k = 0;
          for (let partido of jugador.matches) {
            const index = torneo[0].matches.findIndex(
              (item) => item._id === partido._id
            );
            //Funcion que suma puntajes según score, la entrada es un arreglo con el result del Match, result del Jugador y valores Apuesta del partido
            const resultado = puntuacion.score(
              torneo[0].matches[index].score,
              partido.score,
              torneo[0].matches[index].apuesta
            );
            ptsAcumulados += resultado.suma;
            //funcion que suma puntajes segun reglas adicionales escogidas
            var i = 0;
            var todosNumeros = resultado.desglose;
            var sumaReglas = 0;
            for (let reglas of partido.ruleElections) {
              var resTorneo = torneo[0].matches[index].ruleResult[i];
              var resJugador = reglas;
              console.log("torneo", resJugador, resTorneo, i);

              if (
                resTorneo != undefined &&
                resTorneo != null &&
                (resTorneo - 1 != NaN || resTorneo - 1 != -1) &&
                resJugador != null
              ) {
                console.log("va bien", torneo[0].reglasFinal);
                if (resJugador === resTorneo - 1) {
                  console.log("cas1");
                  ptsAcumulados += torneo[0].reglasFinal[k][i][reglas];
                  sumaReglas += torneo[0].reglasFinal[k][i][reglas];
                }
                if (resJugador != resTorneo - 1) {
                  console.log("cas2");
                  ptsAcumulados -= torneo[0].reglasFinal[k][i][reglas];
                  console.log("suma reglas", sumaReglas);
                  sumaReglas -= torneo[0].reglasFinal[k][i][reglas];
                  console.log("suma reglas", sumaReglas);
                }
              }
              i++;
            }
            console.log("sumaReglasss", sumaReglas);
            sumaReglas != NaN
              ? todosNumeros.push(sumaReglas)
              : todosNumeros.push(0);
            arrayResultados[j].matches.push(todosNumeros);
            console.log("todosNumeros", todosNumeros);

            k++;
          }
          j++;
          jugador.points = ptsAcumulados;
        }
        commit("obtenerTorneos", torneo);
        commit("enviarPtsPlayers", arrayResultados);
        const indexJugador = arrayResultados.findIndex(
          (item) => item.jugador === rootState._id
        );
        var arrayFinal = arrayResultados[indexJugador];
        commit("enviarPuntos", arrayFinal);
      }
    },
  },
  modules: {
    puntuacion,
    ordenar,
  },
};
