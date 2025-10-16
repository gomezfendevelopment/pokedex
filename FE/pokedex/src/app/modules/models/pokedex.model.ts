export interface Pokemon {
  id: number;
  identifier: string;
  species_id: number;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: boolean;
  name: string;
  type1: string;
  type2: string | null;
  image_url: string;
}

export interface PokemonDetail {
  id: number;
  identifier: string;
  speciesId: number;
  height: number;
  weight: number;
  baseExperience: number;
  order: number;
  isDefault: boolean;
  name: string;
  type1: string;
  type2: string;
  imageUrl: string;
}

export interface PokemonSpecies {
  id: number;
  identifier: string;
  generation_id: number;
  evolves_from_species_id: number | null;
  evolution_chain_id: number;
  color_id: number;
  shape_id: number;
  habitat_id: number | null;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  growth_rate_id: number;
  forms_switchable: boolean;
  order: number;
  conquest_order: number | null;
}

export interface PokemonColor {
  id: number;
  identifier: string;
}

export interface PokemonShape {
  id: number;
  identifier: string;
}

export interface PokemonType {
  id: number;
  type_id: number;
  slot: number;
}
