import { ref, onMounted, reactive, computed } from "vue";
import { defineStore } from "pinia";
import APIService from "../services/APIService";
import { useModalStore } from "./modal";

export const useDrinksStore = defineStore("drinks", () => {
  const modal = useModalStore();
  const categories = ref([]);
  const recipes = ref([]);
  const recipe = ref([]);
  const recipeDetail = ref({});
  const search = reactive({
    name: "",
    category: "",
  });
  const ingredients = ref([]);
  const measures = ref([]);

  onMounted(async function () {
    const {
      data: { drinks },
    } = await APIService.getCategories();
    categories.value = drinks;
  });
  async function getRecipes() {
    const {
      data: { drinks },
    } = await APIService.searchRecipes(search);

    recipes.value = drinks;
  }
  async function getRecipe(id) {
    const {
      data: { drinks },
    } = await APIService.getRecipe(id);
    recipe.value = drinks[0];
    modal.handleModal();
    ingredients.value = Object.keys(recipe.value)
      .filter((key) => key.startsWith("strIngredient") && recipe.value[key])
      .map((key) => recipe.value[key]);
    measures.value = Object.keys(recipe.value)
      .filter((key) => key.startsWith("strMeasure") && recipe.value[key])
      .map((key) => recipe.value[key]);
  }

  return {
    categories,
    search,
    getRecipes,
    recipes,
    getRecipe,
    recipe,
    recipeDetail,
    measures,
    ingredients,
  };
});
