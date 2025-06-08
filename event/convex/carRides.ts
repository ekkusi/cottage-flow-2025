import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// List all car rides ordered by departure info
export const list = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("carRides"),
      _creationTime: v.number(),
      driverName: v.string(),
      phoneNumber: v.string(),
      departureInfo: v.string(),
      availableSeats: v.number(),
      passengers: v.array(
        v.object({
          name: v.string(),
          phoneNumber: v.string(),
          userId: v.optional(v.string()),
        }),
      ),
      userId: v.string(),
      isCreator: v.boolean(),
      isPassenger: v.boolean(),
    }),
  ),
  handler: async (ctx) => {
    // Verify user exists
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      return [];
    }

    const rides = await ctx.db
      .query("carRides")
      .withIndex("by_departureInfo")
      .order("asc")
      .collect();

    console.log(
      "Rides user ids",
      rides.map((ride) => ride.userId),
    );
    console.log("User id", user.id);

    // Add isCreator and isPassenger flags for privacy controls
    return rides.map((ride) => ({
      ...ride,
      isCreator: ride.userId === user.id,
      isPassenger: ride.passengers.some((p) => p.userId === user.id),
    }));
  },
});

// Create a new car ride
export const create = mutation({
  args: {
    driverName: v.string(),
    phoneNumber: v.string(),
    departureInfo: v.string(),
    availableSeats: v.number(),
  },
  returns: v.id("carRides"),
  handler: async (ctx, args) => {
    // Verify user exists
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.insert("carRides", {
      driverName: args.driverName,
      phoneNumber: args.phoneNumber,
      departureInfo: args.departureInfo,
      availableSeats: args.availableSeats,
      userId: user.id,
      passengers: [],
    });
  },
});

// Register as a passenger for a ride
export const registerForRide = mutation({
  args: {
    carRideId: v.id("carRides"),
    passengerName: v.string(),
    passengerPhone: v.string(),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    // Verify user exists
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const carRide = await ctx.db.get(args.carRideId);
    if (!carRide) {
      throw new Error("Car ride not found");
    }

    if (carRide.availableSeats <= 0) {
      return false;
    }

    // Check if passenger is already registered
    const isAlreadyRegistered = carRide.passengers.some(
      (p) => p.userId === user.id || p.phoneNumber === args.passengerPhone,
    );
    if (isAlreadyRegistered) {
      return false;
    }

    await ctx.db.patch(args.carRideId, {
      passengers: [
        ...carRide.passengers,
        {
          name: args.passengerName,
          phoneNumber: args.passengerPhone,
          userId: user.id,
        },
      ],
      availableSeats: carRide.availableSeats - 1,
    });

    return true;
  },
});

// Delete a car ride
export const deleteRide = mutation({
  args: {
    carRideId: v.id("carRides"),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const carRide = await ctx.db.get(args.carRideId);
    if (!carRide) {
      throw new Error("Car ride not found");
    }

    // Only the creator can delete the ride
    if (carRide.userId !== user.id) {
      throw new Error("Only the creator can delete the ride");
    }

    await ctx.db.delete(args.carRideId);
    return true;
  },
});

// Unregister from a ride
export const unregisterFromRide = mutation({
  args: {
    carRideId: v.id("carRides"),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const carRide = await ctx.db.get(args.carRideId);
    if (!carRide) {
      throw new Error("Car ride not found");
    }

    // Find the passenger to remove
    const passengerIndex = carRide.passengers.findIndex(
      (p) => p.userId === user.id,
    );

    if (passengerIndex === -1) {
      throw new Error("You are not registered for this ride");
    }

    // Remove the passenger and update available seats
    const updatedPassengers = [
      ...carRide.passengers.slice(0, passengerIndex),
      ...carRide.passengers.slice(passengerIndex + 1),
    ];

    await ctx.db.patch(args.carRideId, {
      passengers: updatedPassengers,
      availableSeats: carRide.availableSeats + 1,
    });

    return true;
  },
});

// Edit a car ride
export const editRide = mutation({
  args: {
    carRideId: v.id("carRides"),
    driverName: v.string(),
    phoneNumber: v.string(),
    departureInfo: v.string(),
    availableSeats: v.number(),
  },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const carRide = await ctx.db.get(args.carRideId);
    if (!carRide) {
      throw new Error("Car ride not found");
    }

    // Only the creator can edit the ride
    if (carRide.userId !== user.id) {
      throw new Error("Only the creator can edit the ride");
    }

    // Don't allow reducing seats below the number of current passengers
    if (args.availableSeats < 0) {
      throw new Error("Cannot reduce the available seats below 0");
    }

    await ctx.db.patch(args.carRideId, {
      driverName: args.driverName,
      phoneNumber: args.phoneNumber,
      departureInfo: args.departureInfo,
      availableSeats: args.availableSeats,
    });

    return true;
  },
});
