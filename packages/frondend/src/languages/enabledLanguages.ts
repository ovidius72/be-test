// import { ILanguage } from '../models/languageStore';

import {ILanguage} from "src/features/language/language.slice";

export const enabledLanguages: ILanguage[] = [
  {
    iso_code: 'en_GB',
    dir: 'RTL',
    lang: 'en',
    label: 'English',
  },
  {
    iso_code: 'it_IT',
    dir: 'RTL',
    lang: 'it',
    label: 'Italiano',
  },
];
