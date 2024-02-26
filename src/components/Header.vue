<template>
  <header class="bg-slate-800" :class="{ header: pageHome }">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'Home' }"
            ><img src="/img/logo.svg" class="w-32" alt="Logo"
          /></RouterLink>
        </div>
        <nav class="flex gap-4 text-white">
          <RouterLink
            :to="{ name: 'Home' }"
            class="uppercase font-bold"
            active-class="text-orange-500"
            >Home</RouterLink
          >
          <RouterLink
            :to="{ name: 'Favorites' }"
            active-class="text-orange-500"
            class="uppercase font-bold"
            >Favorites</RouterLink
          >
        </nav>
      </div>
      <form
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        v-if="pageHome"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingredient"
            >Name or Ingredients</label
          >
          <input
            class="p-3 w-full rounded-lg focus:outline-none"
            type="text"
            id="ingredient"
            placeholder="Enter a name or ingredient... ex. Vodka, Tequila"
            v-model="store.search.name"
          />
        </div>
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="category"
            >Categories</label
          >
          <select
            name="category"
            id="category"
            class="p-3 w-full rounded-lg focus:outline-none"
            v-model="store.search.category"
          >
            <option value="" selected disabled>Select Category</option>
            <option
              :value="categorie.strCategory"
              v-for="categorie in store.categories"
              :key="categorie.strCategory"
            >
              {{ categorie.strCategory }}
            </option>
          </select>
        </div>
        <input
          type="submit"
          value="Search"
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer font-extrabold rounded-lg uppercase text-white w-full p-2"
        />
      </form>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useDrinksStore } from "../stores/drinks";

const store = useDrinksStore();

const route = useRoute();
const pageHome = computed(() => route.name === "Home");

const handleSubmit = () => {
  store.getRecipes();
};
</script>

<style scoped>
.header {
  background-image: url("/img/bg.jpg");
  background-position: center;
  background-size: cover;
}
</style>
