import { RegisterForm } from '@/components/auth/RegisterForm'
import { AuthImageSection } from '@/components/auth/AuthImageSection'

export default function RegisterPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl font-bold mb-6">Créer un compte</h1>
          <RegisterForm />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Déjà un compte ?{' '}
              <a href="/login" className="text-primary hover:underline">
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <AuthImageSection />
    </div>
  )
}