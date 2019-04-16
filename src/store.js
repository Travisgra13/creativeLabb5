import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    photos: [],
    photo:""

  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPhotos(state, photos) {
    state.photos = photos;
    },
    deletePhoto(state, id) {
      //index = state.photos.findIndex(photo => _id === id);
      //console.log(index);
      //state.photos.splice(index, 1);
    }

  },
  actions: {
    async getSinglePhoto(context, id){
      try{
        let response = await axios.get("/api/photos/"+ id);
          context.commit('setPhotos',response.data);
          return"";
          console.log('antes de entrar');
          console.log(response);

      }
        catch (error) {
          console.log('error loco');
          return "";
      }
    },



    async register(context, data) {
      console.log(data);
      try {
        let response = await axios.post("/api/users", data);
        console.log(response);

        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
       try {
         let response = await axios.post("/api/users/login", data);
         context.commit('setUser', response.data);
         return "";
       } catch (error) {
         return error.response.data.message;
       }
     },
     async logout(context) {
        try {
          await axios.delete("/api/users");
          context.commit('setUser', null);
          return "";
        } catch (error) {
          return error.response.data.message;
        }
      },
      async getUser(context) {
        try {
          let response = await axios.get("/api/users");
          context.commit('setUser', response.data);
          return "";
        } catch (error) {
          return "";
        }
      },
      async upload(context, data) {
      try {
        await axios.post('/api/photos', data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },

    async getMyPhotos(context) {
      try {
        let response = await axios.get("/api/photos");
        context.commit('setPhotos', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async deleteAccount(context,id) {
  
    try {
      console.log(id);
      let response = axios.delete("/api/photos/" + id);
      console.log("first");
      context.commit('deletePhoto', id);
      console.log("second");
      let response2 = await axios.get("/api/photos/all");
      context.commit('setPhotos', response2.data);
      //context.getAllPhotos();
      return true;
    } catch (error) {
      console.log(error);
    }
  },
    async getAllPhotos(context) {
     try {
       let response = await axios.get("/api/photos/all");
       context.commit('setPhotos', response.data);
       return "";
     } catch (error) {
       return "";
     }
   },
  },
})
