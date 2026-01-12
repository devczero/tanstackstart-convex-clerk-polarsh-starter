import { CustomerPortalLink } from '@convex-dev/polar/react';
import { useSubscription } from '~/hooks/useSubscription';
import { api } from '../../convex/_generated/api';

export function SubscriptionManager() {
  const { subscription, isPro } = useSubscription();

  if (!subscription || !isPro) {
    return (
      <div className="p-6 border rounded-lg">
        <h3 className="text-xl font-bold mb-2">No Active Subscription</h3>
        <p className="text-gray-600 mb-4">
          Upgrade to Pro to unlock premium features.
        </p>
        <a
          href="/pricing"
          className="inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          View Plans
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg">
      <h3 className="text-xl font-bold mb-2">Your Subscription</h3>
      <div className="mb-4">
        <p className="text-sm text-gray-600">Status</p>
        <p className="text-lg font-semibold capitalize">{subscription.status}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600">Next billing date</p>
      </div>
      <CustomerPortalLink
        polarApi={{
          generateCustomerPortalUrl: api.subscriptions.generateCustomerPortalUrl,
        }}
        className="inline-block bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
      >
        Manage Subscription
      </CustomerPortalLink>
    </div>
  );
}
