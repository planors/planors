# Contributing guide

Every contribution will help the project, even if it's just a small wording fix or a big change in core :)

## Useful information

- Make sure that there are no existing issues related to your problem before creating a new issue (check closed ones too), and the same goes for PRs as well
- Planors does not use `pre-commit` hooks with Husky. All the linting a build validation is done on the CI
- `e2e` testting is not implemented yet

## Development Workflow

### Prerequisites

```bash
# Make sure that you have the following packages installed
node: "^18.14.2" # Don't use the latest version because next-auth does not support it
pnpm "^7.29.0"
```

### Setting up your local project

We use `pnpm` for the package manager for this project, so make sure that it's installed and up to date

```bash
git clone ... &&
cd planors &&
pnpm install
```

Then in order to make changes follow the steps below: 

```bash
# Create a new branch to make changes to
git checkout -b BRANCH_NAME
# Push your changes to the branch your created
git push origin BRANCH_NAME
```

Now in order to run the app locally you need to create a Github OAuth application and get fill the required fields in the `.env` file. Let's set the required `env` values

Required `.env` values:

- `DATABASE_URL` - The URL to the database
- `NEXTAUTH_URL` - The URL to the app (used by NextAuth.js)
- `GITHUB_CLIENT_ID` - The GitHub OAuth app client ID
- `GITHUB_CLIENT_SECRET` - The GitHub OAuth app client secret
- `NEXTAUTH_SECRET` - The secret used by NextAuth.js


First copy the `.env.example` and rename it to `.env` and the use `openssl rand -base64 32` command on linux/macOS to generate a string for the `NEXTAUTH_SECRET`

After it you need to setup the GitHub OAuth application to fill the other required values. Here's some instructions how to do it:

1. Open [GitHub](https://github.com) and open the developer settings and create a new OAuth app
2. Set the homepage URL to the URL of the app (e.g. `http://localhost:3000`)
3. Set the redirect URL to the URL of the app (e.g. `http://localhost:3000/api/auth/callback/github`)
4. Copy the client ID and client secret for the next step
5. Set the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` environment variables to the client ID and client secret respectively in the `.env` file
6. Set the `NEXTAUTH_URL` environment variable to the URL of the app (e.g. `http://localhost:3000`)

Note: Github Oauth app can only take one redirect- and home URL, so you can't use the same app for both the production and development environments. You need to create a new app for each environment.

After all of that you can push the schema to the database, generate required types for `@prisma/client` and run the app in `localhost:3000` (and prisma studio in `localhost:5556`)

```bash
pnpm db:push # This will create the database tables
pnpm db:generate # This will generate the prisma client (for typescript)
pnpm dev # This will start the app and database management tool (prisma studio)
```

### Project structure

#### `apps/web`

The main web application for the project.

#### `apps/docs` (Coming soon)

This is the documentation site for the project. It's built using Astro and Tailwind. This is the place where you can find all the information about the project, how to use it, how to contribute and so on. [Pull request for the docs](https://github.com/planors/planors/pull/47)

#### `packages/api`

This package contains the API for the project and it's built using tRPC. The API is used for authentication, database management, etc.

##### Routes

Routes are located in the `packages/api/src/routes` folder. Each route is a file that exports procedures that are used for mutations and queries. There are two types of procedures: `publicProcedure` and `protectedProcedure`. The `publicProcedure` is used for procedures that don't require authentication and the `protectedProcedure` is used for procedures that require authentication.

All the routes are put together in the `packages/api/src/root.ts` file to the `appRouter` and then the `appRouter` is exported to the `packages/api/src/index.ts` file.

- [tRPC](https://trpc.io/)
- [tRPC Next.js](https://trpc.io/docs/nextjs)
- [tRPC docs](https://trpc.io/docs)

#### `packages/auth`

This package contains the authentication logic for the project. It's built using NextAuth.js and it's used for Github OAuth authentication.

#### `packages/config/*`

Contains the global configuration for the project such as the design system with Tailwind and eslint configuration.

##### Structure

```bash
packages/config
├── eslint
│   ├── index.js # Eslint configuration
└── tailwind
    ├── index.js # Tailwind configuration with the design system (colors, etc.)
    └── postcss.js # PostCSS configuration for Tailwind
```

#### `packages/db`

This package contains the database management logic for the project. It's built using Prisma and it's used for database migrations, seeding, etc.

### Issues

If you have found a bug or would like to propose a new feature, [Github Issues](https://github.com/planors/planors/issues) are the good place to make it public. This project has a issue template to make sure that the issues are detailed enough.


### Creating a new pull request

All the linting and build test will be run automatically when you create a new PR, but you can run them locally with the following commands (recommended):

```bash
pnpm lint
pnpm build
```

- Make sure that you have created a new branch for your changes

If you have any questions, feel free to ask them in the [Discord Server](https://discord.gg/Cb5XdXYSJh)

> Feel free to improve this guide if you find something that is missing or could be improved
