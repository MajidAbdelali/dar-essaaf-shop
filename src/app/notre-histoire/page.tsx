export default function NotreHistoirePage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Hero */}
      <div className="bg-[#1B4F8C] py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 70% 30%, #C8963E 0%, transparent 50%)',
        }} />
        <div className="relative z-10">
          <p className="text-[#C8963E] text-sm font-semibold uppercase tracking-widest mb-3">Depuis Djerba</p>
          <h1 className="font-serif text-5xl font-bold text-white mb-4">Notre Histoire</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
            Une île, une palme, une passion — l&apos;histoire de Dar-Essaaf est celle d&apos;un héritage vivant.
          </p>
          <div className="w-16 h-1 bg-[#C8963E] mx-auto mt-6" />
        </div>
      </div>

      {/* Djerba Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#C8963E] text-sm font-semibold uppercase tracking-widest mb-3">L&apos;île de Djerba</p>
            <h2 className="font-serif text-4xl font-bold text-[#1B4F8C] mb-6">
              La perle de la Méditerranée
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Djerba, la plus grande île d&apos;Afrique du Nord, est un joyau de culture, d&apos;histoire et de traditions. 
              Connue pour ses plages cristallines, ses oliveraies millénaires et sa population cosmopolite, 
              l&apos;île a toujours été un carrefour entre les civilisations.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Mais au cœur de Djerba, ce sont les palmeraies qui ont forgé l&apos;identité de ses habitants. 
              Le palmier n&apos;est pas qu&apos;un arbre — c&apos;est la colonne vertébrale d&apos;une économie artisanale 
              qui fait vivre des centaines de familles depuis des siècles.
            </p>
            <p className="text-gray-600 leading-relaxed">
              C&apos;est dans ce contexte unique que Dar-Essaaf a vu le jour, avec la mission de faire connaître 
              et préserver cet artisanat remarquable.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1B4F8C] rounded-2xl p-6 text-white">
              <div className="text-3xl font-bold text-[#C8963E] font-serif">514 km²</div>
              <div className="text-white/70 text-sm mt-1">Superficie de l&apos;île</div>
            </div>
            <div className="bg-[#C8963E] rounded-2xl p-6 text-white mt-6">
              <div className="text-3xl font-bold font-serif">3000+</div>
              <div className="text-white/80 text-sm mt-1">ans d&apos;histoire</div>
            </div>
            <div className="bg-[#0D2B4E] rounded-2xl p-6 text-white">
              <div className="text-3xl font-bold text-[#C8963E] font-serif">160,000</div>
              <div className="text-white/70 text-sm mt-1">habitants</div>
            </div>
            <div className="bg-[#4A90D9] rounded-2xl p-6 text-white mt-6">
              <div className="text-3xl font-bold font-serif">1er</div>
              <div className="text-white/80 text-sm mt-1">île touristique de Tunisie</div>
            </div>
          </div>
        </div>
      </section>

      {/* Palm Craftsmanship Section */}
      <section className="bg-[#1B4F8C] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#C8963E] text-sm font-semibold uppercase tracking-widest mb-3">Le Savoir-Faire</p>
            <h2 className="font-serif text-4xl font-bold text-white">
              L&apos;art du Sâf — صنعة السعف
            </h2>
            <div className="w-16 h-1 bg-[#C8963E] mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0D2B4E] rounded-2xl p-8">
              <div className="text-[#C8963E] text-4xl font-bold font-serif mb-4">01</div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">La Récolte</h3>
              <p className="text-white/60 leading-relaxed">
                Les feuilles de palmier (sâf) sont récoltées au printemps, lorsqu&apos;elles sont encore jeunes et souples. 
                La sélection est cruciale pour obtenir un matériau de qualité.
              </p>
            </div>
            <div className="bg-[#0D2B4E] rounded-2xl p-8 md:mt-8">
              <div className="text-[#C8963E] text-4xl font-bold font-serif mb-4">02</div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">Le Séchage</h3>
              <p className="text-white/60 leading-relaxed">
                Les palmes sont séchées au soleil pendant plusieurs jours, puis blanchies à la vapeur d&apos;eau salée 
                pour obtenir cette couleur dorée si caractéristique.
              </p>
            </div>
            <div className="bg-[#0D2B4E] rounded-2xl p-8">
              <div className="text-[#C8963E] text-4xl font-bold font-serif mb-4">03</div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">Le Tressage</h3>
              <p className="text-white/60 leading-relaxed">
                L&apos;art du tressage est transmis de mère en fille. Chaque motif a une signification particulière, 
                et les techniques varient selon les familles et les villages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Artisans Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-[#C8963E] text-sm font-semibold uppercase tracking-widest mb-3">Nos Artisanes</p>
          <h2 className="font-serif text-4xl font-bold text-[#1B4F8C]">Les Gardiennes du Savoir</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Dar-Essaaf travaille avec plus de 50 artisanes locales à travers toute l&apos;île de Djerba. 
            Chaque artisane est rémunérée équitablement pour son travail, et nous garantissons des conditions 
            de travail dignes et respectueuses.
          </p>
          <div className="w-16 h-1 bg-[#C8963E] mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Fatma', age: 65, village: 'Houmt Souk', specialty: 'Chapeau Mdhilla' },
            { name: 'Zeineb', age: 48, village: 'Midoun', specialty: 'Paniers tressés' },
            { name: 'Khadija', age: 52, village: 'Ajim', specialty: 'Art décoratif' },
          ].map((artisan) => (
            <div key={artisan.name} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#F5F0E8] h-32 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#1B4F8C] flex items-center justify-center">
                  <span className="text-white text-3xl font-serif font-bold">{artisan.name[0]}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#1B4F8C]">{artisan.name}</h3>
                <p className="text-gray-500 text-sm">{artisan.age} ans · {artisan.village}</p>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-[#C8963E] text-sm font-semibold">Spécialité</p>
                  <p className="text-gray-600 text-sm">{artisan.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F5F0E8] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C8963E] text-sm font-semibold uppercase tracking-widest mb-3">Notre Mission</p>
          <h2 className="font-serif text-4xl font-bold text-[#1B4F8C] mb-6">Préserver. Partager. Perpétuer.</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto text-lg">
            Chaque achat chez Dar-Essaaf contribue directement à la préservation de l&apos;artisanat djerbien 
            et au soutien des femmes artisanes. Vous ne achetez pas seulement un objet — 
            vous participez à la transmission d&apos;un patrimoine millénaire.
          </p>
        </div>
      </section>
    </div>
  );
}
