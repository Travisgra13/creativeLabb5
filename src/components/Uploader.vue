<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h1 class="modal-title">Upload</h1>
        </div>
        <div class="modal-body">
          <p v-if="error" class="error">{{error}}</p>
          <form @submit.prevent="upload">
            <input v-model="accountName" placeholder="Account Name">
            <input v-model="title" placeholder="Username">
            <input v-model="description" placeholder="Password">
            <p></p>
            <button type="button" @click="close" class="pure-button">Close</button>
            <button type="submit" class="pure-button pure-button-secondary">Add Account</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: 'Uploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      accountName:'',
      title: '',
      description: '',
      error: '',
    }
  },
  methods: {
  
    close() {
      this.$emit('escape');
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('accountName', this.accountName);
        formData.append('title', this.title);
        formData.append('description', this.description);

        this.error = await this.$store.dispatch("upload", formData);
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
