import { useSubscription } from '~/hooks/useSubscription';
import { SignedIn } from '@clerk/tanstack-react-start';
import { Link } from '@tanstack/react-router';

export function SubscriptionBadge() {
  return (
    <SignedIn>
      <SubscriptionBadgeInner />
    </SignedIn>
  );
}

function SubscriptionBadgeInner() {
  const { isPro } = useSubscription();

  if (isPro) {
    return (
      <Link
        to="/settings"
        className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full hover:bg-green-200 transition-colors"
      >
        Pro ✓
      </Link>
    );
  }

  return (
    <Link
      to="/pricing"
      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
    >
      Upgrade
    </Link>
  );
}
