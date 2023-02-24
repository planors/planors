# Contributing

Every contribution will help the project, even if it's just a small wording fix or a big change in core :) 

- Make sure that there are no existing issues related to your problem before creating a new issue (check closed ones too), and the same goes for PRs as well

> TODO:s are in the Github Projects tab 😉

## Issues

If you have found a bug or would like to propose a new feature, [Github Issues]() are the good place to make it public. This project does not have a "Issue template", but be sure to provide as much information as possible. Screenshots, video, errors, code. etc. 

## Development workflow

All the pull requests should go aganist the `main` branch or a branch that you will like to create another PR. (AKA. Stacked PR). 

Requirements:

- Git
- Node.js w/ npm

### Git/Github

1. Fork the repository and clone it to your local machine
2. Create a new branch

```
git checkout -b BRANCH_NAME
```

### Setting up the project

We use `npm` for the package manager for this project (for now), so make sure that it's installed and up to date

```
npm install
```

Then you need to create a mysql db on your local machine, or you can use serverless database options like Planetscale. After you have done that copy `.env.example` and change it's name to `.env` and update the `DATABASE_URL` accordingly.

- TODO: MORE INTRUCTIONS ABOUT OAuth system
- TODO: ADD MORE INSTRUCTIONS ABOUT MAKING THE PR
- TODO: PROJECT OVERVIEW
