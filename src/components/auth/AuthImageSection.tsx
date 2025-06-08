export function AuthImageSection() {
  return (
    <div className="hidden lg:block relative bg-gray-100">
      <div className="absolute inset-0 bg-primary/10">
        <img
          src="/assets/images/auth-bg.jpg"
          alt="Belle propriété"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center p-12 text-center">
        <div className="max-w-xl text-white">
          <h2 className="font-display text-4xl font-bold mb-4">
            Bienvenue chez Ophrus Immo
          </h2>
          <p className="text-lg">
            Votre partenaire de confiance pour trouver le bien immobilier parfait
          </p>
        </div>
      </div>
    </div>
  )
}