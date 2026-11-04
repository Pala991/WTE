export const WEEKDAY_OPTIONS = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" }
];

export const CUISINE_OPTIONS = [
  { value: "italian", label: "Italian" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "asian", label: "Asian" },
  { value: "mexican", label: "Mexican" },
  { value: "middle-eastern", label: "Middle Eastern" },
  { value: "comfort", label: "Comfort food" }
];

export const ALLERGY_OPTIONS = [
  { value: "gluten", label: "Gluten" },
  { value: "lactose", label: "Lactose / dairy" },
  { value: "nuts", label: "Tree nuts / peanuts" },
  { value: "shellfish", label: "Shellfish" },
  { value: "eggs", label: "Eggs" },
  { value: "soy", label: "Soy" },
  { value: "fish", label: "Fish" }
];

export const DIET_OPTIONS = [
  { value: "balanced", label: "Balanced" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "high-protein", label: "High protein" },
  { value: "light", label: "Light meals" }
];

export const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Advanced" }
];

export const MEAL_TYPES = ["lunch", "dinner"];
export const LANGUAGE_OPTIONS = ["en", "it"];

export function buildDefaultMealPlanTemplate(intervalDays = 7) {
  return Array.from({ length: intervalDays }, () => ({
    lunch: true,
    dinner: true
  }));
}

export const DEFAULT_SETTINGS = Object.freeze({
  language: "en",
  shoppingIntervalDays: 7,
  shoppingDay: 6,
  budgetMin: 60,
  budgetMax: 130,
  cuisines: ["italian"],
  dietProfile: "balanced",
  difficulty: "easy",
  maxPrepMinutes: 60,
  adults: 2,
  childrenAges: [],
  allergies: [],
  mealPlanTemplate: buildDefaultMealPlanTemplate(7)
});

export function cloneDefaultSettings() {
  return {
    language: DEFAULT_SETTINGS.language,
    shoppingIntervalDays: DEFAULT_SETTINGS.shoppingIntervalDays,
    shoppingDay: DEFAULT_SETTINGS.shoppingDay,
    budgetMin: DEFAULT_SETTINGS.budgetMin,
    budgetMax: DEFAULT_SETTINGS.budgetMax,
    cuisines: [...DEFAULT_SETTINGS.cuisines],
    dietProfile: DEFAULT_SETTINGS.dietProfile,
    difficulty: DEFAULT_SETTINGS.difficulty,
    maxPrepMinutes: DEFAULT_SETTINGS.maxPrepMinutes,
    adults: DEFAULT_SETTINGS.adults,
    childrenAges: [...DEFAULT_SETTINGS.childrenAges],
    allergies: [...DEFAULT_SETTINGS.allergies],
    mealPlanTemplate: DEFAULT_SETTINGS.mealPlanTemplate.map((item) => ({
      lunch: item.lunch,
      dinner: item.dinner
    }))
  };
}
