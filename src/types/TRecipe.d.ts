type TRecipeImage = {
  url: string;
  width: number;
  height: number;
};

type TRecipe = {
  uri: string;
  label: string;
  image: string;
  images: {
    THUMBNAIL: TRecipeImage;
    SMALL: TRecipeImage;
    REGULAR: TRecipeImage;
    LARGE: TRecipeImage;
  };
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: TIngredient[];
  calories: number;
  totalWeight: number;
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  instructions?: string[];
  tags?: string[];
  externalId?: string;
  totalNutrients: Object;
  totalDaily: Object;
  digest: TDigest[];
};

type TRecipeWithID = {
  id: string;
} & TRecipe;
