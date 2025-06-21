// src/middleware.js
import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request) {
  const token = request.cookies.get('ophrus_token')?.value
  const { pathname } = request.nextUrl

  // Routes protégées
  const protectedRoutes = [
    '/account',
    '/account/favoris',
    '/account/messages'
  ]

  // Routes admin
  const adminRoutes = [
    '/admin',
    '/admin/properties',
    '/admin/users'
  ]

  // Vérifier si la route est protégée
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  
  // Vérifier si la route est admin
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route))

  if (isProtectedRoute || isAdminRoute) {
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    try {
      const decoded = await verifyToken(token)
      const user = decoded.user

      // Vérification des routes admin
      if (isAdminRoute && user.role !== 'admin') {
        return NextResponse.redirect(new URL('/account', request.url))
      }

      // Injecter les données utilisateur dans les headers
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user', JSON.stringify(user))

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        }
      })
    } catch (error) {
      console.error('Token verification failed:', error)
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}