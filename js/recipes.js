const image = () => "./assets/recipe-placeholder.svg";

export const RECIPES = [
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
