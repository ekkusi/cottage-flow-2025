import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

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

  carRides: defineTable({
    driverName: v.string(),
    phoneNumber: v.string(),
    departureInfo: v.string(), // Combined leaving location and time
    availableSeats: v.number(),
    passengers: v.array(v.object({
      name: v.string(),
      phoneNumber: v.string(),
      userId: v.optional(v.string()), // Clerk user ID for authenticated users
    })),
    userId: v.string(), // Clerk user ID of the driver
  }).index("by_departureInfo", ["departureInfo"])
    .index("by_user_id", ["userId"]),
}); 