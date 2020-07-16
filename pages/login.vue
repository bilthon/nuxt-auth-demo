<template>
  <div class="root">
    <div class="col-lg-4 mx-auto">
      <div class="auto-form-wrapper">
        <form @submit="userLogin">
          <div class="form-group">
            <label class="label">Email</label>
            <div class="input-group">
              <input
                type="text"
                v-model="login.email"
                class="form-control"
                placeholder="Email"
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="mdi mdi-check-circle-outline"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="label">Password</label>
            <div class="input-group">
              <input
                type="password"
                v-model="login.password"
                class="form-control"
                placeholder="Password"
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="mdi mdi-check-circle-outline"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary submit-btn btn-block">
              Login
            </button>
          </div>
        </form>
        <p class="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      login: {
        email: '',
        password: ''
      },
      error: ''
    };
  },
  mounted() {
    console.log('this.$auth.loggedIn: ', this.$auth.loggedIn);
    console.log('this.$auth.user.email: ', this.$auth.user.email);
    if (this.$auth.loggedIn && this.$auth.user.email !== undefined) {
      this.$router.push('/');
    }
  },
  methods: {
    async userLogin(event) {
      event.preventDefault();
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.login
        });
        console.log('response: ', response);
        if (response.status === 200 && response.data === 'success') {
          this.$router.push('/');
        }
      } catch (err) {
        this.error = 'Invalid credentials';
      }
    }
  }
};
</script>

<style>
input {
  margin: 5px;
}
label {
  margin: 5px;
}
button {
  margin: 5px;
}
.root {
  margin: 50px;
}
.error {
  color: #f00;
}
</style>
