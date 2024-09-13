// src/types/pokemon.ts
export interface PokemonBasic {
  id: number
  name: string
  url: string
}

export interface PokemonDetailed {
  id: number
  name: string
  sprites: {
    front_default: string
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: Array<{
    type: {
      name: string
    }
  }>
  weight: number
  height: number
}
