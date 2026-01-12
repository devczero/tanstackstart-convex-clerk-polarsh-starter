import { createFileRoute, Link } from '@tanstack/react-router';
import { CustomerPortalLink } from '@convex-dev/polar/react';
import { useSubscription } from '~/hooks/useSubscription';
import { api } from '../../../convex/_generated/api';

export const Route = createFileRoute('/_authed/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const { subscription, isPro } = useSubscription();

  if (!isPro || !subscription) {
    return <NoSubscriptionView />;
  }

  return <ActiveSubscriptionView subscription={subscription} />;
}

function NoSubscriptionView() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Settings</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-2 text-gray-900">No Active Subscription</h2>
        <p className="text-gray-600 mb-4">
          You're currently on the free plan. Upgrade to unlock premium features.
        </p>
        <Link
          to="/pricing"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors border border-gray-900 font-medium"
        >
          View Plans
        </Link>
      </div>
    </div>
  );
}

function ActiveSubscriptionView({ subscription }: { subscription: any }) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Subscription Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Subscription Status: {subscription.status}</h2>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-semibold">
            Pro ✓
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Product</p>
            <p className="text-lg font-semibold text-gray-900">Pro Plan</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Price</p>
            <p className="text-lg font-semibold text-gray-900">$9.99/month</p>
          </div>
        </div>

        <CustomerPortalLink
          polarApi={{
            generateCustomerPortalUrl: api.subscriptions.generateCustomerPortalUrl,
          }}
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors border border-gray-900 font-medium"
        >
          Manage Subscription
        </CustomerPortalLink>
      </div>
    </div>
  );
}
