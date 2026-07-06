import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Plus, X, Tag, User, Phone, Edit, Loader, CheckCircle } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';
import { marketplaceService } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Marketplace({ currentUser }) {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form Fields
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Seeds');
  const [price, setPrice] = useState('');
  const [sellerName, setSellerName] = useState(currentUser?.farmer_name || '');
  const [contact, setContact] = useState(currentUser?.email || '');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchProducts = async (query = '', cat = '') => {
    try {
      setLoading(true);
      const res = await marketplaceService.getProducts(query, cat);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(searchVal, categoryFilter);
  }, [categoryFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(searchVal, categoryFilter);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!productName || !price) return;
    
    try {
      setBtnLoading(true);
      const payload = {
        product_name: productName,
        category: category,
        price: parseFloat(price),
        seller: sellerName || 'Independent Farmer',
        contact: contact || 'N/A',
        description: description,
        image_url: imageUrl || undefined
      };
      
      const res = await marketplaceService.createProduct(payload);
      setProducts((prev) => [res.data, ...prev]);
      setSuccessMsg(t('market_list_success'));
      
      // Reset form
      setProductName('');
      setPrice('');
      setDescription('');
      setImageUrl('');
      
      setTimeout(() => {
        setSuccessMsg('');
        setFormOpen(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to list product. Please verify fields are valid.');
    } finally {
      setBtnLoading(false);
    }
  };

  const categories = [
    { value: '', label: t('market_filter_all') },
    { value: 'Seeds', label: t('market_filter_seeds') },
    { value: 'Fertilizers', label: t('market_filter_fert') },
    { value: 'Farming Tools', label: t('market_filter_tools') },
    { value: 'Crops', label: t('market_filter_crops') }
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">{t('market_title')}</h1>
          <p className="text-sm text-primary-light font-semibold mt-1">
            {t('market_subtitle')}
          </p>
        </div>
        <button 
          onClick={() => setFormOpen((prev) => !prev)}
          className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-primary hover:bg-primary-light rounded-xl shadow-md transition-theme shrink-0"
        >
          {formOpen ? <X size={16} /> : <Plus size={16} />}
          <span>{formOpen ? "Close Panel" : t('market_sell_item')}</span>
        </button>
      </div>

      {/* Sell Form Panel */}
      {formOpen && (
        <form 
          onSubmit={handleCreateProduct}
          className="p-6 bg-background border border-primary/15 rounded-3xl shadow-lg max-w-2xl mx-auto space-y-4 transition-theme"
        >
          <h3 className="font-bold text-lg text-primary border-b border-primary/10 pb-2">
            {t('market_sell_item')}
          </h3>
          
          {successMsg && (
            <div className="p-3.5 bg-green-50 text-green-700 border border-green-200 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-primary">{t('market_prod_name')} *</label>
              <input 
                type="text" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Organic Urea (5kg)"
                className="w-full px-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-primary">{t('market_category')} *</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
              >
                <option value="Seeds">{t('market_filter_seeds')}</option>
                <option value="Fertilizers">{t('market_filter_fert')}</option>
                <option value="Farming Tools">{t('market_filter_tools')}</option>
                <option value="Crops">{t('market_filter_crops')}</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-primary">{t('market_price')} (₹) *</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price in INR"
                className="w-full px-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-primary">Item Image URL</label>
              <input 
                type="url" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-primary">{t('market_seller')}</label>
              <input 
                type="text" 
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                placeholder="Seller Name"
                className="w-full px-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-primary">{t('market_contact')}</label>
              <input 
                type="text" 
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Phone or Email"
                className="w-full px-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-primary">{t('market_desc')}</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide quality, features, delivery details..."
              rows={3}
              className="w-full px-4 py-2.5 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
            />
          </div>

          <button 
            type="submit"
            disabled={btnLoading}
            className="w-full py-3 bg-primary hover:bg-primary-light text-white font-bold rounded-xl shadow-md transition-theme flex items-center justify-center gap-1.5"
          >
            {btnLoading && <Loader size={16} className="animate-spin" />}
            <span>Post Marketplace Listing</span>
          </button>
        </form>
      )}

      {/* Filters & Search Row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategoryFilter(cat.value)}
              className={`px-4.5 py-2.5 text-xs font-bold rounded-xl transition-theme border shrink-0 ${
                categoryFilter === cat.value
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-background text-primary border-primary/10 hover:bg-primary/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input inside Marketplace */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md w-full">
          <input 
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search items..."
            className="flex-1 px-4 py-2 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
          />
          <button 
            type="submit"
            className="p-2.5 bg-primary hover:bg-primary-light text-white rounded-xl shadow-md transition-theme"
          >
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Grid of Listings */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-primary/65">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-primary/15 rounded-3xl text-primary/45 font-bold">
          No marketplace products found. Be the first to list!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
