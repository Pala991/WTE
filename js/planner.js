import {
  ALLERGY_OPTIONS,
  buildDefaultMealPlanTemplate,
  cloneDefaultSettings,
  CUISINE_OPTIONS,
  DEFAULT_SETTINGS,
  DIET_OPTIONS,
  DIFFICULTY_OPTIONS,
  LANGUAGE_OPTIONS,
  MEAL_TYPES
} from "./constants.js";
import { getLocaleForLanguage, translate } from "./i18n.js";
import { RECIPES } from "./recipes.js";
import { adaptIngredientsToSeason, getSeasonFromDate } from "./seasonality.js";
import {
  addDays,
  clamp,
  deepClone,
  formatDate,
  round,
  safeInteger,
  toDateKey,
  unique
} from "./utils.js";

const DIFFICULTY_RANK = {
  easy: 1,
  medium: 2,
  hard: 3
};

const CHILD_WARNINGS = [
  {
    maxAge: 6,
    ingredientKeywords: ["mushroom", "mushrooms"],
    warningKey: "planner.warning.mushrooms"
  },
  {
    maxAge: 8,
    ingredientKeywords: ["mild chili", "chili"],
    warningKey: "planner.warning.chili"
  },
  {
    maxAge: 5,
    ingredientKeywords: ["walnut", "hazelnut", "almond", "peanut", "nuts"],
    warningKey: "planner.warning.nuts"
  }
];

const ALLOWED_CUISINES = new Set(CUISINE_OPTIONS.map((item) => item.value));
const ALLOWED_ALLERGIES = new Set(ALLERGY_OPTIONS.map((item) => item.value));
const ALLOWED_DIETS = new Set(DIET_OPTIONS.map((item) => item.value));
const ALLOWED_DIFFICULTIES = new Set(
  DIFFICULTY_OPTIONS.map((item) => item.value)
);
const ALLOWED_LANGUAGES = new Set(LANGUAGE_OPTIONS);

const FILTER_STAGES = [
  {
    id: "strict",
    reasonKey: null,
    options: {
      enforceCuisine: true,
      enforceDiet: true,
      enforceDifficulty: true,
      prepExtraMinutes: 0
    }
  },
  {
    id: "relaxed-cuisine",
    reasonKey: "planner.note.relaxedCuisine",
    options: {
      enforceCuisine: false,
      enforceDiet: true,
      enforceDifficulty: true,
      prepExtraMinutes: 0
    }
  },
  {
    id: "relaxed-time",
    reasonKey: "planner.note.relaxedTime",
    options: {
      enforceCuisine: false,
      enforceDiet: true,
      enforceDifficulty: true,
      prepExtraMinutes: 20
    }
  },
  {
    id: "relaxed-difficulty",
    reasonKey: "planner.note.relaxedDifficulty",
    options: {
      enforceCuisine: false,
      enforceDiet: true,
      enforceDifficulty: false,
      prepExtraMinutes: 20
    }
  },
  {
    id: "fallback",
    reasonKey: "planner.note.relaxedDiet",
    options: {
      enforceCuisine: false,
      enforceDiet: false,
      enforceDifficulty: false,
      prepExtraMinutes: 30
    }
  }
];

function parseChildrenAges(value) {
  if (Array.isArray(value)) {
    return value
      .map((age) => safeInteger(age, Number.NaN))
      .filter((age) => Number.isFinite(age) && age >= 0 && age <= 17);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((piece) => safeInteger(piece.trim(), Number.NaN))
      .filter((age) => Number.isFinite(age) && age >= 0 && age <= 17);
  }

  return [];
}

function sanitizeCuisines(value) {
  const list = Array.isArray(value) ? value : [];
  const sanitized = list.filter((item) => ALLOWED_CUISINES.has(item));
  return sanitized.length > 0 ? unique(sanitized) : [...DEFAULT_SETTINGS.cuisines];
}

function sanitizeAllergies(value) {
  const list = Array.isArray(value) ? value : [];
  return unique(list.filter((item) => ALLOWED_ALLERGIES.has(item)));
}

function normalizeMealPlanTemplate(value, shoppingIntervalDays) {
  const template = buildDefaultMealPlanTemplate(shoppingIntervalDays);
  const source = Array.isArray(value) ? value : [];

  source.forEach((rawDay, index) => {
    if (!rawDay || typeof rawDay !== "object") {
      return;
    }

    const dayIndex = safeInteger(rawDay.dayIndex, Number.NaN);
    const targetIndex = Number.isFinite(dayIndex) ? dayIndex : index;
    if (targetIndex < 0 || targetIndex >= template.length) {
      return;
    }

    template[targetIndex] = {
      lunch: rawDay.lunch !== false,
      dinner: rawDay.dinner !== false
    };
  });

  const hasAtLeastOneMeal = template.some((day) => day.lunch || day.dinner);
  if (!hasAtLeastOneMeal) {
    template[0] = { lunch: true, dinner: false };
  }

  return template;
}

export function sanitizeSettings(raw) {
  const base = cloneDefaultSettings();
  const source = raw ?? {};
  const language = ALLOWED_LANGUAGES.has(source.language)
    ? source.language
    : base.language;

  const shoppingIntervalDays = clamp(
    safeInteger(source.shoppingIntervalDays, base.shoppingIntervalDays),
    3,
    21
  );

  const shoppingDay = clamp(safeInteger(source.shoppingDay, base.shoppingDay), 0, 6);

  const budgetMin = clamp(safeInteger(source.budgetMin, base.budgetMin), 0, 10000);
  const budgetMaxCandidate = clamp(
    safeInteger(source.budgetMax, base.budgetMax),
    1,
    10000
  );
  const budgetMax = Math.max(budgetMin, budgetMaxCandidate);

  const maxPrepMinutes = clamp(
    safeInteger(source.maxPrepMinutes, base.maxPrepMinutes),
    15,
    180
  );

  const adults = clamp(safeInteger(source.adults, base.adults), 1, 8);

  const childrenAges = parseChildrenAges(
    source.childrenAges ?? source.childrenAgesInput ?? []
  );

  const dietProfile = ALLOWED_DIETS.has(source.dietProfile)
    ? source.dietProfile
    : base.dietProfile;

  const difficulty = ALLOWED_DIFFICULTIES.has(source.difficulty)
    ? source.difficulty
    : base.difficulty;

  const mealPlanTemplate = normalizeMealPlanTemplate(
    source.mealPlanTemplate ?? base.mealPlanTemplate,
    shoppingIntervalDays
  );

  return {
    language,
    shoppingIntervalDays,
    shoppingDay,
    budgetMin,
    budgetMax,
    cuisines: sanitizeCuisines(source.cuisines),
    dietProfile,
    difficulty,
    maxPrepMinutes,
    adults,
    childrenAges,
    allergies: sanitizeAllergies(source.allergies),
    mealPlanTemplate
  };
}

function tForSettings(settings, key, params = {}) {
  return translate(settings.language, key, params);
}

function computeTargetServings(settings) {
  const childServings = settings.childrenAges.reduce((sum, age) => {
    if (age <= 3) {
      return sum + 0.4;
    }
    if (age <= 7) {
      return sum + 0.6;
    }
    if (age <= 11) {
      return sum + 0.8;
    }
    return sum + 1;
  }, 0);
  return settings.adults + childServings;
}

function normalizeIngredientQuantity(quantity, unit) {
  if (unit === "pc" || unit === "slice" || unit === "leaf") {
    return Math.max(1, Math.round(quantity));
  }
  return round(quantity, 1);
}

function ingredientContainsAllergy(ingredientName, allergy) {
  const name = ingredientName.toLowerCase();

  switch (allergy) {
    case "nuts":
      return (
        name.includes("nut") ||
        name.includes("almond") ||
        name.includes("hazelnut") ||
        name.includes("peanut")
      );
    case "lactose":
      return (
        name.includes("milk") ||
        name.includes("ricotta") ||
        name.includes("mozzarella") ||
        name.includes("parmesan") ||
        name.includes("yogurt") ||
        name.includes("feta")
      );
    case "gluten":
      return (
        name.includes("pasta") ||
        name.includes("bread") ||
        name.includes("couscous") ||
        name.includes("farro") ||
        name.includes("barley") ||
        name.includes("orzo") ||
        name.includes("lasagna")
      );
    default:
      return false;
  }
}

function violatesAllergyRules(recipe, allergies) {
  return allergies.some((allergy) => {
    if (recipe.allergens.includes(allergy)) {
      return true;
    }
    return recipe.ingredients.some((ingredient) =>
      ingredientContainsAllergy(ingredient.name, allergy)
    );
  });
}

function recipeFitsDiet(recipe, dietProfile) {
  if (dietProfile === "balanced") {
    return true;
  }

  if (dietProfile === "vegetarian") {
    return recipe.dietTags.includes("vegetarian");
  }

  if (dietProfile === "high-protein") {
    return (
      recipe.dietTags.includes("high-protein") ||
      ["fish", "meat", "eggs", "legumes"].includes(recipe.nutritionFocus)
    );
  }

  if (dietProfile === "light") {
    return recipe.dietTags.includes("light") || recipe.prepMinutes <= 35;
  }

  return true;
}

function recipeMatchesStage(recipe, settings, slotMealType, stageOptions) {
  if (!recipe.mealMoments.includes(slotMealType)) {
    return false;
  }

  if (violatesAllergyRules(recipe, settings.allergies)) {
    return false;
  }

  if (
    stageOptions.enforceCuisine &&
    !settings.cuisines.includes(recipe.cuisine)
  ) {
    return false;
  }

  if (stageOptions.enforceDiet && !recipeFitsDiet(recipe, settings.dietProfile)) {
    return false;
  }

  if (
    stageOptions.enforceDifficulty &&
    DIFFICULTY_RANK[recipe.difficulty] > DIFFICULTY_RANK[settings.difficulty]
  ) {
    return false;
  }

  if (recipe.prepMinutes > settings.maxPrepMinutes + stageOptions.prepExtraMinutes) {
    return false;
  }

  return true;
}

function getCandidatesForSlot(settings, slotMealType, excludedRecipeIds = new Set()) {
  for (const stage of FILTER_STAGES) {
    const recipes = RECIPES.filter((recipe) =>
      !excludedRecipeIds.has(recipe.id) &&
      recipeMatchesStage(recipe, settings, slotMealType, stage.options)
    );

    if (recipes.length > 0) {
      return {
        recipes,
        reason: stage.reasonKey
          ? tForSettings(settings, stage.reasonKey)
          : null
      };
    }
  }

  return {
    recipes: RECIPES.filter(
      (recipe) =>
        !excludedRecipeIds.has(recipe.id) &&
        recipe.mealMoments.includes(slotMealType) &&
        !violatesAllergyRules(recipe, settings.allergies)
    ),
    reason: tForSettings(settings, "planner.note.strictFallback")
  };
}

function getRatingAverage(ratings, recipeId) {
  const entry = ratings[recipeId];
  if (!entry) {
    return 3;
  }
  return Number.isFinite(entry.average) ? entry.average : 3;
}

function scoreRecipe(recipe, context) {
  const {
    settings,
    ratings,
    recentRecipeIds,
    lastNutritionFocus,
    focusUsage,
    mealType
  } = context;

  let score = 50;

  if (settings.cuisines.includes(recipe.cuisine)) {
    score += 7;
  }

  const ratingAverage = getRatingAverage(ratings, recipe.id);
  score += (ratingAverage - 3) * 8;

  score += Math.max(0, settings.maxPrepMinutes - recipe.prepMinutes) / 4;

  if (DIFFICULTY_RANK[recipe.difficulty] <= DIFFICULTY_RANK[settings.difficulty]) {
    score += 5;
  }

  if (settings.dietProfile === "high-protein" && recipe.dietTags.includes("high-protein")) {
    score += 6;
  }

  if (settings.dietProfile === "light" && recipe.dietTags.includes("light")) {
    score += 6;
  }

  if (settings.dietProfile === "vegetarian" && recipe.dietTags.includes("vegetarian")) {
    score += 6;
  }

  if (mealType === "lunch" && recipe.prepMinutes <= 40) {
    score += 3;
  }

  if (recentRecipeIds.includes(recipe.id)) {
    score -= 12;
  }

  if (lastNutritionFocus === recipe.nutritionFocus) {
    score -= 5;
  }

  const focusCount = focusUsage[recipe.nutritionFocus] ?? 0;
  score -= focusCount * 1.4;

  score += Math.random() * 2.5;

  return score;
}

function evaluateChildWarnings(ingredients, childrenAges) {
  if (!childrenAges.length) {
    return [];
  }

  const warnings = [];

  for (const age of childrenAges) {
    for (const rule of CHILD_WARNINGS) {
      if (age > rule.maxAge) {
        continue;
      }

      const matchesRule = ingredients.some((ingredient) => {
        const name = ingredient.name.toLowerCase();
        return rule.ingredientKeywords.some((keyword) => name.includes(keyword));
      });

      if (matchesRule) {
        warnings.push({
          key: rule.warningKey,
          params: { age }
        });
      }
    }
  }

  const deduplicated = [];
  const seen = new Set();
  for (const warning of warnings) {
    const identity = `${warning.key}::${warning.params.age}`;
    if (seen.has(identity)) {
      continue;
    }
    seen.add(identity);
    deduplicated.push(warning);
  }
  return deduplicated;
}

function buildMeal(slot, recipe, settings, season) {
  const targetServings = computeTargetServings(settings);
  const factor = targetServings / recipe.baseServings;

  const scaledIngredients = recipe.ingredients.map((ingredient) => ({
    ...ingredient,
    quantity: normalizeIngredientQuantity(ingredient.quantity * factor, ingredient.unit)
  }));

  const { ingredients, notes } = adaptIngredientsToSeason(scaledIngredients, season);
  const childWarnings = evaluateChildWarnings(ingredients, settings.childrenAges);

  return {
    id: slot.id,
    date: slot.date,
    dateLabel: slot.dateLabel,
    mealType: slot.mealType,
    recipeId: recipe.id,
    recipeName: recipe.name,
    imageUrl: recipe.imageUrl,
    prepMinutes: recipe.prepMinutes,
    difficulty: recipe.difficulty,
    cuisine: recipe.cuisine,
    nutritionFocus: recipe.nutritionFocus,
    allergens: recipe.allergens,
    ingredients,
    steps: recipe.steps,
    seasonalityNotes: notes,
    childWarnings,
    estimatedCost: round(recipe.estimatedCost * factor, 2)
  };
}

function sortMealsBySlot(a, b) {
  if (a.date === b.date) {
    return MEAL_TYPES.indexOf(a.mealType) - MEAL_TYPES.indexOf(b.mealType);
  }
  return a.date.localeCompare(b.date);
}

function rebuildPlanDerivedFields(plan, settings) {
  const ingredientMap = new Map();
  let estimatedCost = 0;

  for (const meal of plan.meals) {
    estimatedCost += meal.estimatedCost;

    for (const ingredient of meal.ingredients) {
      const key = `${ingredient.name.toLowerCase()}::${ingredient.unit}`;
      const existing = ingredientMap.get(key);

      if (!existing) {
        ingredientMap.set(key, {
          name: ingredient.name,
          unit: ingredient.unit,
          quantity: ingredient.quantity
        });
      } else {
        existing.quantity = normalizeIngredientQuantity(
          existing.quantity + ingredient.quantity,
          ingredient.unit
        );
      }
    }
  }

  const shoppingList = [...ingredientMap.values()].sort((left, right) =>
    left.name.localeCompare(right.name)
  );

  const rangeMin = round(estimatedCost * 0.85, 0);
  const rangeMax = round(estimatedCost * 1.2, 0);

  const budgetOverlap =
    rangeMax >= settings.budgetMin && rangeMin <= settings.budgetMax;

  plan.shoppingList = shoppingList;
  plan.budget = {
    estimated: round(estimatedCost, 0),
    rangeMin,
    rangeMax,
    targetMin: settings.budgetMin,
    targetMax: settings.budgetMax,
    withinTarget: budgetOverlap
  };

  return plan;
}

export function buildMealSlots(settingsInput, now = new Date()) {
  const settings = sanitizeSettings(settingsInput);
  const start = getCycleStartDate(settings, now);
  const locale = getLocaleForLanguage(settings.language);
  const slots = [];

  for (let dayOffset = 0; dayOffset < settings.shoppingIntervalDays; dayOffset += 1) {
    const date = addDays(start, dayOffset);
    const dateKey = toDateKey(date);
    const dateLabel = formatDate(date, locale);
    const dayTemplate = settings.mealPlanTemplate[dayOffset] ?? {
      lunch: true,
      dinner: true
    };

    if (dayTemplate.lunch) {
      slots.push({
        id: `${dateKey}-lunch`,
        date: dateKey,
        dateLabel,
        mealType: "lunch"
      });
    }

    if (dayTemplate.dinner) {
      slots.push({
        id: `${dateKey}-dinner`,
        date: dateKey,
        dateLabel,
        mealType: "dinner"
      });
    }
  }

  return slots;
}

function computeNextShoppingDate(startDate, shoppingDay) {
  const next = new Date(startDate);
  const delta = (shoppingDay - next.getDay() + 7) % 7;
  next.setDate(next.getDate() + delta);
  return next;
}

function getCycleStartDate(settings, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return computeNextShoppingDate(today, settings.shoppingDay);
}

export function getShoppingCycleInfo(settingsInput, now = new Date()) {
  const settings = sanitizeSettings(settingsInput);
  const start = getCycleStartDate(settings, now);
  const end = addDays(start, settings.shoppingIntervalDays - 1);
  const nextShoppingDate = start;

  return {
    startDate: toDateKey(start),
    endDate: toDateKey(end),
    nextShoppingDate: toDateKey(nextShoppingDate)
  };
}

export function generatePlan(settingsInput, ratings = {}, now = new Date()) {
  const settings = sanitizeSettings(settingsInput);
  const slots = buildMealSlots(settings, now);
  const season = getSeasonFromDate(now);

  const recentRecipeIds = [];
  const focusUsage = {};
  const usedRecipeIds = new Set();
  const notes = [];
  let lastNutritionFocus = null;

  const meals = slots.map((slot) => {
    const { recipes, reason } = getCandidatesForSlot(
      settings,
      slot.mealType,
      usedRecipeIds
    );

    if (recipes.length === 0) {
      throw new Error("planner.error.notEnoughUniqueMeals");
    }

    if (reason) {
      notes.push(reason);
    }

    const scored = recipes
      .map((recipe) => ({
        recipe,
        score: scoreRecipe(recipe, {
          settings,
          ratings,
          recentRecipeIds,
          lastNutritionFocus,
          focusUsage,
          mealType: slot.mealType
        })
      }))
      .sort((left, right) => right.score - left.score);

    const selected = scored[0].recipe;
    const meal = buildMeal(slot, selected, settings, season);

    usedRecipeIds.add(selected.id);
    recentRecipeIds.push(selected.id);
    if (recentRecipeIds.length > 6) {
      recentRecipeIds.shift();
    }
    focusUsage[selected.nutritionFocus] = (focusUsage[selected.nutritionFocus] ?? 0) + 1;
    lastNutritionFocus = selected.nutritionFocus;

    return meal;
  });

  const cycleInfo = getShoppingCycleInfo(settings, now);
  const plan = {
    generatedAt: new Date().toISOString(),
    season,
    windowStart: cycleInfo.startDate,
    windowEnd: cycleInfo.endDate,
    nextShoppingDate: cycleInfo.nextShoppingDate,
    notes: unique(notes),
    meals: meals.sort(sortMealsBySlot)
  };

  return rebuildPlanDerivedFields(plan, settings);
}

function getPlanSequenceContext(orderedMeals, targetMealIndex) {
  const targetMeal = orderedMeals[targetMealIndex];
  const previousMeal = orderedMeals[targetMealIndex - 1];

  const recentRecipeIds = orderedMeals
    .slice(Math.max(0, targetMealIndex - 5), targetMealIndex)
    .map((meal) => meal.recipeId);

  const focusUsage = {};
  for (const meal of orderedMeals) {
    if (meal.id === targetMeal.id) {
      continue;
    }
    focusUsage[meal.nutritionFocus] = (focusUsage[meal.nutritionFocus] ?? 0) + 1;
  }

  return {
    recentRecipeIds,
    lastNutritionFocus: previousMeal?.nutritionFocus ?? null,
    focusUsage
  };
}

export function swapMealInPlan(planInput, mealId, settingsInput, ratings = {}) {
  const settings = sanitizeSettings(settingsInput);
  const plan = deepClone(planInput);
  const orderedMeals = [...plan.meals].sort(sortMealsBySlot);
  const targetMealIndex = orderedMeals.findIndex((meal) => meal.id === mealId);

  if (targetMealIndex < 0) {
    throw new Error(tForSettings(settings, "planner.error.mealMissing"));
  }

  const targetMeal = orderedMeals[targetMealIndex];
  const existingRecipeIds = new Set(plan.meals.map((meal) => meal.recipeId));
  existingRecipeIds.delete(targetMeal.recipeId);
  const { recipes, reason } = getCandidatesForSlot(
    settings,
    targetMeal.mealType,
    existingRecipeIds
  );

  const candidates = recipes.filter((recipe) => recipe.id !== targetMeal.recipeId);

  if (candidates.length === 0) {
    throw new Error(tForSettings(settings, "planner.error.noAlternative"));
  }

  const sequenceContext = getPlanSequenceContext(orderedMeals, targetMealIndex);
  const scored = candidates
    .map((recipe) => ({
      recipe,
      score: scoreRecipe(recipe, {
        settings,
        ratings,
        mealType: targetMeal.mealType,
        ...sequenceContext
      })
    }))
    .sort((left, right) => right.score - left.score);

  const selected = scored[0].recipe;
  const season = plan.season ?? getSeasonFromDate(new Date(plan.generatedAt));

  const rebuiltMeal = buildMeal(
    {
      id: targetMeal.id,
      date: targetMeal.date,
      dateLabel: targetMeal.dateLabel,
      mealType: targetMeal.mealType
    },
    selected,
    settings,
    season
  );

  plan.meals = plan.meals.map((meal) => (meal.id === mealId ? rebuiltMeal : meal));
  plan.generatedAt = new Date().toISOString();
  plan.notes = unique([...(plan.notes ?? []), reason].filter(Boolean));

  return rebuildPlanDerivedFields(plan, settings);
}
