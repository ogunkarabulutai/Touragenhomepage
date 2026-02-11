import React from 'react';
import { ArrowRight, Star, Heart, Plane, Car, Camera, MapPin, Clock, Shield, Award, Users, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const services = [
  {
    id: 1,
    title: 'Otel Rezervasyonu',
    description: 'Dünya çapında 100.000+ otelden size en uygun olanını bulun',
    icon: <MapPin className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    features: [
      'En iyi fiyat garantisi',
      'Ücretsiz iptal seçeneği',
      '7/24 müşteri desteği',
      'Anında onay'
    ],
    color: 'from-blue-500 to-blue-600',
    stats: { hotels: '100K+', destinations: '200+' }
  },
  {
    id: 2,
    title: 'Balayı Tatili',
    description: 'Hayatınızın en özel anlarını unutulmaz kılacak romantik paketler',
    icon: <Heart className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    features: [
      'Romantik otel seçenekleri',
      'Özel balayı paketleri',
      'Çift aktiviteleri',
      'VIP transfer hizmetleri'
    ],
    color: 'from-pink-500 to-rose-600',
    stats: { couples: '50K+', packages: '500+' }
  },
  {
    id: 3,
    title: 'Uçak Bileti',
    description: 'Yurt içi ve yurt dışı en uygun uçak biletlerini karşılaştırın',
    icon: <Plane className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    features: [
      'Tüm havayolları karşılaştırması',
      'Esnek tarih seçenekleri',
      'Mobil boarding pass',
      'Bagaj ekleme seçenekleri'
    ],
    color: 'from-sky-500 to-blue-600',
    stats: { airlines: '200+', routes: '10K+' }
  },
  {
    id: 4,
    title: 'Araç Kiralama',
    description: 'Tatil bölgenizde özgürce gezmek için araç kiralama hizmetleri',
    icon: <Car className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    features: [
      'Geniş araç filosu',
      'Havalimanı teslim',
      'Tam kasko sigortası',
      'GPS navigasyon'
    ],
    color: 'from-green-500 to-emerald-600',
    stats: { cars: '5K+', locations: '100+' }
  },
  {
    id: 5,
    title: 'Tur Paketleri',
    description: 'Rehberli turlar ve grup gezileri ile kültürel keşifler',
    icon: <Camera className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    features: [
      'Profesyonel rehberlik',
      'Küçük grup turları',
      'Kültürel deneyimler',
      'Fotoğraf turları'
    ],
    color: 'from-purple-500 to-indigo-600',
    stats: { tours: '1K+', guides: '500+' }
  },
  {
    id: 6,
    title: 'VIP Transfer',
    description: 'Havalimanından otele konforlu ve güvenli transfer hizmetleri',
    icon: <Sparkles className="w-8 h-8" />,
    image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    features: [
      'Lüks araç filosu',
      'Profesyonel şoförler',
      'Uçuş takibi',
      'Meet & greet hizmeti'
    ],
    color: 'from-orange-500 to-red-600',
    stats: { transfers: '100K+', cities: '50+' }
  }
];

const whyChooseUs = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Güvenli Ödeme',
    description: '256-bit SSL şifreleme ile güvenli ödeme altyapısı'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'En İyi Fiyat',
    description: 'Fiyat karşılaştırması ile en uygun seçenekleri sunuyoruz'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: '7/24 Destek',
    description: 'Uzman ekibimiz her zaman yanınızda'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: '15 Yıl Deneyim',
    description: '500.000+ mutlu müşteri ile kanıtlanmış güvenilirlik'
  }
];

const Services: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t('services.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
          
          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500K+</div>
              <div className="text-white/80 text-sm">Mutlu Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100K+</div>
              <div className="text-white/80 text-sm">Otel Seçeneği</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">200+</div>
              <div className="text-white/80 text-sm">Destinasyon</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-white/80 text-sm">Yıl Deneyim</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.ourServices')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A'dan Z'ye tatil ihtiyaçlarınız için tek durak çözümler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`} />
                  <div className="absolute top-4 left-4 text-white">
                    {service.icon}
                  </div>
                  <div className="absolute bottom-4 right-4 flex space-x-4 text-white text-sm">
                    {Object.entries(service.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold">{value}</div>
                        <div className="text-xs opacity-90 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors duration-200">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Star className="w-4 h-4 text-orange-500 fill-current" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="group/btn w-full bg-gray-100 dark:bg-gray-800 hover:bg-orange-500 text-gray-900 dark:text-white hover:text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2">
                    <span>Detayları İncele</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.whyUs')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              15 yıllık deneyimimiz ve müşteri memnuniyeti odaklı yaklaşımımızla fark yaratıyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Hayalinizdeki Tatili Planlayalım
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Uzman ekibimiz size özel tatil paketleri hazırlamak için burada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              Ücretsiz Danışmanlık
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200">
              Bizi Arayın: 444 0 387
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;