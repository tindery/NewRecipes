export const getSettingsLabel = (setting: keyof TDiscoverSettings): string => {
  switch (setting) {
    case 'cuisineType':
      return 'Cuisine types';
    case 'dishType':
      return 'Dish types';
    case 'mealType':
      return 'Meal types';
    case 'diet':
      return 'Diet options';
    case 'health':
      return 'Health options';
    default:
      throw new Error(
        'getSettingsLabel error: setting "' + setting + '" is unknown',
      );
  }
};
