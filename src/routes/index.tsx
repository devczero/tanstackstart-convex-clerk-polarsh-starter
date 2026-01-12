import { createFileRoute, Link } from '@tanstack/react-router'
import { SignedIn, SignedOut, SignUpButton } from '@clerk/tanstack-react-start'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <img
        src="/image.png"
        alt="TanStack Start"
        className="w-64 h-64 mb-8"
      />
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        TanStack Start + Convex + Clerk + Polar.sh Starter
      </h1>
      <SignedOut>
        <SignUpButton mode="modal">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors border border-gray-900 font-medium text-lg">
            Get Started
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <Link
          to="/dashboard"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors border border-gray-900 font-medium text-lg"
        >
          Go to Dashboard
        </Link>
      </SignedIn>
    </div>
  )
}
