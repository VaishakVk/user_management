module.exports = {
    "definitions": {},
    "$schema": "http://json-schema.org/draft-04/schema#",
    "$id": "http://example.com/root.json",
    "type": "object",
    "title": "Log In",
    "required": [
        "email",
        "password"
    ],
    "properties": {

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