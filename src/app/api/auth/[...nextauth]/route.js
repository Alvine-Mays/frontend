// src/app/api/auth/[...nextauth]/route.js
import { NextResponse } from 'next/server'
import api from '@/lib/api'

export async function POST(request) {
  try {
    const { identifier, password } = await request.json()
    const { data } = await api.post('/users/login', { identifier, password })
    
    const response = NextResponse.json(data)
    
    // Set HTTP-only cookies
    response.cookies.set('ophrus_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    })
    
    response.cookies.set('ophrus_refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
    
    return response
  } catch (error) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Authentication failed' },
      { status: 401 }
    )
  }
}