<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" class="nav-background">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">Menu</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="/#/meeting/list">경기모임</b-nav-item>
      <b-nav-item href="/#/notice/list">공지사항</b-nav-item>
      <b-nav-item href="#" disabled>나의클럽</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ],
      showDismissibleAlert: true,
      form: {
        email: '',
        password: '',
        food: null,
        checked: []
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots', 'Beans', 'Tomatoes', 'Corn'
      ],
      show: true
    }
  },
  methods: {
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700');

  body {
    background: #EEF1F4 !important;
    font-family: 'Lato', sans-serif !important;
  }

  .nav-background {
    background: #353535;
  }
</style>
