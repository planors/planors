## Wiki app ([unnamed](https://github.com/LukaHietala/wiki-app/issues/14))
<p>
  <a href="https://github.com/LukaHietala/wiki-app/blob/main/LICENSE">
    <img alt="This app is released under the MIT license." src="https://img.shields.io/badge/license-MIT-blue.svg"  />
  </a>
  <a href="https://github.com/LukaHietala/wiki-app/blob/main/CONTRIBUTING.md">
    <img alt="PRs welcome!" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat"  />
  </a>
  <a href="https://discord.gg/Cb5XdXYSJh">
    <img alt="Link to Discord" src="https://img.shields.io/discord/1079022930039689246?color=738ad6&label=Chat%20on%20Discord&logo=discord&logoColor=ffffff&widge=false"/>
  </a>
</p>
<hr />

**Work in progress** 🚧

Open-source app for managing projects and their wikis, roadmaps, todos, etc. This project is in the very early stages of development, so there are not many features yet. The `projects` tab on GitHub lists all the planned features. If you want to contribute, you can check the [contributing guidelines](CONTRIBUTING.md)

This project is a monorepo powered by [Turborepo](https://turbo.build/repo) and `pnpm`.

- `apps/web` - Contains the main web application (Next.js)
- `apps/docs` - Documentation for this project built with Astro ([WIP](https://github.com/LukaHietala/wiki-app/pull/47))

There are alsome other packages in the `packages` folder, and you can read more about them in the [contributing guidelines](CONTRIBUTING.md) :)

Awesome open-source technologies that are used in this project

- [tRPC](https://trpc.io/)
- [Next.js](https://nextjs.org/)
- [Next-auth.js (Now known as Auth.js)](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)

### Planned features

Important note: This project is in the very very early stages of development, so the direction of the project might change, and some of the planned features might not be implemented or might be implemented in a different way. 

Also, the features listed here are not in any particular order.

- Create customizable and interactive wikis for users (not just borning text)
- Diagrams (w/ Excalidraw)
- Revisions
- View stats of your wikis
- Display stats (like in [stateofjs.com](https://stateofjs.com/en-us/))
- Roadmap planning
- GitHub integration
- Ability to selfhost so you can integrate easily with existing sites
- Collaboration
- Store to GitHub repository or the database
- [Others planned features](https://github.com/users/LukaHietala/projects/9?query=is%3Aopen+sort%3Aupdated-desc)

Do you have any ideas for features? You can create an issue or join to the [Discord](https://discord.gg/Cb5XdXYSJh) server and discuss about it there 😉

### Getting started

A guide for getting started with the project and contributing. If you want more detailed info about contributing, you can check the [contributing guidelines](CONTRIBUTING.md)

Found a bug? Create an detailed issue and we'll try to fix it as soon as possible, or if you want, you can fix it yourself and create a Pull Request

#### Environment variables

- `DATABASE_URL` - The URL to the database
- `NEXTAUTH_URL` - The URL to the app (used by NextAuth.js)
- `GITHUB_CLIENT_ID` - The GitHub OAuth app client ID
- `GITHUB_CLIENT_SECRET` - The GitHub OAuth app client secret
- `NEXTAUTH_SECRET` - The secret used by NextAuth.js. Create a random string by using the `openssl rand -base64 32` command on linux/macOS

#### Local development

1. Clone the repository and `cd` into it
2. Install [pnpm](https://pnpm.io/)
3. Run `pnpm install` in the root of the project
4. Copy `.env.example` to `.env` and fill in the values, more info in the [contributing guidelines](CONTRIBUTING.md)
6. Run `pnpm db:push` to push schema changes to the database
7. Run `pnpm db:seed` to seed the database with some dummy data (coming)
8. Run `pnpm db:generate` to generate the Prisma client (you need to run this after every schema change)
9. Run `pnpm dev` to start the development server

When you start the development server, you can access the app at `http://localhost:3000` and the Prisma Studio at `http://localhost:5555`. Prisma Studio is a GUI for the database, so you can use it to check the database and make changes to it. Note that `pnpm build` also lints the code, so you don't need to run `pnpm lint` separately.

After you are done with the development, you can run `pnpm build` to build the app and `pnpm start` to start the production server 

Encountered any problems? Create an issue and we'll try to help you out

#### Selfhosting (WIP)

The selfhosting possibilities are not yet implemented. 

### Obtaining secrets

Guide for obtaining the secrets needed for the app to work properly.

#### GitHub OAuth app

Note: Github Oauth app can only take one redirect- and home URL, so you can't use the same app for both the production and development environments. You need to create a new app for each environment. 

1. Open [GitHub](https://github.com) and open the developer settings and create a new OAuth app
2. Set the homepage URL to the URL of the app (e.g. `http://localhost:3000`)
3. Set the redirect URL to the URL of the app (e.g. `http://localhost:3000/api/auth/callback/github`)
4. Copy the client ID and client secret for the next step
5. Set the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` environment variables to the client ID and client secret respectively in the `.env` file
6. Set the `NEXTAUTH_URL` environment variable to the URL of the app (e.g. `http://localhost:3000`)


### License

> This app is licensed under the [MIT license](https://github.com/LukaHietala/create-wiki/blob/main/LICENSE)
