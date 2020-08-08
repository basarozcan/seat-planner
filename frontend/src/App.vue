<template>
  <div class="welcome">
    <router-view></router-view>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
export default {

  computed: {
    ...mapGetters(['isLoggedIn']),
  },

  methods: {
    ...mapActions(['fetchUser','fetchBoards']),
  },
  
  async beforeMount() {
    await this.fetchUser()
    if(this.isLoggedIn === true){
        this.fetchBoards()
    }
  }
  
}
</script>