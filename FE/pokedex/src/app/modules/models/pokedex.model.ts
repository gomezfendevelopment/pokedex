export interface Pokemon {
  id: number;
  identifier: string;
  species_id: number;
  height: number;
  weight: number;
  baseExperience: number;
  order: number;
  is_default: boolean;
  name: string;
  type1: string;
  type2: string | null;
  image_url: string;
}

interface PokemonSpecies {
  identifier: string;
  generationId: number;
  evolutionChainId: number;
  habitatId: number;
  genderRate: number;
  captureRate: number;
  baseHappiness: number;
  isBaby: boolean;
  hatchCounter: number;
  hasGenderDifferences: boolean;
  growthRateId: number;
  formsSwitchable: boolean;
  order: number;
}

export interface PokemonDetail {
  id: number;
  identifier: string;
  name: string;
  type1: string;
  type2: string;
  height: number;
  weight: number;
  baseExperience: number;
  species: PokemonSpecies;
  color: string;
  shape: string;
  image_url: string;
}
