<template>
  <div class="mt-5">
      <CalendarioAdmin></CalendarioAdmin>
      <dialogoConfirmar></dialogoConfirmar>
  </div>
</template>

<script>
import CalendarioAdmin from '@/components/cards/calendarioAdmin.vue'
import dialogoConfirmar from '@/components/dialog/confirmar.vue'
export default {
    name:'Play',
    components:{
      CalendarioAdmin,
      dialogoConfirmar,
    }
}
</script>

<style>

</style>