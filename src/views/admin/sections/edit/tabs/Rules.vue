<template>
    <div>
        <h4 class="mb-5">Acá se crean editan y eliminan los 3 tipos posibles de reglas para el juego. <br>Reglas tipo Boleanas (sí/no), reglas tipos evento (ej: tiro de esquina, expulsion, falta, etc) y reglas tipo numérica ( 5 o más, 1 o menos y simplemente números). </h4>
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