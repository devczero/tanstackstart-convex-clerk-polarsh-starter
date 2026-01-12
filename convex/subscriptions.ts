import { Polar } from "@convex-dev/polar";
import { components } from "./_generated/api";
import { query } from "./_generated/server";

// Initialize Polar client
// Note: Using Clerk's identity.subject as userId (not following standard Polar pattern)
// Standard pattern would use Convex user._id from a users table
export const polar = new Polar(components.polar, {
  getUserInfo: async (ctx) => {
    const identity = await (ctx as any).auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    return {
      userId: identity.subject, // Using Clerk user ID directly
      email: identity.email || "",
    };
  },
  server: "sandbox",
  products: {
    pro: process.env.POLAR_PRODUCT_PRO_ID || "",
  },
});

// Helper query to get current user's subscription with derived flags
export const getMySubscription = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const subscription = await polar.getCurrentSubscription(ctx as any, {
      userId: identity.subject,
    });

    // Derive isPro flag based on product key
    const isPro = subscription?.productKey === "pro" && subscription?.status === "active";

    return {
      ...subscription,
      isPro,
      isFree: !subscription,
    };
  },
});

// Export API functions from the Polar client
export const {
  changeCurrentSubscription,
  cancelCurrentSubscription,
  getConfiguredProducts,
  listAllProducts,
  generateCheckoutLink,
  generateCustomerPortalUrl,
} = polar.api();

// Debug query to sync/check products
export const debugSyncProducts = query({
  args: {},
  handler: async (ctx) => {
    const products = await polar.listProducts(ctx as any);
    return products;
  },
});
