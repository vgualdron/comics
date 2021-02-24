<template>
  <b-container v-if="img" fluid class="p-4 bg-ligh" style="text-align: center;">
    <h1>{{ img.title }}</h1>
    <img
      :src="img.url"
      :alt="img.alt"
      class="image rounded border m-2"
      @error="imageError"
    >
    <b-form-rating v-if="!isWinner" v-model="value" variant="warning" stars="10" show-value />
    <b-button v-if="!isWinner" class="mt-3" block variant="info" @click="sendPoints" :disabled="(value == 0)">Envíar</b-button>
    <b-alert v-if="isWinner" show variant="success">{{ img.title }} Ganador!.</b-alert>
  </b-container>
</template>
<script>
export default {
  name: "VImagen",
  props: {
    img: {
      required: true
    },
    isWinner: {
      required: false
    }
  },
  data: function() {
    return {
      imgError: false,
      url: '/image-error.jpg',
      value: 0
    }
  },
  mounted: function() {
  },
  methods: {
    imageError: function() {
      this.url = "/image-error.jpg"
    },
    sendPoints: function() {
      this.img.points = this.value
      this.value = 0
      this.$emit("sendPoints", this.img)
    }
  }
}
</script>

<style scoped>
img {
  cursor: pointer;
}
.card-body {
  flex: 1 1 auto;
  padding: 0.25rem;
}
.image {
  max-height: 400px;
  transition: 0.5s;
}

.image:hover,
.image:active {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.39) !important;
}
</style>
