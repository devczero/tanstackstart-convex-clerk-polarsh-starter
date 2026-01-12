import { createFileRoute, Link } from '@tanstack/react-router';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/tanstack-react-start';
import { CheckoutLink } from '@convex-dev/polar/react';
import { useSubscription } from '~/hooks/useSubscription';
import { api } from '../../convex/_generated/api';

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Choose Your Plan</h1>
      <p className="text-center text-gray-600 mb-12">
        Start free, upgrade when you're ready
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <FreePlanCard />

        {/* Pro Plan */}
        <ProPlanCard />
      </div>
    </div>
  );
}

function FreePlanCard() {
  const { isPro } = useSubscription();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
      <h3 className="text-2xl font-bold mb-2 text-gray-900">Free</h3>
      <p className="text-4xl font-bold mb-6 text-gray-900">$0<span className="text-lg text-gray-600">/mo</span></p>
      <ul className="space-y-3 mb-8">
        <li className="flex items-center gap-2 text-gray-900">
          <span className="text-green-600">✓</span> Basic features
        </li>
        <li className="flex items-center gap-2 text-gray-900">
          <span className="text-green-600">✓</span> Limited usage
        </li>
        <li className="flex items-center gap-2 text-gray-900">
          <span className="text-green-600">✓</span> Community support
        </li>
      </ul>
      <SignedIn>
        {!isPro ? (
          <div className="w-full bg-green-100 text-green-800 py-3 rounded-md text-center font-semibold">
            Current Plan
          </div>
        ) : (
          <button className="w-full bg-gray-200 text-gray-500 py-3 rounded-md cursor-not-allowed" disabled>
            Downgrade
          </button>
        )}
      </SignedIn>
      <SignedOut>
        <SignUpButton mode="modal">
          <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300 transition-colors font-medium">
            Get Started Free
          </button>
        </SignUpButton>
      </SignedOut>
    </div>
  );
}

function ProPlanCard() {
  const { isPro } = useSubscription();

  return (
    <div className={`bg-white rounded-lg p-8 shadow-sm ${isPro ? 'border-2 border-green-500' : 'border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
        {isPro && <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">Active</span>}
      </div>
      <p className="text-4xl font-bold mb-6 text-gray-900">$9.99<span className="text-lg text-gray-600">/mo</span></p>
      <ul className="space-y-3 mb-8">
        <li className="flex items-center gap-2 text-gray-900">
          <span className="text-green-600">✓</span> All basic features
        </li>
        <li className="flex items-center gap-2 text-gray-900">
          <span className="text-green-600">✓</span> Unlimited usage
        </li>
        <li className="flex items-center gap-2 text-gray-900">
          <span className="text-green-600">✓</span> Priority support
        </li>
        <li className="flex items-center gap-2 text-gray-900">
          <span className="text-green-600">✓</span> Advanced analytics
        </li>
      </ul>

      <SignedIn>
        {isPro ? (
          <Link
            to="/settings"
            className="block w-full bg-gray-900 text-white text-center py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            Manage Subscription
          </Link>
        ) : (
          <CheckoutLink
            polarApi={api.subscriptions}
            productIds={[import.meta.env.VITE_POLAR_PRODUCT_PRO_ID]}
            className="block w-full bg-gray-900 text-white text-center py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            Subscribe Now
          </CheckoutLink>
        )}
      </SignedIn>

      <SignedOut>
        <SignUpButton mode="modal">
          <button className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
            Get Started
          </button>
        </SignUpButton>
      </SignedOut>
    </div>
  );
}
