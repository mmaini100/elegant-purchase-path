
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Discover Luxury
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Curated collection of premium products designed to elevate your lifestyle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors group"
            >
              <span>Shop Collection</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 border border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Watch Lookbook
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 animate-pulse" />
    </section>
  );
};

export default Hero;
