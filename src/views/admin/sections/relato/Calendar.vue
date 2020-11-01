<template>
  <div class="mt-5">
      <CalendarioRelatos></CalendarioRelatos>
      <dialogoConfirmar></dialogoConfirmar>
  </div>
</template>

<script>
import CalendarioRelatos from '@/components/cards/CalendarioRelatos.vue'
import dialogoConfirmar from '@/components/utils/dialog/dialogConfirmar.vue'
export default {
    name:'Play',
    components:{
      CalendarioRelatos,
      dialogoConfirmar,
    }
}
</script>

<style>

</style>