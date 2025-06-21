// src/components/auth/AuthForm.jsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AuthForm({ onSubmit, error, type = 'login' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await onSubmit({ email, password })
    setIsLoading(false)
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="password">
            Mot de passe
            {type === 'register' && (
              <span className="text-xs text-gray-500 ml-2">(6 caractères minimum)</span>
            )}
          </Label>
          <Input
            id="password"
            type="password"
            autoComplete={type === 'login' ? 'current-password' : 'new-password'}
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <FaSpinner className="animate-spin mr-2" />
              {type === 'login' ? 'Connexion...' : 'Création...'}
            </span>
          ) : (
            type === 'login' ? 'Se connecter' : 'Créer un compte'
          )}
        </Button>
      </div>
    </form>
  )
}