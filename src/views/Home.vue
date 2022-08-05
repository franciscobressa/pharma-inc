<template>
  <div class="Home mx-auto col-11">
    <BCardText>
      <h3>Bem-vindo ao sistema de gestão da Pharma Inc.</h3>
      <p>
        Aqui você pode gerenciar os os clientes.
      </p>
    </BCardText>
    <Searchbar class="mb-3"/>
    <Table class="bg-white"/>
  </div>
</template>

<script>
import Table from '@/components/Table.vue'
import Searchbar from '@/components/Searchbar.vue'
export default {
  components: {
    Table,
    Searchbar
  },
}
</script>

<style scoped>
.Home {
  padding: 30px;
}
</style>
