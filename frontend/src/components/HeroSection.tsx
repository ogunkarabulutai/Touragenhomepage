import React, { useState } from 'react';
import { ArrowRight, Play, Plane, Building, Bus, Car, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import BookingModal from './BookingModal';
import DateRangePicker from './DateRangePicker';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('flight');
  const [tripType, setTripType] = useState('oneway');
  const [showHotels, setShowHotels] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 leading-tight">
          {t('hero.title')}
        </h1>
        
        {/* Booking Form */}
        <div className="mt-16 w-full mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('flight')}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                  activeTab === 'flight'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-blue-600'
                }`}
              >
                <Plane className="w-5 h-5" />
                <span>{t('hero.flight')}</span>
              </button>
              <button
                onClick={() => setActiveTab('hotel')}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                  activeTab === 'hotel'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-blue-600'
                }`}
              >
                <Building className="w-5 h-5" />
                <span>{t('hero.hotel')}</span>
              </button>
              <button
                onClick={() => setActiveTab('bus')}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                  activeTab === 'bus'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-blue-600'
                }`}
              >
                <Bus className="w-5 h-5" />
                <span>{t('hero.bus')}</span>
              </button>
              <button
                onClick={() => setActiveTab('car')}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                  activeTab === 'car'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-blue-600'
                }`}
              >
                <Car className="w-5 h-5" />
                <span>{t('hero.carRental')}</span>
              </button>
              <button
                onClick={() => setActiveTab('transfer')}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                  activeTab === 'transfer'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-blue-600'
                }`}
              >
                <MapPin className="w-5 h-5" />
                <span>{t('hero.transfer')}</span>
              </button>
            </div>

            {/* Trip Type Selection (for flight) */}
            {activeTab === 'flight' && (
              <div className="flex items-center space-x-6 mb-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="oneway"
                    checked={tripType === 'oneway'}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                    <span className="text-gray-700 font-medium">{t('hero.oneWay')}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="roundtrip"
                    checked={tripType === 'roundtrip'}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">{t('hero.roundTrip')}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="multicity"
                    checked={tripType === 'multicity'}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">{t('hero.multiCity')}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer ml-8">
                  <input
                    type="checkbox"
                    checked={showHotels}
                    onChange={(e) => setShowHotels(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{t('hero.nonStop')}</span>
                </label>
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* From */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder={t('hero.from')}
                    value={formData.from}
                    onChange={(e) => handleInputChange('from', e.target.value)}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="lg:col-span-1 flex items-center justify-center">
                <button className="p-2 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors duration-200">
                  <ArrowRight className="w-5 h-5 text-blue-600 transform rotate-0 lg:rotate-0" />
                </button>
              </div>

              {/* To */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder={t('hero.to')}
                    value={formData.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                  />
                </div>
              </div>

              {/* Departure Date */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <input
                    type="date"
                    value={formData.departDate}
                    onChange={(e) => handleInputChange('departDate', e.target.value)}
                    onClick={() => setIsDatePickerOpen(true)}
                    readOnly={true}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium cursor-pointer"
                  />
                  <div className="absolute left-10 top-1 text-xs text-gray-500 font-medium">
                    {t('hero.departDate')}
                  </div>
                </div>
              </div>

              {/* Return Date (if roundtrip) */}
              {tripType === 'roundtrip' && (
                <div className="lg:col-span-2">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => handleInputChange('returnDate', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                    />
                    <div className="absolute left-10 top-1 text-xs text-gray-500 font-medium">
                      {t('hero.addReturn')}
                    </div>
                  </div>
                </div>
              )}

              {/* Add Return Button (if oneway) */}
              {tripType === 'oneway' && (
                <div className="lg:col-span-2">
                  <button
                    onClick={() => setTripType('roundtrip')}
                    className="w-full h-full flex items-center justify-center space-x-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-100 transition-colors duration-200 font-medium"
                  >
                    <span>+</span>
                    <span>Dönüş Ekle</span>
                  </button>
                </div>
              )}

              {/* Passengers */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <select
                    value={formData.passengers}
                    onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>
                        {num} Yolcu {num === 1 ? '/ Ekonomi' : '/ Ekonomi'}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-3">
                <button className="w-full h-full bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center px-4">
                  <span className="lg:inline">{t('hero.findCheapTicket')}</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>

            {/* Additional Options */}
            <div className="mt-4 flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-600 text-sm">{t('hero.listHotels')}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
      </section>
      
      {/* Flight Deals Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Plane className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('deals.title')}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/20 px-4 py-2 rounded-full">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Yılbaşı Fırsatları</span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium">Yurt dışı</button>
              <button className="text-gray-600 hover:text-gray-700 font-medium">Yurt içi</button>
              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                <span>Tümünü gör</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                route: 'İzmir - Köln',
                dates: '9 Aralık - 14 Aralık',
                type: 'Gidiş - Dönüş',
                airline: 'Pegasus',
                originalPrice: '9.625 TL',
                price: '6.848 TL',
                discount: '%28',
                image: 'https://images.pexels.com/photos/1717859/pexels-photo-1717859.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'
              },
              {
                route: 'Adana - Hannover',
                dates: '5 Aralık',
                type: 'Tek yön',
                airline: 'Pegasus',
                originalPrice: '3.828 TL',
                price: '2.718 TL',
                discount: '%28',
                image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'
              },
              {
                route: 'Antalya - Frankfurt',
                dates: '26 Kasım - 1 Aralık',
                type: 'Gidiş - Dönüş',
                airline: 'Pegasus',
                originalPrice: '9.736 TL',
                price: '6.949 TL',
                discount: '%28',
                image: 'https://images.pexels.com/photos/1548024/pexels-photo-1548024.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'
              },
              {
                route: 'Ankara - Brüksel',
                dates: '4 Aralık',
                type: 'Tek yön',
                airline: 'Pegasus',
                originalPrice: '4.283 TL',
                price: '3.003 TL',
                discount: '%29',
                image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop'
              }
            ].map((flight, index) => (
              <div key={index} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={flight.image}
                    alt={flight.route}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                    {flight.route}
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                    {flight.discount}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{flight.dates}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{flight.type}</div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <Plane className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{flight.airline}</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">55 dk önce eklendi</div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 line-through">{flight.originalPrice}*</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{flight.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            * Son bir ayın ortalama fiyatıdır.
          </div>
        </div>
      </section>
      
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <DateRangePicker
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onSelectDates={(checkIn, checkOut) => {
          setFormData(prev => ({
            ...prev,
            departDate: checkIn,
            returnDate: checkOut
          }));
        }}
        initialCheckIn={formData.departDate}
        initialCheckOut={formData.returnDate}
      />
    </>
  );
};

export default HeroSection;