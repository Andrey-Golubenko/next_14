import NextAuth from 'next-auth'
import { NextResponse, userAgent } from 'next/server'

import authConfig from '~/libs/auth/auth.config'
import {
  AUTH_ROUTES,
  API_AUTH_PREFIX,
  DEFAULT_LOGIN_REDIRECT
} from '~/utils/constants/routes'
import { PATHS } from '~/utils/constants/constants'
import { isPublicRoute } from '~/utils/helpers/helpers'

const { auth } = NextAuth(authConfig)

// Our Middleware
export default auth((request) => {
  // User agent detection
  const ua = userAgent(request)
  const isMobile = ua.device.type === 'mobile'

  // Authentication logic
  const { nextUrl } = request
  const { pathname } = nextUrl
  const isLoggedIn = !!request?.auth

  const isApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX)
  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  let response = NextResponse.next()
  response.headers.set('x-device-type', isMobile ? 'mobile' : 'desktop')

  if (isApiAuthRoute) {
    return response
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      response.headers.set(
        'x-device-type',
        isMobile ? 'mobile' : 'desktop'
      )

      response = NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
      )

      return response
    }
    return response
  }

  if (!isLoggedIn && !isPublicRoute(pathname)) {
    let callbackUrl = pathname

    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    response.headers.set('x-device-type', isMobile ? 'mobile' : 'desktop')

    response = NextResponse.redirect(
      new URL(`${PATHS.logIn}?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    )

    return response
  }

  return response
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
