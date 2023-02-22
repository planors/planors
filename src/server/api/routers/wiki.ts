import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const wikiRouter = createTRPCRouter({
  /*
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  */
  // Get single wiki
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const wiki = await ctx.prisma.wiki.findUnique({
        where: {
          id,
        },
      });
      return wiki;
    }),
  create: protectedProcedure
    .input(
      z.object({ title: z.string(), intro: z.string(), authorId: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, intro } = input;
      const wiki = await ctx.prisma.wiki.create({
        data: {
          authorId: input.authorId,
          title,
          intro,
        },
      });
      return wiki;
    }),
});
