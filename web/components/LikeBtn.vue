<template>
  <v-btn :color="status ? 'pink' : null" @click="toggle" icon>
    <v-icon>mdi-heart</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    object: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      status: false
    }
  },
  mounted() {
    this.getStatus()
  },
  methods: {
    async getStatus() {
      const res = await this.$axios.$get('action/status', {
        params: {
          type: this.type,
          object: this.object,
          name: 'like'
        }
      })
      this.status = res.status
    },
    async toggle() {
      const res = await this.$axios.$post('action/toggle', {
        type: this.type,
        object: this.object,
        name: 'like'
      })
      this.status = res.status
    }
  }
}
</script>

<style></style>
