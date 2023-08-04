<template>
  <!-- <form @submit.prevent="login">
    <h2>Log in</h2>
    <InputText type="text" v-model="value" />
    <input type="email" placeholder="Email" required v-model="email">
    <input type="password" placeholder="Password" required v-model="password">
    <button>Login</button>
  </form> -->
  <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
  </div>
  <button type="button" class="btn btn-primary btn-sm" @click="login">Login</button>
</form>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/init.js'
import { ref } from 'vue';
const value = ref(null);
export default {
  components: {
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      // login user
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // emit event for member area
          this.$emit('loggedIn')
        })
    }
  }
}
</script>