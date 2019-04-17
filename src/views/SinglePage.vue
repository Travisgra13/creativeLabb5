<template>
  <image-gallery :photos="[photos]" />
</template>
<script>
import ImageGallery from '@/components/ImageGallery.vue'
console.log("in single Page");
export default {
  name:'SinglePage',
  components: {
    ImageGallery
  },
  computed:{
    photos(){
      return this.$store.states.photos;
    }

  },

  // data section with an array of one photo
  async created() {
  await this.$store.dispatch("getSinglePhoto", this.$route.params.id);
  }
}
</script>
