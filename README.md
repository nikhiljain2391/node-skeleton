# node-skeleton
Project starter for Node JS API Server (ES6)

Coding Standards to be followed:-

# Indentation
1. Each indent should be equal to 2 white spaces, no tabs. You may configure your editor to replace 1 tab with white spaces.

# Configurations
1. All types of configurations must be set using environment variables.
2. Configuration values must not be committed to the code repository.
3. Suggestion: Use a shell / batch script to set environment variables and then start the API Server.
4. Note: You may use modules like 'dotenv' to help set environment variables but make sure the configurations are not committed to the code repository.

# Language
1. Code must be written in ES6/ES7. Use 'babel' to transpile the code to ES5 for compatibility.

# Guidelines
1. Unit tests are mandatory.
2. Use JWT Open Standard Access Tokens for Authentication.
3. Use AES-256 CBC-Mode Encryption Algorithm when encryption is needed.
4. Avoid use of strings or numbers directly in the code. Initialize constant variables and then use them in the code.
5. All constant variables must be maintained in separate logical files in a single directory.
6. Use ISO Standards for all data points.
7. NPM Module 'standard' has been included to help code in ES6/ES7 with the basic standards as pointed by the community.
  Make sure this module doesn't give errors when finally merging the code.
  Note: If 'standard' doesn't work using command-line then install this module globally.
8. Implement API Documentation using Swagger and Code Documentation using proper comments.

# Password Policy
1. Minimum length of 8 characters.
2. Password must start with an alphabet.
3. At least 1 Upper-case Alphabet.
4. At least 1 Lower-case Alphabet.
5. At least 1 Number.
6. At least 1 Special Character.
