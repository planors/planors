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

And when you are done with your changes, push it to your forked repository and create a new PR

```
git push origin BRANCH_NAME
```

### Setting up the project

We use `npm` for the package manager for this project (for now), so make sure that it's installed and up to date

```
npm install
```

To run the project you need to do the following steps:

- Create a mysql db on your local machine, or you can use serverless database options like Planetscale. After you have done that copy `.env.example` and change it's name to `.env` and update the `DATABASE_URL` accordingly.
- Create Github OAuth application and link it's credentials to the `.env` file
  - `Homepage url` should be set to `http://localhost:3000`
  - `Authorization callback URL` should be set to `http://localhost:3000/api/auth/callback/github`

The OAuth step will likely become optional step later, but now in order to run the app locally you need to follow steps above

After you have done that run the app with the following commands

```
npx prisma db push &&
npm run dev
```

### Project Overview

The project is built on top of the [T3 Stack](https://create.t3.gg/) so when contributing you should see their docs to get some sense of the project.

More information coming soon...

## Creating a new pull request

All the linting and build test will be run automatically when you create a new PR, but you can run them locally with the following commands (recommended):

```
npm run lint
npm run build
```

- Make sure that you have created a new branch for your changes

If you have any questions, feel free to ask them in the [Discord Server](https://discord.gg/Cb5XdXYSJh)
