<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Edit</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <input v-model="description" placeholder="New Password">
            <p></p>
            <button type="button" @click="close" class="pure-button">Close</button>
            <button type="submit" class="pure-button pure-button-secondary">Change Password</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: 'Edit',
  props: {
    show: Boolean,
  },
  data() {
    return {
      accountName:'',
      title: '',
      description: '',
      id:'',
      error: '',
    }
  },
  created() {
  this.$store.dispatch("getUser");
  this.$store.dispatch("getAllPhotos");
  },
  methods: {

    close() {
      this.$emit('escape');
    },
    async upload() {
      try {
      console.log(this.photos);
        this.error = await this.$store.dispatch("editAccount", this.description,this.photos[0]._id);
        if (!this.error) {
          this.accountName='';
          this.title = '';
          this.description = '';
          this.$emit('uploadFinished');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  }

</script>
<style scoped>
input {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px
}

.pure-button-secondary {
  float: right;
}
</style>
