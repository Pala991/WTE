const image = () => "./assets/recipe-placeholder.svg";

const CORE_RECIPES = [
  {
    id: "italian-chickpea-pasta",
    name: "Chickpea Pasta with Rosemary",
    cuisine: "italian",
    mealMoments: ["lunch", "dinner"],
    difficulty: "easy",
    prepMinutes: 35,
    baseServings: 2,
    estimatedCost: 8,
    nutritionFocus: "legumes",
    dietTags: ["balanced", "vegetarian", "light"],
    allergens: ["gluten"],
    imageUrl: image("chickpea pasta"),
    ingredients: [
      { name: "Whole wheat pasta", quantity: 180, unit: "g" },
      { name: "Cooked chickpeas", quantity: 220, unit: "g" },
      { name: "Garlic", quantity: 1, unit: "pc" },
      { name: "Tomato", quantity: 250, unit: "g", seasonalKey: "tomato" },
      { name: "Rosemary", quantity: 1, unit: "tbsp" },
      { name: "Extra virgin olive oil", quantity: 2, unit: "tbsp" }
    ],
    steps: [
      "Cook the pasta in salted water.",
      "Saute garlic and rosemary in olive oil.",
      "Add tomato and chickpeas, then simmer for 10 minutes.",
      "Combine with pasta and season before serving."
    ]
  },
  {
    id: "baked-salmon-zucchini",
    name: "Baked Salmon with Zucchini",
    cuisine: "mediterranean",
    mealMoments: ["lunch", "dinner"],
    difficulty: "easy",
    prepMinutes: 30,
    baseServings: 2,
    estimatedCost: 14,
    nutritionFocus: "fish",
    dietTags: ["balanced", "high-protein", "light"],
    allergens: ["fish"],
    imageUrl: image("baked salmon zucchini"),
    ingredients: [
      { name: "Salmon fillet", quantity: 320, unit: "g" },
      { name: "Zucchini", quantity: 350, unit: "g", seasonalKey: "zucchini" },
      { name: "Lemon", quantity: 1, unit: "pc" },
      { name: "Dried oregano", quantity: 1, unit: "tsp" },
      { name: "Extra virgin olive oil", quantity: 2, unit: "tbsp" }
    ],
    steps: [
      "Slice zucchini and place them on a tray with olive oil and oregano.",
      "Add salmon, lemon juice and a pinch of salt.",
      "Bake at 190 C for 18 to 20 minutes.",
      "Serve with extra lemon zest."
    ]
  },
  {
    id: "turkey-meatballs-peas",
    name: "Turkey Meatballs with Peas",
    cuisine: "italian",
    mealMoments: ["lunch", "dinner"],
    difficulty: "medium",
    prepMinutes: 45,
    baseServings: 2,
    estimatedCost: 10,
    nutritionFocus: "meat",
    dietTags: ["balanced", "high-protein"],
    allergens: ["eggs"],
    imageUrl: image("turkey meatballs peas"),
    ingredients: [
      { name: "Ground turkey", quantity: 300, unit: "g" },
      { name: "Egg", quantity: 1, unit: "pc" },
      { name: "Breadcrumbs", quantity: 40, unit: "g", seasonalKey: null },
      { name: "Peas", quantity: 250, unit: "g", seasonalKey: "peas" },
      { name: "Onion", quantity: 1, unit: "pc" },
      { name: "Tomato passata", quantity: 200, unit: "ml" }
    ],
    steps: [
      "Mix turkey, egg and breadcrumbs, then shape small meatballs.",
      "Brown meatballs in a pan with olive oil.",
      "Add onion, passata and peas, then simmer 20 minutes.",
      "Adjust salt and serve."
    ]
  },
  {
    id: "lentil-stew-barley",
    name: "Lentil and Barley Stew",
    cuisine: "comfort",
    mealMoments: ["lunch", "dinner"],
    difficulty: "easy",
    prepMinutes: 55,
    baseServings: 2,
    estimatedCost: 7,
    nutritionFocus: "legumes",
    dietTags: ["balanced", "vegetarian"],
    allergens: ["gluten"],
    imageUrl: image("lentil barley soup"),
    ingredients: [
      { name: "Dried lentils", quantity: 180, unit: "g" },
      { name: "Pearl barley", quantity: 120, unit: "g" },
      { name: "Carrot", quantity: 2, unit: "pc" },
      { name: "Celery stalk", quantity: 2, unit: "pc" },
      { name: "Tomato", quantity: 220, unit: "g", seasonalKey: "tomato" },
      { name: "Vegetable broth", quantity: 750, unit: "ml" }
    ],
    steps: [
      "Saute diced carrot and celery in olive oil.",
      "Add lentils, barley and tomato.",
      "Cover with broth and simmer for 40 minutes.",
      "Serve warm with black pepper."
    ]
  },
  {
    id: "mushroom-risotto",
    name: "Mushroom Risotto",
    cuisine: "italian",
    mealMoments: ["lunch", "dinner"],
    difficulty: "medium",
    prepMinutes: 50,
    baseServings: 2,
    estimatedCost: 9,
    nutritionFocus: "whole-grains",
    dietTags: ["balanced", "vegetarian"],
    allergens: ["lactose"],
    imageUrl: image("mushroom risotto"),
    ingredients: [
      { name: "Arborio rice", quantity: 180, unit: "g" },
      { name: "Mushrooms", quantity: 250, unit: "g" },
      { name: "Parmesan", quantity: 50, unit: "g" },
      { name: "Onion", quantity: 1, unit: "pc" },
      { name: "Vegetable broth", quantity: 700, unit: "ml" }
    ],
    steps: [
      "Saute onion and mushrooms in olive oil.",
      "Toast rice for 2 minutes.",
      "Add broth gradually and stir until rice is creamy.",
      "Finish with parmesan off heat."
    ]
  },
  {
    id: "tomato-basil-gnocchi",
    name: "Gnocchi with Tomato and Basil",
    cuisine: "italian",
    mealMoments: ["lunch", "dinner"],
    difficulty: "easy",
    prepMinutes: 25,
    baseServings: 2,
    estimatedCost: 7,
    nutritionFocus: "carbs",
    dietTags: ["balanced", "vegetarian"],
    allergens: ["gluten"],
    imageUrl: image("gnocchi tomato basil"),
    ingredients: [
      { name: "Potato gnocchi", quantity: 500, unit: "g" },
      { name: "Tomato", quantity: 350, unit: "g", seasonalKey: "tomato" },
      { name: "Basil", quantity: 8, unit: "leaf", seasonalKey: "basil" },
      { name: "Garlic", quantity: 1, unit: "pc" },
      { name: "Extra virgin olive oil", quantity: 2, unit: "tbsp" }
    ],
    steps: [
      "Cook gnocchi in boiling salted water until they float.",
      "Cook garlic and tomato in olive oil for 10 minutes.",
      "Add basil and toss gnocchi with sauce.",
      "Serve immediately."
    ]
  },
  {
    id: "spinach-ricotta-frittata",
    name: "Spinach Ricotta Frittata",
    cuisine: "italian",
    mealMoments: ["lunch", "dinner"],
    difficulty: "easy",
    prepMinutes: 30,
    baseServings: 2,
    estimatedCost: 6,
    nutritionFocus: "eggs",
    dietTags: ["balanced", "vegetarian", "high-protein"],
    allergens: ["eggs", "lactose"],
    imageUrl: image("spinach frittata"),
    ingredients: [
      { name: "Egg", quantity: 5, unit: "pc" },
      { name: "Ricotta", quantity: 120, unit: "g" },
      { name: "Spinach", quantity: 220, unit: "g", seasonalKey: "spinach" },
      { name: "Parmesan", quantity: 30, unit: "g" }
    ],
    steps: [
      "Wilt spinach in a pan and remove excess water.",
      "Whisk eggs with ricotta and parmesan.",
      "Fold spinach into egg mixture.",
      "Cook covered on low heat until set."
    ]
  },
  {
    id: "mediterranean-couscous",
    name: "Mediterranean Couscous Bowl",
    cuisine: "mediterranean",
    mealMoments: ["lunch", "dinner"],
    difficulty: "easy",
    prepMinutes: 25,
    baseServings: 2,
    estimatedCost: 8,
    nutritionFocus: "vegetables",
    dietTags: ["balanced", "vegetarian", "light"],
    allergens: ["gluten"],
    imageUrl: image("couscous vegetables bowl"),
    ingredients: [
      { name: "Whole couscous", quantity: 180, unit: "g" },
      { name: "Zucchini", quantity: 250, unit: "g", seasonalKey: "zucchini" },
      { name: "Tomato", quantity: 220, unit: "g", seasonalKey: "tomato" },
      { name: "Cucumber", quantity: 180, unit: "g" },
      { name: "Feta", quantity: 80, unit: "g", seasonalKey: null }
    ],
    steps: [
      "Hydrate couscous with hot salted water.",
      "Dice vegetables and toss with olive oil.",
      "Combine couscous, vegetables and feta.",
      "Finish with lemon juice and herbs."
    ]
  },
  {
    id: "chicken-vegetable-wok",
    name: "Chicken and Vegetable Wok",
    cuisine: "asian",
    mealMoments: ["lunch", "dinner"],
    difficulty: "medium",
    prepMinutes: 35,
    baseServings: 2,
    estimatedCost: 11,
    nutritionFocus: "meat",
    dietTags: ["balanced", "high-protein"],
    allergens: ["soy"],
    imageUrl: image("chicken wok vegetables"),
    ingredients: [
      { name: "Chicken breast", quantity: 320, unit: "g" },
      { name: "Bell pepper", quantity: 180, unit: "g" },
      { name: "Zucchini", quantity: 180, unit: "g", seasonalKey: "zucchini" },
      { name: "Soy sauce", quantity: 2, unit: "tbsp" },
      { name: "Brown rice", quantity: 180, unit: "g" }
    ],
    steps: [
      "Cook rice according to package instructions.",
      "Stir fry chicken strips in a hot wok.",
      "Add vegetables and soy sauce, then cook 8 minutes.",
      "Serve over rice."
    ]
  },
  {
    id: "tofu-teriyaki-rice",
    name: "Tofu Teriyaki with Rice",
    cuisine: "asian",
    mealMoments: ["lunch", "dinner"],
    difficulty: "easy",
    prepMinutes: 30,
    baseServings: 2,
    estimatedCost: 8,
    nutritionFocus: "legumes",
    dietTags: ["balanced", "vegetarian", "high-protein", "light"],
    allergens: ["soy"],
    imageUrl: image("tofu teriyaki bowl"),
    ingredients: [
      { name: "Firm tofu", quantity: 300, unit: "g" },
      { name: "Rice", quantity: 170, unit: "g" },
      { name: "Broccoli", quantity: 220, unit: "g" },
      { name: "Soy sauce", quantity: 2, unit: "tbsp" },
      { name: "Honey", quantity: 1, unit: "tbsp" }
    ],
    steps: [
      "Press and cube tofu, then pan sear until golden.",
      "Cook rice and steam broccoli.",
      "Mix soy sauce and honey, then glaze tofu.",
      "Serve tofu and broccoli over rice."
    ]
  },
  {
    id: "bean-tuna-salad",
    name: "Bean and Tuna Salad",
    cuisine: "mediterranean",
    mealMoments: ["lunch"],
    difficulty: "easy",
    prepMinutes: 20,
    baseServings: 2,
    estimatedCost: 7,
    nutritionFocus: "fish",
    dietTags: ["balanced", "high-protein", "light"],
    allergens: ["fish"],
    imageUrl: image("bean tuna salad"),
    ingredients: [
      { name: "Cannellini beans", quantity: 240, unit: "g" },
      { name: "Tuna in olive oil", quantity: 160, unit: "g" },
      { name: "Tomato", quantity: 200, unit: "g", seasonalKey: "tomato" },
      { name: "Red onion", quantity: 0.5, unit: "pc" },
      { name: "Parsley", quantity: 1, unit: "tbsp" }
    ],
    steps: [
      "Drain and rinse beans.",
      "Combine beans, tuna, tomato and sliced onion.",
      "Dress with olive oil, lemon and parsley.",
      "Serve cold."
    ]
  },
  {
    id: "pumpkin-sage-soup",
    name: "Pumpkin and Sage Soup",
    cuisine: "comfort",
    mealMoments: ["lunch", "dinner"],
    difficulty: "easy",
    prepMinutes: 40,
    baseServings: 2,
    estimatedCost: 6,
    nutritionFocus: "vegetables",
    dietTags: ["balanced", "vegetarian", "light"],
    allergens: [],
    imageUrl: image("pumpkin soup"),
    ingredients: [
      { name: "Pumpkin", quantity: 500, unit: "g", seasonalKey: "pumpkin" },
      { name: "Potato", quantity: 180, unit: "g" },
      { name: "Onion", quantity: 1, unit: "pc" },
      { name: "Vegetable broth", quantity: 700, unit: "ml" },
      { name: "Sage", quantity: 1, unit: "tbsp" }
    ],
    steps: [
      "Saute onion and sage in olive oil.",
      "Add diced pumpkin and potato.",
      "Cover with broth and simmer 25 minutes.",
      "Blend until smooth and adjust salt."
    ]
  },
  {
    id: "shrimp-zucchini-orzo",
    name: "Shrimp and Zucchini Orzo",
    cuisine: "mediterranean",
    mealMoments: ["lunch", "dinner"],
    difficulty: "medium",
    prepMinutes: 35,
    baseServings: 2,
    estimatedCost: 13,
    nutritionFocus: "fish",
    dietTags: ["balanced", "high-protein"],
    allergens: ["shellfish", "gluten"],
    imageUrl: image("shrimp orzo zucchini"),
    ingredients: [
      { name: "Shrimp", quantity: 280, unit: "g" },
      { name: "Orzo pasta", quantity: 180, unit: "g" },
      { name: "Zucchini", quantity: 220, unit: "g", seasonalKey: "zucchini" },
      { name: "Garlic", quantity: 1, unit: "pc" },
      { name: "Lemon", quantity: 1, unit: "pc" }
    ],
    steps: [
      "Cook orzo and reserve a little cooking water.",
      "Saute garlic, then add shrimp and zucchini.",
      "Add cooked orzo and lemon zest.",
      "Stir for 2 minutes and serve."
    ]
  },
  {
    id: "eggplant-lentil-lasagna",
    name: "Eggplant and Lentil Lasagna",
    cuisine: "italian",
    mealMoments: ["lunch", "dinner"],
    difficulty: "hard",
    prepMinutes: 90,
    baseServings: 2,
    estimatedCost: 11,
    nutritionFocus: "legumes",
    dietTags: ["balanced", "vegetarian"],
    allergens: ["gluten", "lactose"],
    imageUrl: image("eggplant lasagna"),
    ingredients: [
      { name: "Lasagna sheets", quantity: 180, unit: "g" },
      { name: "Cooked lentils", quantity: 260, unit: "g" },
      { name: "Eggplant", quantity: 350, unit: "g", seasonalKey: "eggplant" },
      { name: "Tomato passata", quantity: 350, unit: "ml" },
      { name: "Mozzarella", quantity: 150, unit: "g" }
    ],
    steps: [
      "Grill eggplant slices until lightly browned.",
      "Simmer lentils in passata for 15 minutes.",
      "Layer sheets, lentil sauce, eggplant and mozzarella.",
      "Bake at 190 C for 35 minutes."
    ]
  },
  {
    id: "beef-fajita-bowls",
    name: "Beef Fajita Bowls",
    cuisine: "mexican",
    mealMoments: ["lunch", "dinner"],
    difficulty: "medium",
    prepMinutes: 40,
    baseServings: 2,
    estimatedCost: 12,
    nutritionFocus: "meat",
    dietTags: ["balanced", "high-protein"],
    allergens: [],
    imageUrl: image("beef fajita bowl"),
    ingredients: [
      { name: "Beef strips", quantity: 300, unit: "g" },
      { name: "Bell pepper", quantity: 220, unit: "g" },
      { name: "Black beans", quantity: 180, unit: "g" },
      { name: "Rice", quantity: 170, unit: "g" },
      { name: "Mild chili", quantity: 1, unit: "tsp" }
    ],
    steps: [
      "Cook rice and keep warm.",
      "Saute beef strips with mild chili.",
      "Add peppers and black beans, cook until tender.",
      "Serve over rice."
    ]
  },
  {
    id: "pea-mint-farro",
    name: "Pea and Mint Farro",
    cuisine: "italian",
    mealMoments: ["lunch", "dinner"],
    difficulty: "easy",
    prepMinutes: 35,
    baseServings: 2,
    estimatedCost: 7,
    nutritionFocus: "whole-grains",
    dietTags: ["balanced", "vegetarian", "light"],
    allergens: ["gluten"],
    imageUrl: image("farro peas mint"),
    ingredients: [
      { name: "Farro", quantity: 180, unit: "g" },
      { name: "Peas", quantity: 250, unit: "g", seasonalKey: "peas" },
      { name: "Mint", quantity: 1, unit: "tbsp" },
      { name: "Lemon", quantity: 1, unit: "pc" },
      { name: "Parmesan", quantity: 30, unit: "g" }
    ],
    steps: [
      "Cook farro until tender.",
      "Saute peas briefly with olive oil.",
      "Combine farro, peas, mint and lemon zest.",
      "Top with parmesan."
    ]
  },
  {
    id: "cod-tomato-olives",
    name: "Cod with Tomatoes and Olives",
    cuisine: "mediterranean",
    mealMoments: ["dinner"],
    difficulty: "easy",
    prepMinutes: 30,
    baseServings: 2,
    estimatedCost: 12,
    nutritionFocus: "fish",
    dietTags: ["balanced", "high-protein", "light"],
    allergens: ["fish"],
    imageUrl: image("cod tomato olives"),
    ingredients: [
      { name: "Cod fillet", quantity: 320, unit: "g" },
      { name: "Tomato", quantity: 260, unit: "g", seasonalKey: "tomato" },
      { name: "Black olives", quantity: 60, unit: "g" },
      { name: "Capers", quantity: 1, unit: "tbsp" },
      { name: "Parsley", quantity: 1, unit: "tbsp" }
    ],
    steps: [
      "Cook tomato with olives and capers for 8 minutes.",
      "Add cod fillets and simmer covered for 12 minutes.",
      "Sprinkle parsley and serve with bread or potatoes."
    ]
  },
  {
    id: "quinoa-roasted-vegetables",
    name: "Quinoa with Roasted Vegetables",
    cuisine: "middle-eastern",
    mealMoments: ["lunch", "dinner"],
    difficulty: "easy",
    prepMinutes: 40,
    baseServings: 2,
    estimatedCost: 8,
    nutritionFocus: "vegetables",
    dietTags: ["balanced", "vegetarian", "light"],
    allergens: [],
    imageUrl: image("quinoa roasted vegetables"),
    ingredients: [
      { name: "Quinoa", quantity: 170, unit: "g" },
      { name: "Eggplant", quantity: 220, unit: "g", seasonalKey: "eggplant" },
      { name: "Zucchini", quantity: 180, unit: "g", seasonalKey: "zucchini" },
      { name: "Chickpeas", quantity: 160, unit: "g" },
      { name: "Tahini", quantity: 1, unit: "tbsp" }
    ],
    steps: [
      "Roast diced vegetables at 200 C for 20 minutes.",
      "Cook quinoa in water until fluffy.",
      "Mix quinoa, chickpeas and roasted vegetables.",
      "Top with tahini and lemon juice."
    ]
  },
  {
    id: "asparagus-egg-toast",
    name: "Asparagus and Soft Egg Toast",
    cuisine: "comfort",
    mealMoments: ["lunch"],
    difficulty: "easy",
    prepMinutes: 25,
    baseServings: 2,
    estimatedCost: 7,
    nutritionFocus: "eggs",
    dietTags: ["balanced", "vegetarian", "light", "high-protein"],
    allergens: ["gluten", "eggs"],
    imageUrl: image("asparagus egg toast"),
    ingredients: [
      { name: "Asparagus", quantity: 220, unit: "g", seasonalKey: "asparagus" },
      { name: "Egg", quantity: 4, unit: "pc" },
      { name: "Whole grain bread", quantity: 4, unit: "slice" },
      { name: "Greek yogurt", quantity: 90, unit: "g", seasonalKey: null }
    ],
    steps: [
      "Cook asparagus in a hot pan for 6 to 8 minutes.",
      "Soft boil eggs for 6 minutes.",
      "Toast bread and spread yogurt.",
      "Top with asparagus and halved eggs."
    ]
  },
  {
    id: "chili-bean-rice",
    name: "Mild Chili Bean Rice",
    cuisine: "mexican",
    mealMoments: ["lunch", "dinner"],
    difficulty: "easy",
    prepMinutes: 35,
    baseServings: 2,
    estimatedCost: 7,
    nutritionFocus: "legumes",
    dietTags: ["balanced", "vegetarian", "high-protein"],
    allergens: [],
    imageUrl: image("mild chili bean rice"),
    ingredients: [
      { name: "Rice", quantity: 170, unit: "g" },
      { name: "Kidney beans", quantity: 240, unit: "g" },
      { name: "Tomato passata", quantity: 250, unit: "ml" },
      { name: "Corn", quantity: 160, unit: "g" },
      { name: "Mild chili", quantity: 0.5, unit: "tsp" }
    ],
    steps: [
      "Cook rice and set aside.",
      "Simmer beans, passata and corn for 12 minutes.",
      "Add mild chili and combine with rice.",
      "Serve with lime and herbs."
    ]
  }
];

const AUTO_RECIPES_PER_CUISINE = 36;
const CUISINES = [
  "italian",
  "mediterranean",
  "asian",
  "mexican",
  "middle-eastern",
  "comfort"
];

const PROTEIN_SOURCES = [
  {
    id: "chickpeas",
    name: "Chickpeas",
    quantity: 220,
    unit: "g",
    nutritionFocus: "legumes",
    isVegetarian: true,
    isHighProtein: true,
    allergens: []
  },
  {
    id: "lentils",
    name: "Cooked lentils",
    quantity: 230,
    unit: "g",
    nutritionFocus: "legumes",
    isVegetarian: true,
    isHighProtein: true,
    allergens: []
  },
  {
    id: "cannellini",
    name: "Cannellini beans",
    quantity: 240,
    unit: "g",
    nutritionFocus: "legumes",
    isVegetarian: true,
    isHighProtein: true,
    allergens: []
  },
  {
    id: "tofu",
    name: "Firm tofu",
    quantity: 280,
    unit: "g",
    nutritionFocus: "legumes",
    isVegetarian: true,
    isHighProtein: true,
    allergens: ["soy"]
  },
  {
    id: "eggs",
    name: "Egg",
    quantity: 4,
    unit: "pc",
    nutritionFocus: "eggs",
    isVegetarian: true,
    isHighProtein: true,
    allergens: ["eggs"]
  },
  {
    id: "chicken",
    name: "Chicken breast",
    quantity: 320,
    unit: "g",
    nutritionFocus: "meat",
    isVegetarian: false,
    isHighProtein: true,
    allergens: []
  },
  {
    id: "turkey",
    name: "Ground turkey",
    quantity: 300,
    unit: "g",
    nutritionFocus: "meat",
    isVegetarian: false,
    isHighProtein: true,
    allergens: []
  },
  {
    id: "beef",
    name: "Beef strips",
    quantity: 300,
    unit: "g",
    nutritionFocus: "meat",
    isVegetarian: false,
    isHighProtein: true,
    allergens: []
  },
  {
    id: "salmon",
    name: "Salmon fillet",
    quantity: 320,
    unit: "g",
    nutritionFocus: "fish",
    isVegetarian: false,
    isHighProtein: true,
    allergens: ["fish"]
  },
  {
    id: "cod",
    name: "Cod fillet",
    quantity: 320,
    unit: "g",
    nutritionFocus: "fish",
    isVegetarian: false,
    isHighProtein: true,
    allergens: ["fish"]
  },
  {
    id: "tuna",
    name: "Tuna in olive oil",
    quantity: 170,
    unit: "g",
    nutritionFocus: "fish",
    isVegetarian: false,
    isHighProtein: true,
    allergens: ["fish"]
  },
  {
    id: "shrimp",
    name: "Shrimp",
    quantity: 280,
    unit: "g",
    nutritionFocus: "fish",
    isVegetarian: false,
    isHighProtein: true,
    allergens: ["shellfish"]
  }
];

const CARB_BASES = [
  {
    id: "rice",
    name: "Rice",
    quantity: 170,
    unit: "g",
    nutritionFocus: "carbs",
    allergens: []
  },
  {
    id: "brown-rice",
    name: "Brown rice",
    quantity: 175,
    unit: "g",
    nutritionFocus: "whole-grains",
    allergens: []
  },
  {
    id: "quinoa",
    name: "Quinoa",
    quantity: 170,
    unit: "g",
    nutritionFocus: "whole-grains",
    allergens: []
  },
  {
    id: "farro",
    name: "Farro",
    quantity: 180,
    unit: "g",
    nutritionFocus: "whole-grains",
    allergens: ["gluten"]
  },
  {
    id: "barley",
    name: "Pearl barley",
    quantity: 170,
    unit: "g",
    nutritionFocus: "whole-grains",
    allergens: ["gluten"]
  },
  {
    id: "couscous",
    name: "Whole couscous",
    quantity: 180,
    unit: "g",
    nutritionFocus: "carbs",
    allergens: ["gluten"]
  },
  {
    id: "orzo",
    name: "Orzo pasta",
    quantity: 180,
    unit: "g",
    nutritionFocus: "carbs",
    allergens: ["gluten"]
  },
  {
    id: "whole-wheat-pasta",
    name: "Whole wheat pasta",
    quantity: 180,
    unit: "g",
    nutritionFocus: "carbs",
    allergens: ["gluten"]
  },
  {
    id: "gnocchi",
    name: "Potato gnocchi",
    quantity: 420,
    unit: "g",
    nutritionFocus: "carbs",
    allergens: ["gluten"]
  },
  {
    id: "arborio",
    name: "Arborio rice",
    quantity: 180,
    unit: "g",
    nutritionFocus: "carbs",
    allergens: []
  },
  {
    id: "bread",
    name: "Whole grain bread",
    quantity: 4,
    unit: "slice",
    nutritionFocus: "carbs",
    allergens: ["gluten"]
  }
];

const VEGETABLE_SIDES = [
  { id: "tomato", name: "Tomato", quantity: 240, unit: "g", seasonalKey: "tomato" },
  { id: "zucchini", name: "Zucchini", quantity: 240, unit: "g", seasonalKey: "zucchini" },
  { id: "eggplant", name: "Eggplant", quantity: 240, unit: "g", seasonalKey: "eggplant" },
  { id: "peas", name: "Peas", quantity: 220, unit: "g", seasonalKey: "peas" },
  { id: "broccoli", name: "Broccoli", quantity: 220, unit: "g" },
  { id: "bell-pepper", name: "Bell pepper", quantity: 220, unit: "g" },
  { id: "spinach", name: "Spinach", quantity: 220, unit: "g", seasonalKey: "spinach" },
  { id: "pumpkin", name: "Pumpkin", quantity: 260, unit: "g", seasonalKey: "pumpkin" },
  { id: "mushrooms", name: "Mushrooms", quantity: 240, unit: "g" },
  { id: "cucumber", name: "Cucumber", quantity: 180, unit: "g" },
  { id: "asparagus", name: "Asparagus", quantity: 220, unit: "g", seasonalKey: "asparagus" },
  { id: "corn", name: "Corn", quantity: 180, unit: "g" }
];

const SAUCE_OPTIONS = [
  {
    id: "lemon-herb",
    title: "Lemon Herb Sauce",
    ingredient: { name: "Lemon", quantity: 1, unit: "pc" },
    optionalIngredient: { name: "Parsley", quantity: 1, unit: "tbsp" },
    allergens: []
  },
  {
    id: "tomato",
    title: "Tomato Sauce",
    ingredient: { name: "Tomato passata", quantity: 220, unit: "ml" },
    optionalIngredient: { name: "Garlic", quantity: 1, unit: "pc" },
    allergens: []
  },
  {
    id: "soy-glaze",
    title: "Soy Glaze",
    ingredient: { name: "Soy sauce", quantity: 2, unit: "tbsp" },
    optionalIngredient: { name: "Honey", quantity: 1, unit: "tbsp" },
    allergens: ["soy"]
  },
  {
    id: "yogurt-herb",
    title: "Yogurt Herb Sauce",
    ingredient: { name: "Greek yogurt", quantity: 120, unit: "g" },
    optionalIngredient: { name: "Mint", quantity: 1, unit: "tbsp" },
    allergens: ["lactose"]
  },
  {
    id: "tahini",
    title: "Tahini Sauce",
    ingredient: { name: "Tahini", quantity: 1, unit: "tbsp" },
    optionalIngredient: { name: "Lemon", quantity: 1, unit: "pc" },
    allergens: []
  },
  {
    id: "caper-olive",
    title: "Caper Olive Dressing",
    ingredient: { name: "Capers", quantity: 1, unit: "tbsp" },
    optionalIngredient: { name: "Black olives", quantity: 60, unit: "g" },
    allergens: []
  }
];

const STYLE_TEMPLATES = [
  {
    id: "skillet",
    label: "Skillet",
    basePrepMinutes: 26,
    baseCost: 7,
    steps: [
      "Cook {carb} until almost ready.",
      "Saute {protein} with onion and olive oil.",
      "Add {vegetable} and finish with {sauce}.",
      "Combine everything and serve warm."
    ]
  },
  {
    id: "baked",
    label: "Baked",
    basePrepMinutes: 34,
    baseCost: 8,
    steps: [
      "Preheat the oven and arrange {protein} and {vegetable} on a tray.",
      "Season with olive oil and half of the {sauce}.",
      "Bake until the protein is cooked through.",
      "Serve with freshly cooked {carb}."
    ]
  },
  {
    id: "bowl",
    label: "Bowl",
    basePrepMinutes: 24,
    baseCost: 7,
    steps: [
      "Cook {carb} and let it cool slightly.",
      "Prepare {protein} in a pan with olive oil.",
      "Mix with {vegetable} and finish with {sauce}.",
      "Serve as a warm bowl."
    ]
  },
  {
    id: "stew",
    label: "Stew",
    basePrepMinutes: 40,
    baseCost: 8,
    steps: [
      "Saute onion and garlic in olive oil.",
      "Add {protein}, {vegetable} and {sauce}.",
      "Simmer gently until flavors are blended.",
      "Serve the stew with {carb}."
    ]
  },
  {
    id: "tray",
    label: "Traybake",
    basePrepMinutes: 30,
    baseCost: 8,
    steps: [
      "Arrange {protein}, {vegetable} and onion in a baking tray.",
      "Drizzle olive oil and season with {sauce}.",
      "Roast until caramelized and tender.",
      "Plate with {carb}."
    ]
  },
  {
    id: "pilaf",
    label: "Pilaf",
    basePrepMinutes: 36,
    baseCost: 8,
    steps: [
      "Saute onion and {protein} in olive oil.",
      "Add {carb}, then toast for 1 minute.",
      "Add {vegetable} and cook until tender.",
      "Finish with {sauce} and rest before serving."
    ]
  }
];

function unique(values) {
  return [...new Set(values)];
}

function formatStep(template, replacements) {
  return template.replace(/\{(\w+)\}/g, (fullMatch, key) => {
    if (!Object.hasOwn(replacements, key)) {
      return fullMatch;
    }
    return replacements[key];
  });
}

function buildDietTags(protein, prepMinutes) {
  const tags = new Set(["balanced"]);

  if (protein.isVegetarian) {
    tags.add("vegetarian");
  }

  if (
    protein.isHighProtein ||
    ["fish", "meat", "eggs", "legumes"].includes(protein.nutritionFocus)
  ) {
    tags.add("high-protein");
  }

  if (prepMinutes <= 35 || protein.isVegetarian) {
    tags.add("light");
  }

  return [...tags];
}

function buildMealMoments(index) {
  if (index % 11 === 0) {
    return ["lunch"];
  }
  if (index % 7 === 0) {
    return ["dinner"];
  }
  return ["lunch", "dinner"];
}

function buildAutoRecipe(cuisine, cuisineIndex, index) {
  const protein = PROTEIN_SOURCES[(index + cuisineIndex * 2) % PROTEIN_SOURCES.length];
  const carb = CARB_BASES[(index * 2 + cuisineIndex) % CARB_BASES.length];
  const vegetable =
    VEGETABLE_SIDES[(index * 3 + cuisineIndex) % VEGETABLE_SIDES.length];
  const sauce = SAUCE_OPTIONS[(index + cuisineIndex * 4) % SAUCE_OPTIONS.length];
  const style = STYLE_TEMPLATES[(index + cuisineIndex) % STYLE_TEMPLATES.length];

  const difficultyCycle = ["easy", "medium", "hard"];
  const difficulty = difficultyCycle[(index + cuisineIndex) % difficultyCycle.length];
  const prepBoost = difficulty === "easy" ? 0 : difficulty === "medium" ? 8 : 16;
  const prepMinutes = style.basePrepMinutes + prepBoost;

  const nutritionFocus =
    protein.nutritionFocus === "legumes" && index % 5 === 0
      ? carb.nutritionFocus
      : protein.nutritionFocus;

  const baseIngredients = [
    { name: protein.name, quantity: protein.quantity, unit: protein.unit },
    { name: carb.name, quantity: carb.quantity, unit: carb.unit },
    {
      name: vegetable.name,
      quantity: vegetable.quantity,
      unit: vegetable.unit,
      seasonalKey: vegetable.seasonalKey ?? null
    },
    { name: "Onion", quantity: 1, unit: "pc" },
    { name: "Extra virgin olive oil", quantity: 2, unit: "tbsp" },
    { ...sauce.ingredient },
    sauce.optionalIngredient ? { ...sauce.optionalIngredient } : null
  ].filter(Boolean);

  const replacements = {
    protein: protein.name.toLowerCase(),
    carb: carb.name.toLowerCase(),
    vegetable: vegetable.name.toLowerCase(),
    sauce: sauce.title.toLowerCase()
  };

  const steps = style.steps.map((step) => formatStep(step, replacements));
  const estimatedCost = style.baseCost + (protein.isHighProtein ? 3 : 1);

  const allergens = unique([
    ...protein.allergens,
    ...carb.allergens,
    ...sauce.allergens
  ]);

  return {
    id: `auto-${cuisine}-${style.id}-${protein.id}-${carb.id}-${vegetable.id}-${index + 1}`,
    name: `${style.label} ${protein.name} with ${carb.name} and ${vegetable.name}`,
    cuisine,
    mealMoments: buildMealMoments(index),
    difficulty,
    prepMinutes,
    baseServings: 2,
    estimatedCost,
    nutritionFocus,
    dietTags: buildDietTags(protein, prepMinutes),
    allergens,
    imageUrl: image(),
    ingredients: baseIngredients,
    steps
  };
}

function buildAutoRecipes() {
  const recipes = [];
  for (const [cuisineIndex, cuisine] of CUISINES.entries()) {
    for (let index = 0; index < AUTO_RECIPES_PER_CUISINE; index += 1) {
      recipes.push(buildAutoRecipe(cuisine, cuisineIndex, index));
    }
  }
  return recipes;
}

const AUTO_RECIPES = buildAutoRecipes();

export const RECIPES = [...CORE_RECIPES, ...AUTO_RECIPES];
