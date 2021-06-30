<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item me-2" >
        <strong class="is-size-4">Home</strong>
      </router-link>
      <router-link to="/upload" class="navbar-item" >
        <strong class="is-size-4">Upload</strong>
      </router-link>
    </div>
    <div id="navbar" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/login" class="button is-dark">
              <strong v-if="$store.getters['auth/isAuthenticated']" @click="$store.dispatch('auth/AUTH_LOGOUT')">Log out</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Nav',
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
nav {
  margin-top: 25px;
  margin-bottom: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #d88d00;
    }
    text-decoration: none;
  }
}
</style>