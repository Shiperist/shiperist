// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    cs: () => import('./dictionaries/cs.json').then((module) => module.default),
}

export const getDictionary = async (locale) => dictionaries[locale]()
