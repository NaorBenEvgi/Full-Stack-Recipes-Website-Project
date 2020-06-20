<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <router-link tag="b-navbar-brand" :to="{ name: 'main' }">Vue Recipes</router-link>
    <b-navbar-nav>
      <router-link tag="b-nav-item" :to="{ name: 'about' }">About Us</router-link>
      <router-link tag="b-nav-item" :to="{ name: 'search' }">Search</router-link>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-text v-if="!$root.store.username">Hello Guest |</b-nav-text>
      <b-nav-text v-else>Hello {{$root.store.username }} |</b-nav-text>

      <b-nav-item-dropdown v-if="$root.store.username" text="Personal" right>
        <router-link tag="b-dropdown-item" :to="{ name: 'favorites'}">Favorites</router-link>
        <router-link tag="b-dropdown-item" :to="{ name: 'personalRecipes'}">My Recipes</router-link>
        <router-link tag="b-dropdown-item" :to="{ name: 'familyRecipes'}">Family Recipes</router-link>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="User" right>
        <router-link
          v-if="!$root.store.username"
          tag="b-dropdown-item"
          :to="{ name: 'login' }"
        >Login</router-link>
        <b-dropdown-item v-else @click="Logout">Logout</b-dropdown-item>
        <router-link tag="b-dropdown-item" :to="{ name: 'register' }">Register</router-link>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style>
</style>    