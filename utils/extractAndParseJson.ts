export function extractAndParseJson(input: string): any {
  const jsonStart = input.indexOf('{')
  const jsonEnd = input.lastIndexOf('}')
  const jsonString = input.slice(jsonStart, jsonEnd + 1)
  return JSON.parse(jsonString)
}
