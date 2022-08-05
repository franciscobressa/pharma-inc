<template>
    <div class="searchbar">
        <b-form-input size="sm" class="mr-sm-2" v-model="search" placeholder="Search"></b-form-input>
    </div>
</template>

<script>
import store from "@/store";
export default {
    name: "Searchbar",
    data() {
        return {
            search: "",
        };
    },
    watch: {
        search() {
            store.dispatch("setFilter", this.search);
        },
    },
};
</script>