import { ref, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import { useDrinksStore } from "./drinks";
import { useToast } from "vue-toast-notification";
import { useModalStore } from "./modal";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref([]);
  const $toast = useToast();
  const drinks = useDrinksStore();
  const modal = useModalStore();

  watch(
    favorites,
    () => {
      synchronizeLocalStorage();
    },
    {
      deep: true,
    }
  );

  function synchronizeLocalStorage() {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  }
  function existFavorite() {
    const favoritesLocalStorage =
      JSON.parse(localStorage.getItem("favorites")) ?? [];
    return favoritesLocalStorage.some(
      (favorite) => favorite.idDrink === drinks.recipe.idDrink
    );
  }
  function deleteFavorite() {
    favorites.value = favorites.value.filter(
      (item) => item.idDrink !== drinks.recipe.idDrink
    );
    $toast.success(`${drinks.recipe.strDrink}  removed from favorites!`);
  }
  function addFavorite() {
    favorites.value.push(drinks.recipe);
    $toast.success(`Add ${drinks.recipe.strDrink} to Favorites.`);
  }

  function handleFavorites() {
    if (existFavorite(drinks.recipe.idDrink)) {
      deleteFavorite();
    } else {
      addFavorite();
    }
    modal.handleModal();
  }
  onMounted(() => {
    favorites.value = JSON.parse(localStorage.getItem("favorites")) ?? [];
  });
  return { favorites, handleFavorites, existFavorite };
});
