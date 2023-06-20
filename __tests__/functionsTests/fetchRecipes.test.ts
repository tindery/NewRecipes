import apiConfig from '../../apiConfig.json';
import {ECuisineType} from '../../src/enums/ECuisineType';
import {EDishType} from '../../src/enums/EDishType';
import {EMealType} from '../../src/enums/EMealType';
import {
  generateQuerryParam,
  generateURL,
  getRecipesFromApi,
  TGetRecipesOptions,
} from '../../src/functions/fetchRecipes';

describe('generateQuerryParam', () => {
  test('returns the expected query parameter string', () => {
    const key = 'foo';
    const val = 'bar';
    const result = generateQuerryParam(key, val);
    expect(result).toEqual('foo=bar&');
  });
});

describe('generateURL', () => {
  const settings: TDiscoverSettings = {
    cuisineType: [ECuisineType.italian, ECuisineType.french],
    dishType: [EDishType['main course']],
    mealType: [EMealType.brunch, EMealType.breakfast],
  };

  const urlOverride = 'https://some-other-url.com';

  const app_config_query = `app_id=${apiConfig.app_id}&app_key=${apiConfig.app_key}&`;

  test('returns the expected URL string without settings and urlOverride', () => {
    const options: TGetRecipesOptions = {
      settings: {},
      urlOverride: undefined,
    };
    const result = generateURL(options);
    expect(result).toEqual(
      'https://api.edamam.com/api/recipes/v2?' + app_config_query.slice(0, -1),
    );
  });

  test('returns the expected URL string with urlOverride and no settings', () => {
    const options: TGetRecipesOptions = {
      settings: {},
      urlOverride: urlOverride,
    };
    const result = generateURL(options);
    expect(result).toEqual(`${urlOverride}?` + app_config_query.slice(0, -1));
  });

  test('returns the expected URL string with settings and no urlOverride', () => {
    const options: TGetRecipesOptions = {
      settings: settings,
      urlOverride: undefined,
    };
    const result = generateURL(options);
    expect(result).toEqual(
      `https://api.edamam.com/api/recipes/v2?${app_config_query}cuisineType=italian,french&dishType=main course&mealType=brunch,breakfast`,
    );
  });

  test('returns the expected URL string with urlOverride, settings will be ignored', () => {
    const options: TGetRecipesOptions = {
      settings: settings,
      urlOverride: urlOverride,
    };
    const result = generateURL(options);
    expect(result).toEqual(`${urlOverride}?` + app_config_query.slice(0, -1));
  });

  test('returns the expected URL string with only some settings', () => {
    const options: TGetRecipesOptions = {
      settings: {
        cuisineType: [ECuisineType.mexican],
        mealType: [EMealType['lunch/dinner']],
      },
    };
    const result = generateURL(options);
    expect(result).toEqual(
      `https://api.edamam.com/api/recipes/v2?${app_config_query}cuisineType=mexican&mealType=lunch/dinner`,
    );
  });

  test('returns the expected URL string with only one setting', () => {
    const options: TGetRecipesOptions = {
      settings: {
        cuisineType: [ECuisineType.mexican],
      },
    };
    const result = generateURL(options);
    expect(result).toEqual(
      `https://api.edamam.com/api/recipes/v2?${app_config_query}cuisineType=mexican`,
    );
  });
});
