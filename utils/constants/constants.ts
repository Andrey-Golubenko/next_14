// eslint-disable-next-line import/no-cycle
import { INavLink } from '~/types/types'

export const PATHS = {
  home: '/',
  blog: '/blog',
  newPost: '/blog/new-post',
  editPost: '/edit-post',
  posts: '/api/posts',
  about: '/about',
  constacts: '/about/contacts',
  team: '/about/team',
  profile: '/profile',
  settings: '/settings',
  admin: '/admin',

  signIn: '/auth',
  logIn: '/auth/login',
  register: '/auth/register',
  emailVerification: '/auth/email-verification',
  resetPassword: '/auth/reset-password',
  newPassword: '/auth/new-password',
  error: '/auth/error',

  authActionsPref: '/api/auth',

  apiAdmin: '/api/admin',

  libSession: '/api/auth/session',
  libSignIn: '/api/auth/signin'
}

export const IMAGES_PATHS = {
  logo: '/images/logo.svg',
  noImages: '/images/image-placeholder.svg',
  heroBanner: '/images/hero-banner.webp'
  // heroBanner: '/images/ai.webp'
}

export const NAV_LINKS: INavLink[] = [
  { label: 'Home', href: PATHS.home },
  { label: 'Blog', href: PATHS.blog },
  { label: 'About', href: PATHS.about }
]

export const PRIVATE_NAV_LINKS: INavLink[] = [
  { label: 'Profile', href: PATHS.profile },
  { label: 'Admin', href: PATHS.admin },
  { label: 'Settings', href: PATHS.settings }
]

export const AUTH_ERRORS = {
  duplicateCred: 'OAuthAccountNotLinked'
}

export const ONE_HOUR = new Date(new Date().getTime() + 3600 * 1000)

export const FIFTEEN_MINUTES = new Date(new Date().getTime() + 900 * 1000)

export const FIVE_MINUTES = new Date(new Date().getTime() + 300 * 1000)

export const ECCEPTED_IMAGES_EXTENTIONS = [
  '.jpeg',
  '.jpg',
  '.png',
  '.heic',
  '.heif',
  '.webp'
]

export const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2 MB

export const MAX_FILES_COUNT = 8

export const CLOUDINARY_IMAGE_FOLDER = 'nextjs-blog'

export const SCREEN_SM = 480

export const SCREEN_MD = 768
