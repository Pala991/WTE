const RECIPE_NAME_TRANSLATIONS = {
  it: {
    "italian-chickpea-pasta": "Pasta ceci e rosmarino",
    "baked-salmon-zucchini": "Salmone al forno con zucchine",
    "turkey-meatballs-peas": "Polpette di tacchino con piselli",
    "lentil-stew-barley": "Zuppa di lenticchie e orzo",
    "mushroom-risotto": "Risotto ai funghi",
    "tomato-basil-gnocchi": "Gnocchi al pomodoro e basilico",
    "spinach-ricotta-frittata": "Frittata ricotta e spinaci",
    "mediterranean-couscous": "Bowl mediterranea di couscous",
    "chicken-vegetable-wok": "Wok di pollo e verdure",
    "tofu-teriyaki-rice": "Tofu teriyaki con riso",
    "bean-tuna-salad": "Insalata di fagioli e tonno",
    "pumpkin-sage-soup": "Vellutata di zucca e salvia",
    "shrimp-zucchini-orzo": "Pasta orzo con gamberi e zucchine",
    "eggplant-lentil-lasagna": "Lasagna di melanzane e lenticchie",
    "beef-fajita-bowls": "Bowl fajita di manzo",
    "pea-mint-farro": "Farro con piselli e menta",
    "cod-tomato-olives": "Merluzzo con pomodori e olive",
    "quinoa-roasted-vegetables": "Quinoa con verdure arrosto",
    "asparagus-egg-toast": "Toast con asparagi e uova morbide",
    "chili-bean-rice": "Riso con fagioli al chili dolce"
  }
};

const INGREDIENT_NAME_TRANSLATIONS = {
  it: {
    "Whole wheat pasta": "Pasta integrale",
    "Cooked chickpeas": "Ceci cotti",
    Garlic: "Aglio",
    Tomato: "Pomodoro",
    Rosemary: "Rosmarino",
    "Extra virgin olive oil": "Olio extravergine d'oliva",
    "Salmon fillet": "Filetto di salmone",
    Zucchini: "Zucchine",
    Lemon: "Limone",
    "Dried oregano": "Origano secco",
    "Ground turkey": "Macinato di tacchino",
    Egg: "Uovo",
    Breadcrumbs: "Pangrattato",
    Peas: "Piselli",
    Onion: "Cipolla",
    "Tomato passata": "Passata di pomodoro",
    "Dried lentils": "Lenticchie secche",
    "Pearl barley": "Orzo perlato",
    Carrot: "Carota",
    "Celery stalk": "Costa di sedano",
    "Vegetable broth": "Brodo vegetale",
    "Arborio rice": "Riso arborio",
    Mushrooms: "Funghi",
    Parmesan: "Parmigiano",
    "Potato gnocchi": "Gnocchi di patate",
    Basil: "Basilico",
    Ricotta: "Ricotta",
    Spinach: "Spinaci",
    "Whole couscous": "Couscous integrale",
    Cucumber: "Cetriolo",
    Feta: "Feta",
    "Chicken breast": "Petto di pollo",
    "Bell pepper": "Peperone",
    "Soy sauce": "Salsa di soia",
    "Brown rice": "Riso integrale",
    "Firm tofu": "Tofu compatto",
    Rice: "Riso",
    Broccoli: "Broccoli",
    Honey: "Miele",
    "Cannellini beans": "Fagioli cannellini",
    "Tuna in olive oil": "Tonno in olio d'oliva",
    "Red onion": "Cipolla rossa",
    Parsley: "Prezzemolo",
    Pumpkin: "Zucca",
    Potato: "Patata",
    Sage: "Salvia",
    Shrimp: "Gamberi",
    "Orzo pasta": "Pasta orzo",
    "Lasagna sheets": "Sfoglie per lasagna",
    "Cooked lentils": "Lenticchie cotte",
    Eggplant: "Melanzana",
    Mozzarella: "Mozzarella",
    "Beef strips": "Straccetti di manzo",
    "Black beans": "Fagioli neri",
    "Mild chili": "Peperoncino dolce",
    Farro: "Farro",
    Mint: "Menta",
    "Cod fillet": "Filetto di merluzzo",
    "Black olives": "Olive nere",
    Capers: "Capperi",
    Quinoa: "Quinoa",
    Chickpeas: "Ceci",
    Tahini: "Tahina",
    Asparagus: "Asparagi",
    "Whole grain bread": "Pane integrale",
    "Greek yogurt": "Yogurt greco",
    "Kidney beans": "Fagioli rossi",
    Corn: "Mais",
    "Tomato passata (canned)": "Passata di pomodoro (in barattolo)",
    "Dried basil": "Basilico secco",
    "Frozen eggplant cubes": "Melanzane surgelate a cubetti",
    "Frozen peas": "Piselli surgelati",
    "Green beans": "Fagiolini"
  }
};

const NOTE_TRANSLATIONS = {
  it: {
    "Fresh tomatoes are off-season in winter, preserved tomato is used.":
      "I pomodori freschi sono fuori stagione in inverno, viene usata la passata.",
    "Fresh basil is less reliable in winter, dried basil is suggested.":
      "Il basilico fresco è meno affidabile in inverno, si consiglia quello secco.",
    "Eggplant is less seasonal in winter, frozen alternatives are suggested.":
      "La melanzana è meno stagionale in inverno, si suggerisce la versione surgelata.",
    "Eggplant quality can vary in early spring, frozen alternatives are suggested.":
      "La qualità della melanzana può variare a inizio primavera, si suggerisce la versione surgelata.",
    "Peas are usually purchased frozen in winter.":
      "In inverno i piselli si acquistano di solito surgelati.",
    "Asparagus is mostly spring-seasonal, green beans are suggested.":
      "Gli asparagi sono soprattutto primaverili, si suggeriscono i fagiolini."
  }
};

const RECIPE_FRAGMENT_TRANSLATIONS = {
  it: {
    Traybake: "Teglia",
    Skillet: "Padellata",
    Baked: "Al forno",
    Bowl: "Bowl",
    Stew: "Stufato",
    Pilaf: "Pilaf",
    " with ": " con ",
    " and ": " e "
  }
};

function localizeFromDictionary(dictionary, language, key, fallback) {
  if (!key) {
    return fallback;
  }

  const localizedValue = dictionary[language]?.[key];
  return localizedValue ?? fallback;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceWithDictionary(text, dictionary) {
  let next = text;
  const entries = Object.entries(dictionary).sort(
    (left, right) => right[0].length - left[0].length
  );

  for (const [source, replacement] of entries) {
    next = next.replace(new RegExp(escapeRegExp(source), "g"), replacement);
  }

  return next;
}

function localizeGeneratedRecipeName(fallbackName, language) {
  if (typeof fallbackName !== "string" || language !== "it") {
    return fallbackName;
  }

  let localized = fallbackName;
  localized = replaceWithDictionary(
    localized,
    RECIPE_FRAGMENT_TRANSLATIONS.it
  );
  localized = replaceWithDictionary(
    localized,
    INGREDIENT_NAME_TRANSLATIONS.it
  );

  return localized;
}

export function localizeRecipeName(recipeId, fallbackName, language) {
  const localizedName = localizeFromDictionary(
    RECIPE_NAME_TRANSLATIONS,
    language,
    recipeId,
    fallbackName
  );

  if (localizedName !== fallbackName) {
    return localizedName;
  }

  return localizeGeneratedRecipeName(fallbackName, language);
}

export function localizeIngredientName(name, language) {
  return localizeFromDictionary(
    INGREDIENT_NAME_TRANSLATIONS,
    language,
    name,
    name
  );
}

export function localizeSeasonalityNote(note, language) {
  return localizeFromDictionary(NOTE_TRANSLATIONS, language, note, note);
}
