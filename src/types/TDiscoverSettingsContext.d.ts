type TDiscoverSettings = {
  cuisineType?: ECuisineType[];
  dishType?: EDishType[];
  mealType?: EMealType[];
  diet?: EDietLabels[];
  health?: EHealthLabel[];
};

type TDiscoverSettingsContext = {
  discoverSettings: TDiscoverSettings;
  setSettings: (
    key: keyof TDiscoverSettings,
    value: TDiscoverSettings[typeof key],
  ) => void;
};