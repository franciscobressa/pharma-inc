<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand
      href="/"
    >Pharma Inc.</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          href="/"
        >Página Inicial</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <b-icon icon="person-fill"/>
          </template>
          <b-dropdown-item>Perfil</b-dropdown-item>
          <b-dropdown-item>Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { BIcon } from 'bootstrap-vue'
export default {
  name: 'Navbar',
  components: {
    BIcon,
  },
}
</script>