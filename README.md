# Meteor Posts Test

This little project is a Meteor app for posting messages to the system. It uses React and Bootstrap and was developed with version 1.5. 


- [Publication Collector](#meteor-posts-test)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Tests](#tests)

## Installation

```
git clone https://github.com/fredygil/meteor-posts-test.git
cd meteor-posts-test
meteor npm install
meteor
```

## Usage

The main page list all posts and allow the user to log in, in order to publish new posts. Each new post is added to the list of posts and for those which belongs to the current user, there is a button for removing.

### Tests

To run the tests, execute this command:

```
meteor test --driver-package practicalmeteor:mocha --port 3100
```

After that, open your browser with URL http://localhost:3100 and you'll see 4 tests using Mocha.
