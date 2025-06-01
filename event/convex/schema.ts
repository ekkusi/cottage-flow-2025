import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  signups: defineTable({
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
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
}); 