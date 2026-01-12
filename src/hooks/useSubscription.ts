import { useSuspenseQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";

export function useSubscription() {
  // Single query - server derives isPro from productKey
  const { data } = useSuspenseQuery(
    convexQuery(api.subscriptions.getMySubscription, {})
  );

  return {
    subscription: data,
    isPro: data?.isPro ?? false,
    isFree: data?.isFree ?? true,
    isActive: data?.status === "active",
  };
}
