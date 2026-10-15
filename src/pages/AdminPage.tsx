import React, { useState, useEffect } from 'react';
import { Product, ContactMessage, PageRoute } from '../types';
import { api } from '../services/api';
import {
  Plus,
  Trash2,
  Mail,
  Package,
  Layers,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ExternalLink,
  X
} from 'lucide-react';
import { SpeakerIllustration } from '../components/SpeakerIllustration';

interface AdminPageProps {
  onSelectProduct: (productId: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onSelectProduct, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'contacts'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Bluetooth' as Product['category'],
    price: '',
    rating: '4.8',
    stock: '15',
    shortDescription: '',
    description: '',
    wattage: '120W RMS',
    frequencyResponse: '40Hz – 25kHz',
    connectivity: 'Bluetooth 5.3, Optical, USB-C, AUX',
    featured: false,
    badge: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, contactRes] = await Promise.all([
        api.getProducts(),
        api.getContacts()
      ]);
      setProducts(prodRes.products);
      setContacts(contactRes);
    } catch (err: any) {
      console.error('Failed to load admin data:', err);
      setStatusMessage({ type: 'error', text: 'Error connecting to backend database' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the database?`)) {
      return;
    }

    try {
      await api.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showStatus(`Product "${name}" deleted from database`);
    } catch (err: any) {
      showStatus(err.message || 'Failed to delete product', 'error');
    }
  };

  const handleResetCatalog = async () => {
    if (!window.confirm('Reset database catalog to original 12 audiophile speakers?')) {
      return;
    }
    try {
      await api.resetDefaultProducts();
      await loadData();
      showStatus('Database successfully restored to default sample catalog');
    } catch (err: any) {
      showStatus('Failed to reset catalog', 'error');
    }
  };

  const validateProductForm = () => {
    const errs: Record<string, string> = {};
    if (!newProduct.name.trim() || newProduct.name.trim().length < 3) {
      errs.name = 'Product name must be at least 3 characters';
    }
    if (!newProduct.price || isNaN(Number(newProduct.price)) || Number(newProduct.price) <= 0) {
      errs.price = 'Valid price greater than 0 is required';
    }
    if (!newProduct.shortDescription.trim() || newProduct.shortDescription.trim().length < 10) {
      errs.shortDescription = 'Short description must be at least 10 characters';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProductForm()) return;

    try {
      const payload: Partial<Product> = {
        name: newProduct.name.trim(),
        category: newProduct.category,
        price: Number(newProduct.price),
        rating: Number(newProduct.rating) || 5.0,
        stock: Number(newProduct.stock) || 10,
        shortDescription: newProduct.shortDescription.trim(),
        description: newProduct.description.trim() || newProduct.shortDescription.trim(),
        specifications: {
          wattage: newProduct.wattage.trim(),
          frequencyResponse: newProduct.frequencyResponse.trim(),
          connectivity: newProduct.connectivity.trim()
        },
        imageUrl: '/images/custom-speaker.jpg',
        featured: newProduct.featured,
        badge: newProduct.badge.trim() || undefined
      };

      const created = await api.createProduct(payload);
      setProducts([created, ...products]);
      setIsAddModalOpen(false);
      showStatus(`Created new speaker: "${created.name}"`);
      // Reset form
      setNewProduct({
        name: '',
        category: 'Bluetooth',
        price: '',
        rating: '4.8',
        stock: '15',
        shortDescription: '',
        description: '',
        wattage: '120W RMS',
        frequencyResponse: '40Hz – 25kHz',
        connectivity: 'Bluetooth 5.3, Optical, USB-C, AUX',
        featured: false,
        badge: ''
      });
      setFormErrors({});
    } catch (err: any) {
      showStatus(err.message || 'Failed to create product', 'error');
    }
  };

  const handleUpdateContactStatus = async (id: string, newStatus: 'unread' | 'read' | 'replied') => {
    try {
      await api.updateContactStatus(id, newStatus);
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      showStatus(`Inquiry marked as ${newStatus}`);
    } catch (err: any) {
      showStatus('Failed to update message status', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header with Title and System Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Administration</span>
            <span aria-hidden="true">·</span>
            <span>REST API Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] mt-1">
            Acoustic Inventory & Inquiries Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetCatalog}
            className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            title="Restore original database seed"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default Catalog</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-blue-900/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Speaker</span>
          </button>
        </div>
      </div>

      {/* Status banner */}
      {statusMessage && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/50 border border-emerald-600/40 text-emerald-300'
              : 'bg-red-950/50 border border-red-600/40 text-red-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Catalog Products</div>
          <div className="text-xl font-bold text-white font-mono tabular-nums">{products.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Inquiries Received</div>
          <div className="text-xl font-bold text-blue-400 font-mono tabular-nums">{contacts.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Total Inventory Units</div>
          <div className="text-xl font-bold text-white font-mono tabular-nums">
            {products.reduce((acc, p) => acc + (p.stock || 0), 0)}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Unread Inquiries</div>
          <div className="text-xl font-bold text-amber-400 font-mono tabular-nums">
            {contacts.filter((c) => c.status === 'unread').length}
          </div>
        </div>
      </div>

      {/* Tab Controls (Segmented clean control) */}
      <div className="flex items-center gap-1 p-1 bg-[#080C14] border border-slate-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Product Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'contacts'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contact Inquiries ({contacts.length})</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS TABLE */}
      {activeTab === 'products' && (
        <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#080C14] border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">System</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-center">Rating</th>
                  <th className="py-3 px-4 text-center">Stock</th>
                  <th className="py-3 px-4 text-center">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 shrink-0 overflow-hidden">
                          <SpeakerIllustration
                            category={prod.category}
                            name={prod.name}
                            className="w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs">{prod.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            ID: {prod.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-slate-300 font-medium">{prod.category}</span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-white tabular-nums">
                      ${prod.price.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono tabular-nums text-amber-400">
                      ★ {prod.rating.toFixed(1)}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono tabular-nums">
                      {prod.stock > 0 ? (
                        <span className="text-slate-300">{prod.stock} units</span>
                      ) : (
                        <span className="text-red-400 font-semibold">Out of Stock</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {prod.featured ? (
                        <span className="text-blue-400 font-semibold">Yes</span>
                      ) : (
                        <span className="text-slate-500">No</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(prod.id)}
                          className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded transition-colors"
                          title="View on Storefront"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(prod.id, prod.name)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                          title="Delete from Database"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CONTACT INQUIRIES */}
      {activeTab === 'contacts' && (
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <div className="p-12 text-center bg-[#0B0F19] border border-slate-800 rounded-2xl text-slate-400">
              No inquiries submitted yet.
            </div>
          ) : (
            contacts.map((msg) => (
              <div
                key={msg.id}
                className="p-5 rounded-2xl bg-[#0B0F19] border border-slate-800 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                  <div>
                    <span className="text-sm font-bold text-white">{msg.name}</span>
                    <span className="text-xs text-slate-400 ml-2 font-mono">({msg.email})</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>

                    <select
                      value={msg.status}
                      onChange={(e) =>
                        handleUpdateContactStatus(msg.id, e.target.value as any)
                      }
                      className={`text-xs px-2.5 py-1 rounded-md border bg-[#080C14] ${
                        msg.status === 'unread'
                          ? 'border-amber-500 text-amber-400'
                          : msg.status === 'read'
                          ? 'border-blue-500 text-blue-400'
                          : 'border-emerald-500 text-emerald-400'
                      }`}
                    >
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs font-semibold text-blue-400">Topic: {msg.subject}</div>

                <p className="text-xs sm:text-sm text-slate-300 bg-[#080C14] p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                  "{msg.message}"
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* ADD NEW PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#0B0F19] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#080C14]">
              <h2 className="text-base font-bold text-white font-['Space_Grotesk']">
                Add New Speaker to Catalog
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. AURA Apex Master 7"
                    className={`w-full bg-[#080C14] border ${
                      formErrors.name ? 'border-red-500' : 'border-slate-700'
                    } rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                  />
                  {formErrors.name && <p className="text-[11px] text-red-400 mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value as any })
                    }
                    className="w-full bg-[#080C14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Bluetooth">Bluetooth</option>
                    <option value="Home Theatre">Home Theatre</option>
                    <option value="Portable">Portable</option>
                    <option value="Smart Speaker">Smart Speaker</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="e.g. 799"
                    className={`w-full bg-[#080C14] border ${
                      formErrors.price ? 'border-red-500' : 'border-slate-700'
                    } rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500`}
                  />
                  {formErrors.price && <p className="text-[11px] text-red-400 mt-1">{formErrors.price}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={newProduct.rating}
                    onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
                    className="w-full bg-[#080C14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Stock Units</label>
                  <input
                    type="number"
                    min="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full bg-[#080C14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Short Description *
                </label>
                <input
                  type="text"
                  value={newProduct.shortDescription}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, shortDescription: e.target.value })
                  }
                  placeholder="One sentence summary of acoustic driver technology and enclosure"
                  className={`w-full bg-[#080C14] border ${
                    formErrors.shortDescription ? 'border-red-500' : 'border-slate-700'
                  } rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500`}
                />
                {formErrors.shortDescription && (
                  <p className="text-[11px] text-red-400 mt-1">{formErrors.shortDescription}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Wattage</label>
                  <input
                    type="text"
                    value={newProduct.wattage}
                    onChange={(e) => setNewProduct({ ...newProduct, wattage: e.target.value })}
                    placeholder="e.g. 150W RMS"
                    className="w-full bg-[#080C14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Frequency Range
                  </label>
                  <input
                    type="text"
                    value={newProduct.frequencyResponse}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, frequencyResponse: e.target.value })
                    }
                    placeholder="e.g. 32Hz – 30kHz"
                    className="w-full bg-[#080C14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Connectivity</label>
                <input
                  type="text"
                  value={newProduct.connectivity}
                  onChange={(e) => setNewProduct({ ...newProduct, connectivity: e.target.value })}
                  placeholder="e.g. Bluetooth 5.3, Wi-Fi 6, HDMI eARC, Optical"
                  className="w-full bg-[#080C14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProduct.featured}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, featured: e.target.checked })
                    }
                    className="rounded border-slate-700 bg-slate-900 text-blue-600 w-4 h-4"
                  />
                  <span>Mark as Featured Flagship</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
