import apiConfig from '../../apiConfig.json';
import {isObjectEmpty} from './helperFunctions';

export type TGetRecipesOptions = {
  settings: TDiscoverSettings;
  urlOverride?: string;
};

// helper function to turn object param and value into query string parameter
// ! adds '&' at the end every time
export const generateQuerryParam = (key: string, val: string): string => {
  val = val.replaceAll(' ', '-').replaceAll('/', '%2F');
  return key + '=' + val + '&';
};

// generates URL for edamam recipes API v2
export const generateURL = ({settings}: TGetRecipesOptions): string => {
  let url = 'https://api.edamam.com/api/recipes/v2?';
  // add keys from apiConfig
  // those are required items for the API such as app_id
  for (const key in apiConfig) {
    url += generateQuerryParam(key, apiConfig[key as keyof typeof apiConfig]);
  }
  // check is urlOverride, if urlOverride, do not set additional settings params
  // add params from settings (see TDiscoverSettings type for more detailed info)
  if (!isObjectEmpty(settings)) {
    for (const key in settings) {
      const value = settings[key as keyof TDiscoverSettings];
      if (value !== undefined) {
        for (let item of value) {
          console.log(item);
          url += generateQuerryParam(key, item);
        }
      }
    }
  }
  // slice last & generated from generateQuerryParam ¯\_(ツ)_/¯
  console.log('loading from url', url);
  return url.slice(0, -1);
};

export const getRecipesFromApi = async ({
  settings,
  urlOverride,
}: TGetRecipesOptions) => {
  console.log('getRecipesFromApi', urlOverride);
  try {
    const response = await fetch(urlOverride || generateURL({settings}));
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
};
