export function extractAndParseJson(input: string): Object {
  return tryParseJSON(input.replace(/```json\s*/, "").replace(/\s*```/, ""));
}

// console.log(
//   extractAndParseJson(
//     '```json { "title": "Guestbook for Wedding", "action": "create", "fields": [ { "field": "text", "type": "text", "name": "first_name", "label": "First Name", "placeholder": "Enter your first name", "required": true }, { "field": "text", "type": "text", "name": "last_name", "label": "Last Name", "placeholder": "Enter your last name", "required": true }, { "field": "email", "type": "email", "name": "email", "label": "Email Address", "placeholder": "Enter your email address", "required": true }, { "field": "textarea", "type": "textarea", "name": "message", "label": "Message", "placeholder": "Leave a message for the happy couple", "required": false } ] }```'
//   )
// )

function tryParseJSON(jsonString: string) {
  const fixedJsonString = fixJSONFormatting(jsonString);
  if (fixedJsonString) {
    return JSON.parse(jsonString);
  }
}

function fixJSONFormatting(jsonString: string) {
  jsonString = jsonString
    .replace(/\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/\t/g, " ");
  jsonString = jsonString.replace(/,\s*}/g, "}");
  jsonString = jsonString.replace("\n", " ");
  jsonString = jsonString.replace("\n ", " ");
  jsonString = jsonString.replace(" ", " ");

  return jsonString;
}
