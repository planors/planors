## Wiki app (unnamed)

**Work in progress**

Open-source app for managing projects and their wikis, roadmaps, todos, etc. This project is in the very early stages of development, so there are not many features yet. The `projects` tab on GitHub lists all the planned features. If you want to contribute, you can check the [contributing guidelines](CONTRIBUTING.md)

This project is a monorepo powered by [Turborepo](https://turbo.build/repo) and `pnpm`.

- `apps/web` - Contains the main web application (Next.js)
- `apps/docs` - Documentation for this project built with Astro ([WIP](https://github.com/LukaHietala/wiki-app/pull/47))

There are alsome other packages in the `packages` folder, and you can read more about them in the [contributing guidelines](CONTRIBUTING.md) :)

### Planned features

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


### Getting started

A guide for getting started with the project and contributing. 

#### Environment variables

- `DATABASE_URL` - The URL to the database
- `NEXTAUTH_URL` - The URL to the app (used by NextAuth.js)
- `GITHUB_CLIENT_ID` - The GitHub OAuth app client ID
- `GITHUB_CLIENT_SECRET` - The GitHub OAuth app client secret
- `NEXTAUTH_SECRET` - The secret used by NextAuth.js

#### Local development

1. Clone the repository
2. Install [pnpm](https://pnpm.io/)
3. Run `pnpm install` in the root of the project
4. Copy `.env.example` to `.env` and fill in the values, more info in the [contributing guidelines](CONTRIBUTING.md)
6. Run `pnpm db:push` to push schema changes to the database
7. Run `pnpm db:seed` to seed the database with some dummy data (coming)
8. Run `pnpm db:generate` to generate the Prisma client (you need to run this after every schema change)
5. Run `pnpm dev` to start the development server

#### Selfhosting

The selfhosting possibilities are not yet implemented

### Acknowledgements

Awesome open-source technologies that are used in this project

- [tRPC](https://trpc.io/)
- [Next.js](https://nextjs.org/)
- [Next-auth.js (Now known as Auth.js)](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)

If you want to contribute and discuss about different stuff, you can join to the [Discord](https://discord.gg/Cb5XdXYSJh) server of this project

> This app is licensed under the [MIT license](https://github.com/LukaHietala/create-wiki/blob/main/LICENSE)
