import { unique } from "./utils.js";

const MONTH_TO_SEASON = {
  0: "winter",
  1: "winter",
  2: "spring",
  3: "spring",
  4: "spring",
  5: "summer",
  6: "summer",
  7: "summer",
  8: "autumn",
  9: "autumn",
  10: "autumn",
  11: "winter"
};

const SEASONAL_SUBSTITUTIONS = {
  tomato: {
    winter: {
      name: "Tomato passata (canned)",
      note: "Fresh tomatoes are off-season in winter, preserved tomato is used."
    }
  },
  basil: {
    winter: {
      name: "Dried basil",
      note: "Fresh basil is less reliable in winter, dried basil is suggested."
    }
  },
  eggplant: {
    winter: {
      name: "Frozen eggplant cubes",
      note: "Eggplant is less seasonal in winter, frozen alternatives are suggested."
    },
    spring: {
      name: "Frozen eggplant cubes",
      note: "Eggplant quality can vary in early spring, frozen alternatives are suggested."
    }
  },
  peas: {
    winter: {
      name: "Frozen peas",
      note: "Peas are usually purchased frozen in winter."
    }
  },
  asparagus: {
    autumn: {
      name: "Green beans",
      note: "Asparagus is mostly spring-seasonal, green beans are suggested."
    },
    winter: {
      name: "Green beans",
      note: "Asparagus is mostly spring-seasonal, green beans are suggested."
    }
  }
};

export function getSeasonFromDate(dateInput = new Date()) {
  const date = new Date(dateInput);
  return MONTH_TO_SEASON[date.getMonth()];
}

export function adaptIngredientsToSeason(ingredients, season) {
  const notes = [];

  const adaptedIngredients = ingredients.map((ingredient) => {
    if (!ingredient.seasonalKey) {
      return ingredient;
    }

    const perSeason = SEASONAL_SUBSTITUTIONS[ingredient.seasonalKey];
    if (!perSeason || !perSeason[season]) {
      return ingredient;
    }

    const replacement = perSeason[season];
    notes.push(replacement.note);
    return {
      ...ingredient,
      name: replacement.name
    };
  });

  return {
    ingredients: adaptedIngredients,
    notes: unique(notes)
  };
}
