export function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold text-primary mb-4">Ophrus Immo</h3>
            <p className="text-gray-300 mb-4">
              Votre partenaire immobilier de confiance depuis 2010. Nous vous accompagnons dans tous vos projets.
            </p>
            <div className="flex space-x-4">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="text-gray-300 hover:text-primary transition-colors"
                  aria-label={social}
                >
                  <span className="sr-only">{social}</span>
                  {/* Ici vous mettriez une icône */}
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {['Accueil', 'Biens', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-gray-300 space-y-2">
              <p>123 Avenue des Champs</p>
              <p>75008 Paris, France</p>
              <p>+33 1 23 45 67 89</p>
              <a href="mailto:contact@ophrus-immo.fr" className="hover:text-primary">
                contact@ophrus-immo.fr
              </a>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Ophrus Immo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}