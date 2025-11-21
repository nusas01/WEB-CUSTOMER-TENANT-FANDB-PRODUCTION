import React from 'react';
import { MapPin, Phone, Mail, Instagram, Clock, Utensils } from 'lucide-react';

export default function RestaurantFooter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-slate-900 text-white pb-16">
      {/* Main Footer Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Restaurant Info */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white p-2.5 rounded-lg">
              <Utensils className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold">nusas resto</h3>
          </div>
          <p className="text-gray-300 text-base leading-relaxed mb-5">
            Menyajikan hidangan nusantara dengan cita rasa autentik dan bahan berkualitas tinggi untuk kepuasan Anda.
          </p>
          <div className="flex space-x-3">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-700 hover:bg-slate-600 p-3 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-700 hover:bg-slate-600 p-3 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-700 hover:bg-slate-600 p-3 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 mb-8">
          {/* Contact Information */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-4">Kontak Kami</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 mt-0.5 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Jl. Raya Merdeka No. 123<br />
                    Jakarta Pusat, DKI Jakarta<br />
                    Indonesia 10110
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <a href="tel:+6281234567890" className="text-gray-300 text-base hover:text-white transition-colors">
                  +62 812-3456-7890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <a href="mailto:info@nasigoreng.com" className="text-gray-300 text-base hover:text-white transition-colors">
                  info@nasigoreng.com
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-4">Jam Operasional</h4>
            <div className="flex items-start space-x-3">
              <Clock className="h-6 w-6 mt-1 text-emerald-400 flex-shrink-0" />
              <div className="text-gray-300 text-base space-y-2 flex-1">
                <div className="flex justify-between items-center">
                  <span>Senin - Jumat</span>
                  <span className="font-medium">08:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sabtu - Minggu</span>
                  <span className="font-medium">07:00 - 23:00</span>
                </div>
                <p className="text-gray-200 pt-2 flex items-center">
                  <span className="mr-2">✨</span> Buka setiap hari
                </p>
              </div>
            </div>
          </div>

          {/* Menu Populer */}
          <div className="mb-6">
            <h4 className="text-xl font-bold mb-4">Menu Populer</h4>
            <div className="space-y-2.5 text-base text-gray-300">
              <div className="flex items-center">
                <span className="mr-3 text-emerald-400">→</span>
                <a href="#" className="hover:text-white transition-colors">Nasi Goreng Spesial</a>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-emerald-400">→</span>
                <a href="#" className="hover:text-white transition-colors">Mie Ayam Edan</a>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-emerald-400">→</span>
                <a href="#" className="hover:text-white transition-colors">Es Teh Manis</a>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-emerald-400">→</span>
                <a href="#" className="hover:text-white transition-colors">Ayam Geprek Pedas</a>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-emerald-400">→</span>
                <a href="#" className="hover:text-white transition-colors">Paket Hemat</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 space-y-2">
          <div className="text-center text-gray-400 text-sm">
            © 2024 Warung Nasi Goreng. All rights reserved.
          </div>
          
          {/* Powered by Nusas */}
          <div className="flex justify-center items-center space-x-2">
            <span className="text-sm text-gray-400">Powered by</span>
            <a 
              href="https://nusas.id" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white px-4 py-0.5 rounded-full font-bold text-emerald-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              nusas.id
            </a>
          </div>

          <div className="flex justify-center items-center space-x-3 text-sm text-gray-400">
            <a href="https://nusas.id/customer/privacy/policy" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <span>•</span>
            <a href="https://nusas.id/customer/term/and/condition" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}