import { createFileRoute, Link } from '@tanstack/react-router';
import { useSubscription } from '~/hooks/useSubscription';

export const Route = createFileRoute('/_authed/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const { isPro } = useSubscription();

  if (!isPro) {
    return <UpgradeView />;
  }

  return <ProDashboardView />;
}

function UpgradeView() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Upgrade to Pro
        </h1>
        <p className="text-gray-600 mb-6">
          The Dashboard is a premium feature. Upgrade to Pro to unlock access to advanced analytics, insights, and more.
        </p>
        <Link
          to="/pricing"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors border border-gray-900 font-medium"
        >
          View Pricing Plans
        </Link>
      </div>
    </div>
  );
}

function ProDashboardView() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">You are PRO now!</h1>
      </div>
    </div>
  );
}
