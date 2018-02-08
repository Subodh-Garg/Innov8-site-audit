<template>
  <!-- <v-container>
  <v-layout row wrap justify-center>
  <v-flex xs12>
  <img src="https://innov8.work/static/images/INNOV8_LOGO.png" alt="innov8" class="logo-title">
</v-flex>
<h1>Login Page {{isDesktop}}</h1>
</v-layout>
</v-container> -->
<div class="full-screen">
  <div class="items-container">
    <div class="logo-container">
      <img src="https://innov8.work/static/images/INNOV8_LOGO.png" alt="innov8" class="logo-title">
    </div>
    <div class="login-text">
      <h2>Login</h2>
    </div>
    <div class="login-form">
      <form @submit.prevent="signIn()">
        <v-text-field
        name="email"
        label="Email"
        v-model="email"
        type="email"
        required
        >
        </v-text-field>
        <v-text-field
        name="password"
        label="Password"
        v-model="password"
        type="password"
        required
        >
        </v-text-field>
        <v-btn type="submit" block primary dark>
          Log In
        </v-btn>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    isDesktop () {
      return this.$store.getters.isDesktop
    },
    error () {
      return this.$store.getters.error
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  watch: {
    isAuthenticated (value) {
      if (value) {
        this.$router.push('/projects')
      }
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      console.log('post object: ' + JSON.stringify({email: this.email, password: this.password}))
      this.$store.dispatch('signIn', {email: this.email, password: this.password})
    }
  }
}
</script>

<style scoped>
.full-screen {
  height: 100vh;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.items-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.logo-container {
  text-align: center;
}
.login-text {
  margin: 30px;
  font-size: 18px;
}
.logo-title {
  width: 75%;
}
.login-form {
  width:85%;
}
</style>
