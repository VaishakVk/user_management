module.exports = {
  "definitions": {},
  "$schema": "http://json-schema.org/draft-04/schema#",
  "$id": "http://example.com/root.json",
  "type": "object",
  "title": "Sign Up",
  "required": [
    "name",
    "email",
    "password"
  ],
  "properties": {
    "name": {

      "type": "string",
      "title": "The Name Schema",

    },
    "email": {

      "type": "string",
      "title": "The Email Schema",
      "pattern": "^[A-Za-z0-9]([A-Za-z0-9\.\-]+)\@([A-Za-z0-9\.\-]+)\.([A-Za-z]{2,4})$"

    },
    "password": {
      "type": "string",
      "title": "The Password Schema",
    }
  }
}