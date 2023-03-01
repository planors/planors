import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const wikiRouter = createTRPCRouter({
  // For the dashboard
  getWiki: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const wiki = await ctx.prisma.wiki.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
          pages: true,
        },
      });
      if (!wiki) {
        throw new Error("Wiki not found");
      }
      if (wiki.authorId !== ctx.session.user.id) {
        throw new Error("You are not the author of this wiki");
      }
      return wiki;
    }),

  getWikisByAuthor: publicProcedure
    .input(z.object({ authorId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { authorId } = input;
      const wikis = await ctx.prisma.wiki.findMany({
        where: {
          authorId,
        },
        include: {
          author: true,
          pages: true,
        },
      });
      return wikis;
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const wiki = await ctx.prisma.wiki.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
          pages: true,
        },
      });
      return wiki;
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        intro: z.string(),
        authorId: z.string(),
        github: z.string(),
        website: z.string(),
        draft: z.boolean(),
        visibility: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { title, intro, description, draft, github, visibility, website } =
        input;
      const wiki = await ctx.prisma.wiki.create({
        data: {
          authorId: input.authorId,
          title,
          intro,
          github,
          website,
          draft,
          visibility,
          description,
        },
      });
      return wiki;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const wiki = await ctx.prisma.wiki.findUnique({
        where: {
          id,
        },
        select: {
          authorId: true,
        },
      });
      if (!wiki) {
        throw new Error("Wiki not found");
      }
      if (wiki.authorId !== ctx.session.user.id) {
        throw new Error("You are not the author of this wiki");
      }
      const deletedWiki = await ctx.prisma.wiki.delete({
        where: {
          id,
        },
      });
      return deletedWiki;
    }),
});
