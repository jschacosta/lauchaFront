<template>
    <div>
        <h4 class="mb-3" align="justify">En esta pestaña se crean, editan y eliminan los tres tipos posibles de reglas para el juego.</h4>
        <h4 class="mb-3" align="justify"> Dentro de las posibles reglas estan: tipo Boleanas (Sí / No), tipo Evento (tiro de esquina, expulsion, falta, etc) y tipo numérica (5 o más, 1 o menos y sólo números). </h4>
        <h4 align="justify">Además se designa su puntaje por defecto de apuesta para cada posible alternativa. Este valor puede ser modificado en la sección "Crear Partidos"</h4>
        <br>
        <TablaReglas></TablaReglas>
        <dialogRule></dialogRule>
        <dialogEliminar></dialogEliminar>
    </div>
</template>

<script>
import TablaReglas from '@/components/tables/tablaReglas';
import dialogRule from '@/components/dialog/dialogRule';
import dialogEliminar from '@/components/dialog/dialogEliminar';
export default {
    name:'Rules',
    components:{
        TablaReglas,
        dialogRule,
        dialogEliminar
    }
}
</script>