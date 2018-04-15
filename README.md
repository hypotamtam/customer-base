## Intro

This repository only exists for the sake of a recruitment exercise. The goal was to develop within 5 days an interface to edit a user base. It's a classic `BootStrap` `React` web app, couple with `Redux`. I use the new `Firestore` from `Firebase` as data store.  
Please be aware that's nearly the first time I do front-end development. I've only participated in the development of obscure internal tools. I choose those technologies because I think they are the ones that suit the best for the exercise and I believe they are light and robust enough for big projects. They are also offering a large device covering. 

## Setup

To work on this project, you must have :

* `npm --version 5.5.1` 
* `node --version 8.0.0`
* `react-script` 
* `eslint --version v4.19.1`

You can get `npm` and `node` [here](https://www.npmjs.com/get-np), `react-script` [here](https://reactjs.org/docs/add-react-to-a-new-app.html) and `eslint` [here](https://eslint.org/docs/user-guide/getting-started). After, please clone the repo with `git clone git@github.com:hypotamtam/customer-base.git`. Then you can run `npm install` to get all dependencies. Probably the good time for a coffee ;). 

When it's done, run `npm start`. The development server should start and open the browser with the page [http://localhost:3000/](). Few second after, you see the customer base web interface.

### Lint

In order to keep one development style, and so increase the code readability, I put in place the linter `eslint`. I use mostly the AirBnB coding rules but you can find the variations in [.eslintrc.json](https://github.com/hypotamtam/customer-base/blob/master/.eslintrc.json). I recommend you to set up your IDE with it. To check the project, run `npm run lint` (detail in [package.json](https://github.com/hypotamtam/customer-base/blob/master/package.json)).  

### Tests

Obviously, there are unit tests set up. They are wrote with [Jest](https://facebook.github.io/jest/), [enzyme](http://airbnb.io/enzyme/) and [enzyme-matchers](https://github.com/FormidableLabs/enzyme-matchers). I like them because they allow writing tests understandable in a couple of seconds. Also, they are simple to learn and to use.  
The code coverage is not as good as I would, mainly because I failed to mock the `Redux` part, but I think all user interactions are tested. I didn't test how the data are displayed because the current UI will most likely change.  
To run the tests, you can either run `npm test` or `npm test -- --coverage`. Here the last result of the second one.

```
Test Suites: 4 passed, 4 total
Tests:       19 passed, 19 total
Snapshots:   0 total
Time:        4.53s
Ran all test suites.
---------------------|----------|----------|----------|----------|-------------------|
File                 |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------------|----------|----------|----------|----------|-------------------|
All files            |     73.2 |    63.16 |       48 |    76.76 |                   |
 actions             |       50 |      100 |        0 |       50 |                   |
  selectUser.js      |       50 |      100 |        0 |       50 |                 4 |
  updateFilter.js    |       50 |      100 |        0 |       50 |                 5 |
  updateSort.js      |       50 |      100 |        0 |       50 |                 3 |
 components          |    70.77 |    63.16 |       50 |    74.79 |                   |
  App.jsx            |    92.86 |       80 |       75 |      100 |                65 |
  ContactDetail.jsx  |      100 |      100 |      100 |      100 |                   |
  Header.jsx         |    81.48 |       50 |    58.82 |       88 |        63,109,110 |
  Input.jsx          |    35.29 |    16.67 |    27.27 |     37.5 |... 34,35,40,47,48 |
  Note.jsx           |       50 |        0 |       40 |    53.33 |... 26,28,30,34,42 |
  User.jsx           |      100 |      100 |      100 |      100 |                   |
  UserDetail.jsx     |    66.67 |      100 |    44.44 |    67.86 |... 20,122,123,124 |
  Users.jsx          |    84.21 |       75 |       60 |    93.75 |                58 |
 types               |      100 |      100 |      100 |      100 |                   |
  filterPropTypes.js |        0 |        0 |        0 |        0 |                   |
  sortPropTypes.js   |      100 |      100 |      100 |      100 |                   |
  userPropTypes.js   |      100 |      100 |      100 |      100 |                   |
---------------------|----------|----------|----------|----------|-------------------|
```

### CI

What is a project without a continuous integration... I set up a very simple CI with [circleci.com](https://circleci.com/). For every commit, it checks out the source from GitHub, installs the dependency, runs the tests and the linter. When the build is broken or fixed, it sends me an email. The config is in [.circleci/config.yml](https://github.com/hypotamtam/customer-base/blob/master/.circleci/config.yml). Send me a message if you when to have access to it.

### Other

As it a short project and I was alone, I only use master. Never do that for real project! But I followed [this](https://seesparkbox.com/foundry/semantic_commit_messages) to write my commit message.

##Architecture

###Folders

One image is better than any explanation :

```
src  
    ├── index.css  
    ├── index.js
    ├── setupTests.js
    ├── main
    │   ├── Only the production files are in those folders
    │   ├── actions
    │   │   ├── All Redux action factory 
    │   │   └── ...
    │   ├── components
    │   │   ├── All React components  
    │   │   └── ....
    │   ├── types
    │   │   ├── All PropTypes use by the React components are defined here  
    │   │   └── ....
    │   ├── Redux store and initialisation are here
    │   └── ...
    └── test
        ├── Only the test files are in those folders
        ├── components
        │   ├── Test of the components
        │   └── ...
        └── data
            └── usersData.js Set of users used for the tests 
```
This is clearly an early stage structure and based on my experience with other platforms. As the test and the production code base are not mixed up, it makes the thing clearer. Not chance an ugly but useful test hack goes to prod. I'm happy to change it if you prefer a better one.

###Software

In case you are not familiar with `React` and `Redux`, you should start by reading these site:

* [https://reactjs.org/docs/hello-world.html]()
* [https://redux.js.org/introduction]()

It's also probably a good idea you do [this tutorial](https://reactjs.org/tutorial/tutorial.html).

For this app, I devised the screen in 3 parts:

* The user list
* The user's details
* The filtering/ordering bar

All are connected by `App`. Its role is to do the global layout, provides users objects to the user's list and the selected user object to the user's details. It's also in charge of the data loading.

The user list is done by `Users` and `User` components. `Users` displays a list of `User` and manage the user selection. `User` present a summary of the user's data.

When a user is selected, `UserDetails` appears to present... well, the user's details. It's the component to edit the user. As requested, it allows to change the user status, and edit/add notes.

Finally, the `Header` is a set of tool design to order or filter the data of `Users`.

Most of the change is done via `Redux`. The state look likes this :

```
{
  filter: {                    
    status: 'prospective',
    text: 'Dar'
  },
  sort: {
    field: 'contactDetails',
    order: 'dsc'
  },
  selectedUserId: {
    value: 'OGmSVgJb1kWKSxrMcOUm'
  },
  firebase: {...},
  firestore: {...}
}
```
It's quite simple and doesn't need explanation. `firebase` and `firestore` are in the state because  I use [react-redux-firebase](http://react-redux-firebase.com/`). The design of this lib forces to do that. Not sure yet whether that's a good idea but it facilitates the interaction with the data store.
  
##Road map

List of next actions to tackle (not ordered):

* Find a way to mock Firebase or Firestore in order to test behaviour between components
* Split `UserDetails`. It's becoming a monster as it does much think. A good start is to extract the createX method as components.
* Split `Header`. Same as `UserDetails`
* Make the app responsive,
 



