// Function to format a chord based on the defined patterns
export type Chord = { label: string }

export function useChord(chord: string) {
  return {
    chord,
  }
}
