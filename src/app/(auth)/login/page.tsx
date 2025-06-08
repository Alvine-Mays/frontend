import { LoginForm } from '@/components/auth/LoginForm'
import { AuthImageSection } from '@/components/auth/AuthImageSection'

export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl font-bold mb-6">Connexion</h1>
          <LoginForm />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Pas encore de compte ?{' '}
              <a href="/register" className="text-primary hover:underline">
                Créer un compte
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <AuthImageSection />
    </div>
  )
}