// src/components/layout/Header.tsx
'use client'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Button } from '../ui/button'

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-display text-xl font-bold text-primary">Ophrus Immo</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/biens" className="text-gray-700 hover:text-primary transition-colors">
              Biens
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/profil">
                  <Button variant="ghost">Mon compte</Button>
                </Link>
                <Button onClick={logout} variant="outline">
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Connexion</Button>
                </Link>
                <Link href="/register">
                  <Button className="btn-primary">Inscription</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}