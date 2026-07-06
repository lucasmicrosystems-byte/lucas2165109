import React from 'react';
import { Tag, Phone, User, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function ProductCard({ product }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col bg-background border border-primary/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {product.image_url && (
        <div className="relative h-40 overflow-hidden bg-background-soft">
          <img 
            src={product.image_url} 
            alt={product.product_name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-bold text-white bg-primary-light rounded-lg shadow-sm">
            {product.category}
          </span>
        </div>
      )}

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base text-primary leading-snug">{product.product_name}</h3>
            <span className="text-lg font-extrabold text-primary shrink-0">
              ₹{product.price}
            </span>
          </div>
          {product.description && (
            <p className="text-xs text-primary/70 mt-2 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-primary/5 space-y-2 text-xs text-primary/80">
          <div className="flex items-center gap-2">
            <User size={13} className="text-primary-light shrink-0" />
            <span>{t('market_seller')}: <strong className="text-primary">{product.seller}</strong></span>
          </div>
          {product.contact && (
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-primary-light shrink-0" />
              <span>{t('market_contact')}: <strong className="text-primary">{product.contact}</strong></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
