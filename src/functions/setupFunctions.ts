import {ECuisineType} from '../enums/ECuisineType';
import {EDishType} from '../enums/EDishType';
import {EMealType} from '../enums/EMealType';
import DietLabels from '../data/DietLabels.json';
import HealthLabels from '../data/HealthLabels.json';
import { EDietLabels } from '../enums/EDietLabels';
import { EHealthLabel } from '../enums/EHealthLabel';

export const getAllItemsForSetupStep = (setupStep: keyof TDiscoverSettings) => {
  switch (setupStep) {
    case 'cuisineType':
      return Object.values(ECuisineType);
    case 'dishType':
      return Object.values(EDishType);
    case 'mealType':
      return Object.values(EMealType);
    case 'diet':
      return Object.values(EDietLabels);
    case 'health':
        return Object.values(EHealthLabel);
  }
};
