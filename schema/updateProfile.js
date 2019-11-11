module.exports = {
    "definitions": {},
    "$schema": "http://json-schema.org/draft-04/schema#",
    "$id": "http://example.com/root.json",
    "type": "object",
    "title": "Sign Up",
    "required": [
        "name",

        "password"
    ],
    "properties": {
        "name": {

            "type": "string",
            "title": "The Name Schema",

        },

        "password": {
            "type": "string",
            "title": "The Password Schema",


        }
    }
}