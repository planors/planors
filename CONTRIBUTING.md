# Contributing

Every contribution will help the project, even if it's just a small wording fix or a big change in core :)

- Make sure that there are no existing issues related to your problem before creating a new issue (check closed ones too), and the same goes for PRs as well

> TODO:s are in the Github Projects tab 😉

## Issues

If you have found a bug or would like to propose a new feature, [Github Issues](https://github.com/LukaHietala/planors/issues) are the good place to make it public. This project has a issue template to make sure that the issues are detailed enough.

## Development workflow

All the pull requests should go aganist the `main` branch or a branch that you will like to create another PR. (AKA. Stacked PR).

Requirements:

- Git
- Node.js
- PNPM

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

We use `pnpm` for the package manager for this project, so make sure that it's installed and up to date

```
pnpm install
```

To run the project you need to do the following steps:

- Create Github OAuth application and link it's credentials to the `.env` file
  - `Homepage url` should be set to `http://localhost:3000`
  - `Authorization callback URL` should be set to `http://localhost:3000/api/auth/callback/github`

The OAuth step will likely become optional step later, but now in order to run the app locally you need to follow steps above

After you have done that run the app with the following commands

```
pnpm db:push # This will create the database tables
pnpm db:generate # This will generate the prisma client (for typescript)
pnpm dev # This will start the app and database management tool (prisma studio)
```

## Creating a new pull request

All the linting and build test will be run automatically when you create a new PR, but you can run them locally with the following commands (recommended):

```
pnpm lint
pnpm build
```

- Make sure that you have created a new branch for your changes

If you have any questions, feel free to ask them in the [Discord Server](https://discord.gg/Cb5XdXYSJh)

## Project Overview

### `apps/web`

The main web application for the project.

### `apps/docs` (Coming soon)

This is the documentation site for the project. It's built using Astro and Tailwind. This is the place where you can find all the information about the project, how to use it, how to contribute and so on. [Pull request for the docs](https://github.com/LukaHietala/planors/pull/47)

### `packages/api`

This package contains the API for the project and it's built using tRPC. The API is used for authentication, database management, etc.

#### Routes

Routes are located in the `packages/api/src/routes` folder. Each route is a file that exports procedures that are used for mutations and queries. There are two types of procedures: `publicProcedure` and `protectedProcedure`. The `publicProcedure` is used for procedures that don't require authentication and the `protectedProcedure` is used for procedures that require authentication.

All the routes are put together in the `packages/api/src/root.ts` file to the `appRouter` and then the `appRouter` is exported to the `packages/api/src/index.ts` file.

- [tRPC](https://trpc.io/)
- [tRPC Next.js](https://trpc.io/docs/nextjs)
- [tRPC docs](https://trpc.io/docs)

### `packages/auth`

This package contains the authentication logic for the project. It's built using NextAuth.js and it's used for Github OAuth authentication.

### `packages/config/*`

Contains the global configuration for the project such as the design system with Tailwind and eslint configuration.

#### Structure

```
packages/config
├── eslint
│   ├── index.js # Eslint configuration
└── tailwind
    ├── index.js # Tailwind configuration with the design system (colors, etc.)
    └── postcss.js # PostCSS configuration for Tailwind
```

### `packages/db`

This package contains the database management logic for the project. It's built using Prisma and it's used for database migrations, seeding, etc.

> Feel free to improve this guide if you find something that is missing or could be improved
