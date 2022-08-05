<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">
            Gender
          </th>
          <th scope="col">Birth</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- renderizar só os 50 primeiros -->
        <tr v-for="user in filteredUsers.slice(offset, limit)">
          <td>{{ user.name.title }}. {{ user.name.first }} {{ user.name.last }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ formatDate(user.dob.date) }}</td>
          <td>
            <BButton size="sm" @click="selectUser(user)">
              <b-icon icon="info-circle" size="15" />
            </BButton>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center align-items-center" v-if="filter == ''">
      <b-button-group>
        <b-button 
          variant="primary"
          @click="previousPage()"
        >
          <b-icon icon="chevron-left" />
        </b-button>
        <b-button 
          :variant="variantPaginationBtn(1)"
          @click="selectPage(1)"
        >
          1
        </b-button>
        <b-button 
          :variant="variantPaginationBtn(2)"
          @click="selectPage(2)"
        >
          2
        </b-button>
        <b-button 
          :variant="variantPaginationBtn(3)"
          @click="selectPage(3)"
        >
          3
        </b-button>
        <b-button 
          :variant="variantPaginationBtn(4)"
          @click="selectPage(4)"
        >
          4
        </b-button>
        <b-button 
          variant="primary"
          @click="nextPage()"  
        >
          <b-icon icon="chevron-right" />
        </b-button>
      </b-button-group>
    </div>
    <b-modal v-model="show">
      <b-container fluid>
        <b-row>
          <b-col cols="4">
            <img v-bind:src="selectedUser.picture" alt="User" class="img-fluid" />
          </b-col>

          <b-col cols="8">
            <b-row>
              <b-col cols="12" class="p-0 mb-2">
                Nome
                <input type="text" class="w-100" v-model="selectedUser.name" readonly />
              </b-col>

              <b-col cols="12" class="p-0 mb-2">
                Email
                <input type="text" class="w-100" v-model="selectedUser.email" readonly />
              </b-col>

              <b-col cols="12" class="p-0 mb-2 d-flex flex-wrap justify-content-between">
                <b-col md="5" class="p-0 mr-md-2">
                  Gênero
                  <input type="text" class="w-100" v-model="selectedUser.gender" readonly />
                </b-col>

                <b-col md="6" class="p-0">
                  Nascimento
                  <input type="text" class="w-100" :value="formatDate(selectedUser.birthday)" readonly />
                </b-col>
              </b-col>

              <b-col cols="12" class="p-0 mb-2">
                ID
                <input type="text" class="w-100" :value="justLettersAndNumbers(selectedUser.id)" readonly />
              </b-col>        

              <b-col cols="12" class="p-0 mb-2">
                Link de Compartilhamento
                <a :href="shareUrl" v-if="shareUrl != 'Sem ID, sem link'">{{shareUrl}}</a>
                <p v-else>{{shareUrl}}</p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
      <template #modal-footer>
        <div class="w-100"></div>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import store from "@/store";
  import {BIcon} from "bootstrap-vue";
  export default {
    name: "Table",
    components: {
      BIcon,
    },
    data() {
      return {
        users: [],
        selectedUser: {
          picture: "",
          name: "",
          email: "",
          gender: "",
          birthday: "",
          id: "",
        },
        show: false,
        offset: 0,
        limit: 50,
        currentPage: 1,
      };
    },

     mounted() {
      this.users = store.state.users;
      setTimeout(() => {
      this.findUserByID()
      }, 1000);
    },



    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      justLettersAndNumbers(string) {
        if(string) {
          return string.replace(/[^a-zA-Z0-9]/g, "").trim();
        }
        else {
          return "";
        }
      },
      findUserByID() {
        let id = ''
        console.log('chamou função ')
        this.users.forEach(user => {
          id = String(user.id.value).replace(/[^a-zA-Z0-9]/g, "")
          console.log(id)
          if(id == String(this.$route.query.userID)) {
            this.selectUser(user);
            this.show = true;
          }
        });
      },
      selectUser(user) {
        this.show = true;
        this.selectedUser = {
          picture: user.picture.large,
          name: user.name.first + " " + user.name.last,
          email: user.email,
          gender: user.gender,
          birthday: user.dob.date,
          id: user.id.value,
        };
      },

      previousPage() {
        if(this.currentPage > 1) {
        this.currentPage--;
        this.offset = this.offset-50;
        this.limit = this.limit-50;
        }
      },

      nextPage() {
        if (this.currentPage < 4) {
          this.currentPage++;
          this.offset += 50;
          this.limit += 50;
        }
      },

      selectPage(page) {
        this.currentPage = page;
        this.limit = 50 * page;
        this.offset = this.limit - 50;
      },

      variantPaginationBtn(page) {
        if(page == this.currentPage) {
          return "secondary";
        }
        else {
          return "primary";
        }
      },
    },

    computed: {
      shareUrl() {
        if (this.selectedUser.id) {
          return location.protocol + '//' + location.host + location.pathname + '?userID=' + this.justLettersAndNumbers(this.selectedUser.id);
        }
        else {
          return 'Sem ID, sem link';
        }
      },

      filter() {
        this.currentPage = 1;
        this.offset = 0;
        this.limit = 50;
        return store.state.filter;
      },

      filteredUsers() {
        return this.users.filter(user => {
                return user.name.first.toLowerCase().includes(this.filter.toLowerCase()) || user.name.last.toLowerCase().includes(this.filter.toLowerCase()); 
            });
      },
    }
  };
</script>
