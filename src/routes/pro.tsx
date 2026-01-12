import { createFileRoute, redirect } from '@tanstack/react-router';
import { convexQuery } from '@convex-dev/react-query';
import { api } from '../../convex/_generated/api';

export const Route = createFileRoute('/pro')({
  beforeLoad: async ({ context }) => {
    // Check subscription before loading page
    // This uses the dedicated hasActiveSubscription query for route protection
    const hasActive = await context.queryClient.fetchQuery(
      convexQuery(api.subscriptions.hasActiveSubscription, {})
    );

    if (!hasActive) {
      throw redirect({
        to: '/pricing',
        search: {
          message: 'This page requires a Pro subscription',
        },
      });
    }
  },
  component: ProPage,
});

function ProPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-semibold">
            ✓ Pro Subscription Active
          </p>
        </div>

        <h1 className="text-3xl font-bold mb-6">Pro Features</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-gray-600">
              Access detailed insights and metrics about your usage.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Priority Support</h3>
            <p className="text-gray-600">
              Get help faster with our priority support queue.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Unlimited Usage</h3>
            <p className="text-gray-600">
              No limits on API calls, storage, or features.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">API Access</h3>
            <p className="text-gray-600">
              Integrate with external services via our API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
