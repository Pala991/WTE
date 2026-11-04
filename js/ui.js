import {
  ALLERGY_OPTIONS,
  CUISINE_OPTIONS,
  DIET_OPTIONS,
  DIFFICULTY_OPTIONS,
  LANGUAGE_OPTIONS,
  WEEKDAY_OPTIONS
} from "./constants.js";
import {
  localizeIngredientName,
  localizeRecipeName,
  localizeSeasonalityNote
} from "./content-localization.js";
import { createTranslator } from "./i18n.js";
import { formatDate, formatDateTime, formatEuro, round } from "./utils.js";

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function createOptionElement(value, label) {
  const option = document.createElement("option");
  option.value = String(value);
  option.textContent = label;
  return option;
}

function createChipOption(name, value, label) {
  const wrapper = document.createElement("label");
  wrapper.className = "chip-option";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.name = name;
  input.value = value;

  const text = document.createElement("span");
  text.textContent = label;

  wrapper.append(input, text);
  return wrapper;
}

function resolveTranslator(i18n) {
  return i18n ?? createTranslator("en");
}

export function initializeSettingsFormOptions(elements, i18n) {
  const translator = resolveTranslator(i18n);
  const { t } = translator;

  clearElement(elements.languageSelect);
  for (const language of LANGUAGE_OPTIONS) {
    elements.languageSelect.append(
      createOptionElement(language, t(`option.language.${language}`))
    );
  }

  clearElement(elements.shoppingDaySelect);
  for (const day of WEEKDAY_OPTIONS) {
    elements.shoppingDaySelect.append(
      createOptionElement(day.value, t(`option.weekday.${day.value}`))
    );
  }

  clearElement(elements.dietProfileSelect);
  for (const option of DIET_OPTIONS) {
    elements.dietProfileSelect.append(
      createOptionElement(option.value, t(`option.diet.${option.value}`))
    );
  }

  clearElement(elements.difficultySelect);
  for (const option of DIFFICULTY_OPTIONS) {
    elements.difficultySelect.append(
      createOptionElement(option.value, t(`option.difficulty.${option.value}`))
    );
  }

  clearElement(elements.cuisineOptions);
  for (const cuisine of CUISINE_OPTIONS) {
    elements.cuisineOptions.append(
      createChipOption(
        "cuisines",
        cuisine.value,
        t(`option.cuisine.${cuisine.value}`)
      )
    );
  }

  clearElement(elements.allergyOptions);
  for (const allergy of ALLERGY_OPTIONS) {
    elements.allergyOptions.append(
      createChipOption(
        "allergies",
        allergy.value,
        t(`option.allergy.${allergy.value}`)
      )
    );
  }
}

export function setSystemMessage(messageElement, type, text) {
  if (!text) {
    messageElement.textContent = "";
    messageElement.className = "message hidden";
    return;
  }

  const safeType = ["success", "warning", "error"].includes(type)
    ? type
    : "warning";

  messageElement.textContent = text;
  messageElement.className = `message ${safeType}`;
}

export function populateSettingsForm(form, settings) {
  form.elements.language.value = settings.language;
  form.elements.shoppingIntervalDays.value = String(settings.shoppingIntervalDays);
  form.elements.shoppingDay.value = String(settings.shoppingDay);
  form.elements.budgetMin.value = String(settings.budgetMin);
  form.elements.budgetMax.value = String(settings.budgetMax);
  form.elements.dietProfile.value = settings.dietProfile;
  form.elements.difficulty.value = settings.difficulty;
  form.elements.maxPrepMinutes.value = String(settings.maxPrepMinutes);
  form.elements.adults.value = String(settings.adults);
  form.elements.childrenAgesInput.value = settings.childrenAges.join(", ");

  const cuisineInputs = form.querySelectorAll('input[name="cuisines"]');
  for (const input of cuisineInputs) {
    input.checked = settings.cuisines.includes(input.value);
  }

  const allergyInputs = form.querySelectorAll('input[name="allergies"]');
  for (const input of allergyInputs) {
    input.checked = settings.allergies.includes(input.value);
  }
}

export function readSettingsFromForm(form) {
  const cuisines = [...form.querySelectorAll('input[name="cuisines"]:checked')].map(
    (input) => input.value
  );
  const allergies = [...form.querySelectorAll('input[name="allergies"]:checked')].map(
    (input) => input.value
  );
  const mealPlanTemplate = [
    ...form.querySelectorAll("[data-template-day-index]")
  ].map((row) => {
    const dayIndex = Number.parseInt(row.dataset.templateDayIndex ?? "", 10);
    const lunch = row.querySelector('[data-template-meal="lunch"]');
    const dinner = row.querySelector('[data-template-meal="dinner"]');

    return {
      dayIndex,
      lunch: lunch?.checked ?? false,
      dinner: dinner?.checked ?? false
    };
  });

  mealPlanTemplate.sort((left, right) => left.dayIndex - right.dayIndex);

  return {
    language: form.elements.language.value,
    shoppingIntervalDays: form.elements.shoppingIntervalDays.value,
    shoppingDay: form.elements.shoppingDay.value,
    budgetMin: form.elements.budgetMin.value,
    budgetMax: form.elements.budgetMax.value,
    cuisines,
    dietProfile: form.elements.dietProfile.value,
    difficulty: form.elements.difficulty.value,
    maxPrepMinutes: form.elements.maxPrepMinutes.value,
    adults: form.elements.adults.value,
    childrenAgesInput: form.elements.childrenAgesInput.value,
    allergies,
    mealPlanTemplate
  };
}

export function renderMealPlanTemplate(container, settings, i18n) {
  clearElement(container);
  const translator = resolveTranslator(i18n);
  const { t } = translator;

  const table = document.createElement("table");
  table.className = "schedule-table";

  const header = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const dayHeader = document.createElement("th");
  dayHeader.scope = "col";
  dayHeader.textContent = t("settings.schedule.header.day");
  headerRow.append(dayHeader);

  const lunchHeader = document.createElement("th");
  lunchHeader.scope = "col";
  lunchHeader.textContent = t("settings.schedule.header.lunch");
  headerRow.append(lunchHeader);

  const dinnerHeader = document.createElement("th");
  dinnerHeader.scope = "col";
  dinnerHeader.textContent = t("settings.schedule.header.dinner");
  headerRow.append(dinnerHeader);

  header.append(headerRow);
  table.append(header);

  const body = document.createElement("tbody");
  for (let dayIndex = 0; dayIndex < settings.shoppingIntervalDays; dayIndex += 1) {
    const dayTemplate = settings.mealPlanTemplate[dayIndex] ?? {
      lunch: true,
      dinner: true
    };
    const weekdayNumber = (settings.shoppingDay + dayIndex) % 7;

    const row = document.createElement("tr");
    row.dataset.templateDayIndex = String(dayIndex);

    const dayCell = document.createElement("td");
    dayCell.textContent = t("settings.schedule.dayLabel", {
      index: dayIndex + 1,
      day: t(`option.weekday.${weekdayNumber}`)
    });
    row.append(dayCell);

    const lunchCell = document.createElement("td");
    const lunchCheckbox = document.createElement("input");
    lunchCheckbox.type = "checkbox";
    lunchCheckbox.dataset.templateMeal = "lunch";
    lunchCheckbox.checked = dayTemplate.lunch !== false;
    lunchCheckbox.setAttribute(
      "aria-label",
      t("settings.schedule.toggleLabel", {
        meal: t("preview.meal.lunch"),
        day: t(`option.weekday.${weekdayNumber}`)
      })
    );
    lunchCell.append(lunchCheckbox);
    row.append(lunchCell);

    const dinnerCell = document.createElement("td");
    const dinnerCheckbox = document.createElement("input");
    dinnerCheckbox.type = "checkbox";
    dinnerCheckbox.dataset.templateMeal = "dinner";
    dinnerCheckbox.checked = dayTemplate.dinner !== false;
    dinnerCheckbox.setAttribute(
      "aria-label",
      t("settings.schedule.toggleLabel", {
        meal: t("preview.meal.dinner"),
        day: t(`option.weekday.${weekdayNumber}`)
      })
    );
    dinnerCell.append(dinnerCheckbox);
    row.append(dinnerCell);

    body.append(row);
  }

  table.append(body);
  container.append(table);
}

export function renderPreview(
  previewListElement,
  slots,
  i18n,
  recipeBySlotId = new Map()
) {
  clearElement(previewListElement);
  const translator = resolveTranslator(i18n);
  const { t } = translator;

  for (const slot of slots) {
    const item = document.createElement("li");
    const label = t(`preview.meal.${slot.mealType}`);
    const plannedMeal = recipeBySlotId.get(slot.id);
    const plannedRecipe = plannedMeal
      ? localizeRecipeName(
          plannedMeal.recipeId,
          plannedMeal.recipeName,
          translator.language
        )
      : null;
    item.textContent = plannedRecipe
      ? t("preview.item.withRecipe", {
          date: slot.dateLabel,
          meal: label,
          recipe: plannedRecipe
        })
      : t("preview.item.noRecipe", {
          date: slot.dateLabel,
          meal: label
        });
    previewListElement.append(item);
  }
}

function ingredientToText(ingredient, language) {
  const localizedName = localizeIngredientName(ingredient.name, language);
  return `${ingredient.quantity} ${ingredient.unit} ${localizedName}`;
}

export function renderShoppingList(summaryElement, listElement, plan, i18n) {
  clearElement(summaryElement);
  clearElement(listElement);
  const translator = resolveTranslator(i18n);
  const { t, locale } = translator;

  if (!plan) {
    const text = document.createElement("p");
    text.className = "muted";
    text.textContent = t("shopping.empty");
    summaryElement.append(text);
    return;
  }

  const budgetText = document.createElement("p");
  budgetText.textContent = t("shopping.estimated", {
    estimated: formatEuro(plan.budget.estimated, locale),
    min: formatEuro(plan.budget.rangeMin, locale),
    max: formatEuro(plan.budget.rangeMax, locale)
  });
  summaryElement.append(budgetText);

  const targetText = document.createElement("p");
  targetText.textContent = t("shopping.target", {
    min: formatEuro(plan.budget.targetMin, locale),
    max: formatEuro(plan.budget.targetMax, locale),
    position: t(
      plan.budget.withinTarget
        ? "shopping.target.inside"
        : "shopping.target.outside"
    )
  });
  summaryElement.append(targetText);

  if (plan.notes?.length) {
    const noteBlock = document.createElement("div");
    noteBlock.className = "notes";
    noteBlock.textContent = plan.notes
      .map((note) => localizeSeasonalityNote(note, translator.language))
      .join(" ");
    summaryElement.append(noteBlock);
  }

  for (const item of plan.shoppingList) {
    const li = document.createElement("li");
    li.textContent = ingredientToText(item, translator.language);
    listElement.append(li);
  }
}

function appendListSection(container, title, values) {
  const sectionTitle = document.createElement("h4");
  sectionTitle.textContent = title;
  container.append(sectionTitle);

  const list = document.createElement("ul");
  list.className = "list";
  for (const value of values) {
    const item = document.createElement("li");
    item.textContent = value;
    list.append(item);
  }
  container.append(list);
}

function getCurrentRecipeRating(ratings, recipeId) {
  const entry = ratings[recipeId];
  if (!entry) {
    return null;
  }

  return {
    average: round(entry.average, 1),
    count: entry.count
  };
}

function createRatingButtons(currentAverage) {
  const row = document.createElement("div");
  row.className = "rating-row";

  const selected = currentAverage ? Math.round(currentAverage) : 0;

  for (let value = 1; value <= 5; value += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `rating-button${value === selected ? " active" : ""}`;
    button.dataset.action = "rate";
    button.dataset.rating = String(value);
    button.textContent = `${value}★`;
    row.append(button);
  }

  return row;
}

function warningToText(warning, i18n) {
  if (typeof warning === "string") {
    return warning;
  }

  if (!warning || typeof warning !== "object" || !warning.key) {
    return "";
  }

  return i18n.t(warning.key, warning.params ?? {});
}

export function renderMeals(container, plan, ratings, i18n) {
  clearElement(container);
  const translator = resolveTranslator(i18n);
  const { t, locale } = translator;

  if (!plan) {
    const text = document.createElement("p");
    text.className = "muted";
    text.textContent = t("meal.empty");
    container.append(text);
    return;
  }

  for (const meal of plan.meals) {
    const localizedRecipeName = localizeRecipeName(
      meal.recipeId,
      meal.recipeName,
      translator.language
    );
    const card = document.createElement("article");
    card.className = "meal-card";
    card.dataset.mealId = meal.id;

    const image = document.createElement("img");
    image.src = meal.imageUrl;
    image.alt = localizedRecipeName;
    image.loading = "lazy";
    card.append(image);

    const content = document.createElement("div");
    content.className = "content";

    const mealMeta = document.createElement("p");
    mealMeta.className = "meal-meta";
    mealMeta.textContent = `${formatDate(meal.date, locale)} - ${t(
      `preview.meal.${meal.mealType}`
    )}`;
    content.append(mealMeta);

    const title = document.createElement("h3");
    title.textContent = localizedRecipeName;
    content.append(title);

    const details = document.createElement("p");
    details.className = "meal-meta";
    details.textContent = t("meal.meta", {
      minutes: meal.prepMinutes,
      difficulty: t(`option.difficulty.${meal.difficulty}`),
      cuisine: t(`option.cuisine.${meal.cuisine}`)
    });
    content.append(details);

    const tags = document.createElement("div");
    tags.className = "tag-list";

    const focusTag = document.createElement("span");
    focusTag.className = "tag";
    focusTag.textContent = t(`option.nutritionFocus.${meal.nutritionFocus}`);
    tags.append(focusTag);

    for (const allergen of meal.allergens) {
      const allergenTag = document.createElement("span");
      allergenTag.className = "tag";
      allergenTag.textContent = t("meal.allergenTag", {
        allergen: t(`option.allergy.${allergen}`)
      });
      tags.append(allergenTag);
    }
    content.append(tags);

    const swapButton = document.createElement("button");
    swapButton.type = "button";
    swapButton.dataset.action = "swap";
    swapButton.textContent = t("meal.button.swap");
    content.append(swapButton);

    appendListSection(
      content,
      t("meal.section.ingredients"),
      meal.ingredients.map((ingredient) =>
        ingredientToText(ingredient, translator.language)
      )
    );
    appendListSection(content, t("meal.section.steps"), meal.steps);

    if (meal.seasonalityNotes.length > 0) {
      const seasonalNotes = document.createElement("div");
      seasonalNotes.className = "notes";
      seasonalNotes.textContent = meal.seasonalityNotes
        .map((note) => localizeSeasonalityNote(note, translator.language))
        .join(" ");
      content.append(seasonalNotes);
    }

    if (meal.childWarnings.length > 0) {
      const warningNotes = document.createElement("div");
      warningNotes.className = "notes";
      warningNotes.textContent = meal.childWarnings
        .map((warning) => warningToText(warning, translator))
        .filter(Boolean)
        .join(" ");
      content.append(warningNotes);
    }

    const rating = getCurrentRecipeRating(ratings, meal.recipeId);
    const ratingInfo = document.createElement("p");
    ratingInfo.className = "meal-meta";
    ratingInfo.textContent = rating
      ? t("meal.rating.average", {
          average: rating.average,
          count: rating.count
        })
      : t("meal.rating.none");
    content.append(ratingInfo);

    content.append(createRatingButtons(rating?.average ?? null));
    card.append(content);
    container.append(card);
  }
}

export function renderHistory(historyListElement, historyEntries, i18n) {
  clearElement(historyListElement);
  const translator = resolveTranslator(i18n);
  const { t, locale } = translator;

  if (!historyEntries.length) {
    const item = document.createElement("li");
    item.textContent = t("history.empty");
    historyListElement.append(item);
    return;
  }

  for (const entry of historyEntries) {
    const wrapper = document.createElement("li");
    wrapper.className = "history-row";

    const title = document.createElement("strong");
    title.textContent = t("history.item.title", {
      dateTime: formatDateTime(entry.createdAt, locale),
      count: entry.plan.meals.length
    });
    wrapper.append(title);

    const meta = document.createElement("span");
    meta.className = "history-meta";
    meta.textContent = t("history.item.meta", {
      start: formatDate(entry.plan.windowStart, locale),
      end: formatDate(entry.plan.windowEnd, locale),
      budget: formatEuro(entry.plan.budget.estimated, locale)
    });
    wrapper.append(meta);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "ghost";
    button.dataset.action = "load-history";
    button.dataset.historyId = entry.id;
    button.textContent = t("history.button.load");
    wrapper.append(button);

    historyListElement.append(wrapper);
  }
}
