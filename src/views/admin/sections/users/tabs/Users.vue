<template>
    <div class="mt-2">
        <tablaUserAdmin></tablaUserAdmin>
        <newUser></newUser>
        <editarRol></editarRol>
        <dialogConfirmar></dialogConfirmar>
    </div>
</template>
<script>
import tablaUserAdmin from '@/components/tables/tablaUserAdmin.vue'
import newUser from '@/components/dialog/userAdmin/newUser.vue'
import editarRol from '@/components/dialog/userAdmin/editarRol.vue'
import dialogConfirmar from '@/components/utils/dialog/dialogConfirmar.vue'
export default {
    name: 'Users',
    components:{
        tablaUserAdmin,
        newUser,
        editarRol,
        dialogConfirmar,
    }
}
</script>
