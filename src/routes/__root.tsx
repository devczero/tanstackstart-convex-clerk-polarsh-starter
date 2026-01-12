import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouteContext,
} from '@tanstack/react-router'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from '@clerk/tanstack-react-start'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import * as React from 'react'
import { auth } from '@clerk/tanstack-react-start/server'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import type { ConvexQueryClient } from '@convex-dev/react-query'
import type { ConvexReactClient } from 'convex/react'
import type { QueryClient } from '@tanstack/react-query'
import appCss from '~/styles/app.css?url'
import { SubscriptionBadge } from '~/components/SubscriptionBadge'
import { useSubscription } from '~/hooks/useSubscription'

const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { getToken, userId } = await auth()
  const token = await getToken({ template: 'convex' })

  return {
    userId,
    token,
  }
})

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  convexClient: ConvexReactClient
  convexQueryClient: ConvexQueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  beforeLoad: async (ctx) => {
    const clerkAuth = await fetchClerkAuth()
    const { userId, token } = clerkAuth
    // During SSR only (the only time serverHttpClient exists),
    // set the Clerk auth token to make HTTP queries with.
    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token)
    }

    return {
      userId,
      token,
    }
  },
  component: RootComponent,
})

function RootComponent() {
  const context = useRouteContext({ from: Route.id })

  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
      <ConvexProviderWithClerk client={context.convexClient} useAuth={useAuth}>
        <RootDocument>
          <Outlet />
        </RootDocument>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <NavBar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}

function NavBar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-6">
            <Link
              to="/"
              activeProps={{
                className: 'text-gray-900 font-semibold bg-gray-100',
              }}
              activeOptions={{ exact: true }}
              className="px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Home
            </Link>
            <SignedOut>
              <Link
                to="/pricing"
                activeProps={{
                  className: 'text-gray-900 font-semibold bg-gray-100',
                }}
                className="px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Pricing
              </Link>
            </SignedOut>
            <SignedIn>
              <FreePlanPricingLink />
              <Link
                to="/dashboard"
                activeProps={{
                  className: 'text-gray-900 font-semibold bg-gray-100',
                }}
                className="px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/settings"
                activeProps={{
                  className: 'text-gray-900 font-semibold bg-gray-100',
                }}
                className="px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Settings
              </Link>
            </SignedIn>
          </div>
          <div className="flex items-center gap-4">
            <SubscriptionBadge />
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  )
}

function FreePlanPricingLink() {
  const { isFree } = useSubscription()

  if (!isFree) return null

  return (
    <Link
      to="/pricing"
      activeProps={{
        className: 'text-gray-900 font-semibold bg-gray-100',
      }}
      className="px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
    >
      Pricing
    </Link>
  )
}
