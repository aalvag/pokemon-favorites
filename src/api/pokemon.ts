import { API_CONSTANTS } from '@/constants/api'
import type { PokemonBasic, PokemonDetailed } from '@/types/pokemon'

export async function getPokemonList(limit: number = 1302): Promise<PokemonBasic[]> {
  try {
    const response = await fetch(`${API_CONSTANTS.API_BASE_URL}/pokemon?limit=${limit}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Error fetching Pokemon list:', error)
    throw error
  }
}

export async function getPokemonDetails(name: string): Promise<PokemonDetailed> {
  try {
    const response = await fetch(`${API_CONSTANTS.API_BASE_URL}/pokemon/${name}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching details for Pokemon ${name}:`, error)
    throw error
  }
}
