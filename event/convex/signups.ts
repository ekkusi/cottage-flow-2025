import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("signups")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    stayDuration: v.union(
      v.literal("fri-sun"),
      v.literal("fri-sat"),
      v.literal("sat-sun"),
      v.literal("only-fri"),
      v.literal("only-sat")
    ),
    diet: v.string(),
    additionalInfo: v.string(),
  },
  handler: async (ctx, args) => {
    const signupId = await ctx.db.insert("signups", {
      ...args,
      createdAt: Date.now(),
    });
    return signupId;
  },
}); 