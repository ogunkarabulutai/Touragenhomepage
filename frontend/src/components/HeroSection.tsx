import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Plane, Building, Camera, MapPin, Calendar, Users, ChevronDown, Clock, X } from 'lucide-react';
import BookingModal from './BookingModal';
import DateRangePicker from './DateRangePicker';
import { useLanguage } from '../contexts/LanguageContext';

interface MockCity {
  code: string;
  name: string;
  country: string;
  airport: string;
}

interface SearchResult {
  id: number;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  airline: string;
  airlineLogo: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: string;
  price: number;
  originalPrice: number;
  discount: number;
  departDate: string;
  returnDate?: string;
  type: string;
}

const mockCities: MockCity[] = [
  { code: 'BAK', name: 'Bakı', country: 'Azərbaycan', airport: 'Heydər Əliyev Beynəlxalq Hava Limanı' },
  { code: 'IST', name: 'İstanbul', country: 'Türkiyə', airport: 'İstanbul Havalimanı' },
  { code: 'SAW', name: 'İstanbul Sabiha', country: 'Türkiyə', airport: 'Sabiha Gökçen Havalimanı' },
  { code: 'AYT', name: 'Antalya', country: 'Türkiyə', airport: 'Antalya Havalimanı' },
  { code: 'ADB', name: 'İzmir', country: 'Türkiyə', airport: 'Adnan Menderes Havalimanı' },
  { code: 'ESB', name: 'Ankara', country: 'Türkiyə', airport: 'Esenboğa Havalimanı' },
  { code: 'GBJ', name: 'Qəbələ', country: 'Azərbaycan', airport: 'Qəbələ Beynəlxalq Hava Limanı' },
  { code: 'NAJ', name: 'Naxçıvan', country: 'Azərbaycan', airport: 'Naxçıvan Beynəlxalq Hava Limanı' },
  { code: 'GYD', name: 'Gəncə', country: 'Azərbaycan', airport: 'Gəncə Beynəlxalq Hava Limanı' },
  { code: 'DXB', name: 'Dubai', country: 'BƏƏ', airport: 'Dubai Beynəlxalq Hava Limanı' },
  { code: 'MSQ', name: 'Moskva', country: 'Rusiya', airport: 'Şeremetyevo Hava Limanı' },
  { code: 'LHR', name: 'London', country: 'Böyük Britaniya', airport: 'Heathrow Hava Limanı' },
  { code: 'CDG', name: 'Paris', country: 'Fransa', airport: 'Charles de Gaulle Hava Limanı' },
  { code: 'FRA', name: 'Frankfurt', country: 'Almaniya', airport: 'Frankfurt Hava Limanı' },
  { code: 'FCO', name: 'Roma', country: 'İtaliya', airport: 'Fiumicino Hava Limanı' },
  { code: 'TBS', name: 'Tbilisi', country: 'Gürcüstan', airport: 'Tbilisi Beynəlxalq Hava Limanı' },
  { code: 'TEV', name: 'Tehran', country: 'İran', airport: 'İmam Xomeyni Hava Limanı' },
  { code: 'BJV', name: 'Bodrum', country: 'Türkiyə', airport: 'Milas-Bodrum Havalimanı' },
];

const generateMockResults = (from: string, to: string, departDate: string, returnDate: string, tripType: string): SearchResult[] => {
  const airlines = [
    { name: 'AZAL', logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
    { name: 'Turkish Airlines', logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
    { name: 'Pegasus', logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
    { name: 'Buta Airways', logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop' },
  ];

  const fromCity = mockCities.find(c => c.name === from) || mockCities[0];
  const toCity = mockCities.find(c => c.name === to) || mockCities[1];

  const results: SearchResult[] = [];
  const basePrice = 200 + Math.floor(Math.random() * 600);

  for (let i = 0; i < 6; i++) {
    const airline = airlines[i % airlines.length];
    const departHour = 6 + Math.floor(Math.random() * 14);
    const durationHours = 1 + Math.floor(Math.random() * 4);
    const durationMinutes = Math.floor(Math.random() * 50);
    const arriveHour = (departHour + durationHours) % 24;
    const price = basePrice + Math.floor(Math.random() * 300) * (i + 1) / 3;
    const originalPrice = Math.floor(price * (1.15 + Math.random() * 0.25));
    const discount = Math.floor(((originalPrice - price) / originalPrice) * 100);
    const isNonStop = i % 3 !== 2;

    results.push({
      id: i + 1,
      from: fromCity.name,
      fromCode: fromCity.code,
      to: toCity.name,
      toCode: toCity.code,
      airline: airline.name,
      airlineLogo: airline.logo,
      departTime: `${String(departHour).padStart(2, '0')}:${String(Math.floor(Math.random() * 59)).padStart(2, '0')}`,
      arriveTime: `${String(arriveHour).padStart(2, '0')}:${String(Math.floor(Math.random() * 59)).padStart(2, '0')}`,
      duration: `${durationHours}s ${durationMinutes}dk`,
      stops: isNonStop ? 'Aktarmasız' : '1 Aktarma',
      price: Math.floor(price),
      originalPrice: Math.floor(originalPrice),
      discount,
      departDate: departDate || '2026-03-15',
      returnDate: tripType === 'roundtrip' ? (returnDate || '2026-03-22') : undefined,
      type: tripType === 'roundtrip' ? 'Gidiş - Dönüş' : 'Tek yön',
    });
  }

  return results.sort((a, b) => a.price - b.price);
};

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

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromFilter, setFromFilter] = useState('');
  const [toFilter, setToFilter] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const filteredFromCities = mockCities.filter(city =>
    city.name.toLowerCase().includes(fromFilter.toLowerCase()) ||
    city.code.toLowerCase().includes(fromFilter.toLowerCase()) ||
    city.country.toLowerCase().includes(fromFilter.toLowerCase())
  );

  const filteredToCities = mockCities.filter(city =>
    city.name.toLowerCase().includes(toFilter.toLowerCase()) ||
    city.code.toLowerCase().includes(toFilter.toLowerCase()) ||
    city.country.toLowerCase().includes(toFilter.toLowerCase())
  );

  const handleSearch = async () => {
    if (!formData.from || !formData.to) return;

    setIsSearching(true);
    setHasSearched(false);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const results = generateMockResults(formData.from, formData.to, formData.departDate, formData.returnDate, tripType);
    setSearchResults(results);
    setIsSearching(false);
    setHasSearched(true);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const closeResults = () => {
    setHasSearched(false);
    setSearchResults([]);
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
                data-testid="tab-flight"
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
                data-testid="tab-hotel"
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
                data-testid="tab-tour"
                onClick={() => setActiveTab('tour')}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                  activeTab === 'tour'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-blue-600'
                }`}
              >
                <Camera className="w-5 h-5" />
                <span>{t('hero.tour')}</span>
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
              <div className="lg:col-span-2" ref={fromRef}>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    data-testid="input-from"
                    type="text"
                    placeholder={t('hero.from')}
                    value={formData.from}
                    onChange={(e) => {
                      handleInputChange('from', e.target.value);
                      setFromFilter(e.target.value);
                      setShowFromDropdown(true);
                    }}
                    onFocus={() => {
                      setShowFromDropdown(true);
                      setFromFilter(formData.from);
                    }}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                  />
                  {showFromDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                      {filteredFromCities.map((city) => (
                        <button
                          key={city.code}
                          data-testid={`from-city-${city.code}`}
                          onClick={() => {
                            handleInputChange('from', city.name);
                            setFromFilter(city.name);
                            setShowFromDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 flex items-center space-x-3 border-b border-gray-50 last:border-b-0"
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Plane className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900">{city.name}</span>
                              <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{city.code}</span>
                            </div>
                            <div className="text-xs text-gray-500 truncate">{city.airport}</div>
                            <div className="text-xs text-gray-400">{city.country}</div>
                          </div>
                        </button>
                      ))}
                      {filteredFromCities.length === 0 && (
                        <div className="px-4 py-6 text-center text-gray-500 text-sm">Sonuç bulunamadı</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Swap Button */}
              <div className="lg:col-span-1 flex items-center justify-center">
                <button
                  data-testid="swap-button"
                  onClick={() => {
                    const temp = formData.from;
                    handleInputChange('from', formData.to);
                    handleInputChange('to', temp);
                    setFromFilter(formData.to);
                    setToFilter(temp);
                  }}
                  className="p-2 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors duration-200"
                >
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </button>
              </div>

              {/* To */}
              <div className="lg:col-span-2" ref={toRef}>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    data-testid="input-to"
                    type="text"
                    placeholder={t('hero.to')}
                    value={formData.to}
                    onChange={(e) => {
                      handleInputChange('to', e.target.value);
                      setToFilter(e.target.value);
                      setShowToDropdown(true);
                    }}
                    onFocus={() => {
                      setShowToDropdown(true);
                      setToFilter(formData.to);
                    }}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                  />
                  {showToDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                      {filteredToCities.map((city) => (
                        <button
                          key={city.code}
                          data-testid={`to-city-${city.code}`}
                          onClick={() => {
                            handleInputChange('to', city.name);
                            setToFilter(city.name);
                            setShowToDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 flex items-center space-x-3 border-b border-gray-50 last:border-b-0"
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Plane className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900">{city.name}</span>
                              <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{city.code}</span>
                            </div>
                            <div className="text-xs text-gray-500 truncate">{city.airport}</div>
                            <div className="text-xs text-gray-400">{city.country}</div>
                          </div>
                        </button>
                      ))}
                      {filteredToCities.length === 0 && (
                        <div className="px-4 py-6 text-center text-gray-500 text-sm">Sonuç bulunamadı</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Departure Date */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <input
                    data-testid="input-depart-date"
                    type="date"
                    value={formData.departDate}
                    onChange={(e) => handleInputChange('departDate', e.target.value)}
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
                <button
                  data-testid="search-button"
                  onClick={handleSearch}
                  disabled={isSearching || !formData.from || !formData.to}
                  className="w-full h-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center px-4"
                >
                  {isSearching ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Aranıyor...</span>
                    </div>
                  ) : (
                    <>
                      <span className="lg:inline">{t('hero.findCheapTicket')}</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
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

      {/* Search Results Section */}
      {hasSearched && searchResults.length > 0 && (
        <section ref={resultsRef} data-testid="search-results" className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Plane className="w-6 h-6 text-blue-500" />
                  <span>{formData.from} - {formData.to}</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {searchResults.length} uçuş bulundu &middot; {tripType === 'roundtrip' ? 'Gidiş - Dönüş' : 'Tek yön'} &middot; {formData.passengers} Yolcu
                </p>
              </div>
              <button
                data-testid="close-results"
                onClick={closeResults}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div
                  key={result.id}
                  data-testid={`flight-result-${result.id}`}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Flight Info */}
                    <div className="flex-1 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <Plane className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">{result.airline}</span>
                        </div>
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                          result.stops === 'Aktarmasız' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}>
                          {result.stops}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Departure */}
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.departTime}</div>
                          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{result.fromCode}</div>
                          <div className="text-xs text-gray-500">{result.from}</div>
                        </div>

                        {/* Duration Line */}
                        <div className="flex-1 mx-6">
                          <div className="flex items-center justify-center mb-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{result.duration}</span>
                            </span>
                          </div>
                          <div className="relative">
                            <div className="h-px bg-gray-300 dark:bg-gray-600 w-full"></div>
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                            {result.stops !== 'Aktarmasız' && (
                              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full"></div>
                            )}
                          </div>
                        </div>

                        {/* Arrival */}
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.arriveTime}</div>
                          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{result.toCode}</div>
                          <div className="text-xs text-gray-500">{result.to}</div>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                        {result.type} &middot; {result.departDate}
                        {result.returnDate && ` - ${result.returnDate}`}
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="lg:w-56 p-6 bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-700">
                      {result.discount > 0 && (
                        <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full mb-2">
                          %{result.discount} indirim
                        </div>
                      )}
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        {result.originalPrice} AZN
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {result.price} <span className="text-base font-normal text-gray-500">AZN</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">kişi başı</div>
                      <button
                        data-testid={`select-flight-${result.id}`}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 transform group-hover:scale-105 flex items-center justify-center space-x-1"
                      >
                        <span>Seç</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Results Footer */}
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              * Fiyatlar vergi dahildir. Son güncelleme: az önce
            </div>
          </div>
        </section>
      )}
      
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
