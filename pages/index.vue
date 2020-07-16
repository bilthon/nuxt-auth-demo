<template>
  <div class="container">
    <p>{{ getState() }}</p>
    <button v-on:click="logoutClicked">Log out</button>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('this.$auth.loggedIn: ', this.$auth.loggedIn);
    console.log('this.$auth.user.email: ', this.$auth.user.email);
    if (!this.$auth.loggedIn || this.$auth.user.email === undefined) {
      this.$router.push('/login');
    }
  },
  methods: {
    getState() {
      return this.$auth.loggedIn ? 'Logged' : 'Not logged';
    },
    async logoutClicked() {
      const res = await this.$auth.logout();
      console.log('Logout res: ', res);
      this.$auth.setUser(undefined);
      this.$router.push('/login');
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
