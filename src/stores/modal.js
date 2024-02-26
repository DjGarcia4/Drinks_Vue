import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFavoritesStore } from "./favorites";
import { useDrinksStore } from "./drinks";
export const useModalStore = defineStore("modal", () => {
  const favorites = useFavoritesStore();
  const drinks = useDrinksStore();
  const show = ref(false);
  function handleModal() {
    show.value = !show.value;
  }
  const textButton = computed(() => {
    return favorites.existFavorite(drinks.recipe.idDrink)
      ? "Remove from favorites"
      : "Add to Favorites";
  });
  return { show, handleModal, textButton };
});
