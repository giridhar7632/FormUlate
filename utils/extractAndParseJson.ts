export function extractAndParseJson(input: string): Object {
  const jsonStart = input.indexOf('{')
  const jsonEnd = input.lastIndexOf('}')
  const jsonString = input.slice(jsonStart, jsonEnd + 1)
  console.log('jsonString', jsonString)
  jsonString.replace('\n ', ' ')
  jsonString.replace(' ', ' ')
  return JSON.parse(jsonString)
}

// console.log(
//   extractAndParseJson(
//     '```json { "title": "Guestbook for Wedding", "action": "create", "fields": [ { "field": "text", "type": "text", "name": "first_name", "label": "First Name", "placeholder": "Enter your first name", "required": true }, { "field": "text", "type": "text", "name": "last_name", "label": "Last Name", "placeholder": "Enter your last name", "required": true }, { "field": "email", "type": "email", "name": "email", "label": "Email Address", "placeholder": "Enter your email address", "required": true }, { "field": "textarea", "type": "textarea", "name": "message", "label": "Message", "placeholder": "Leave a message for the happy couple", "required": false } ] }```'
//   )
// )
