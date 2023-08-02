<template>

  <form @submit.prevent="login">
  <h2>Log in</h2>
    <InputText type="text" v-model="value" />
    <input type="email"    placeholder="Email"    required v-model="email">
    <input type="password" placeholder="Password" required v-model="password">
    <button>Log in</button>
  </form>
  
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/init.js'
import { ref } from 'vue';
const value = ref(null);
export default {
  components:{
  },
  data() {
    return {
      email:    '',
      password: ''
    }
  },
  methods: {
    login() {
      // login user
      signInWithEmailAndPassword(auth,this.email,this.password)
      .then(() => {
        // emit event for member area
        this.$emit('loggedIn')
      })
    }
  }
}
</script>