'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Upload, CheckCircle2, AlertCircle, Loader2, Search } from 'lucide-react';
import { allProducts } from '@/data/products';

export default function Admin3DAssets() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--color-paper)] p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="display-48 mb-2">3D Asset Management</h1>
            <p className="text-ink-muted">Manage GLB models and KTX2 texture pipelines for the Outdoor Living Group.</p>
          </div>
          
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-quiet" size={16} />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-paper-raised border border-ink-rule px-10 py-2 text-sm focus:outline-none focus:border-bronze"
            />
          </div>
        </header>

        <div className="bg-paper-raised border border-ink-rule overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-ink-rule bg-paper-sunken">
                <th className="px-6 py-4 text-caption">Product</th>
                <th className="px-6 py-4 text-caption">Category</th>
                <th className="px-6 py-4 text-caption">3D Status</th>
                <th className="px-6 py-4 text-caption text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.slug} className="border-b border-ink-rule hover:bg-paper/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-paper-sunken flex items-center justify-center">
                        <Package size={18} className="text-ink-quiet" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-[11px] text-ink-quiet uppercase tracking-tighter">{product.brandSlug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs uppercase tracking-widest text-ink-muted">{product.category.replace('_', ' ')}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status="no_model" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-bronze text-xs font-medium hover:text-bronze-deep transition-colors flex items-center gap-1 ml-auto">
                      <Upload size={14} />
                      Upload GLB
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'ready' | 'processing' | 'error' | 'no_model' }) {
  const configs = {
    ready: { color: 'text-success bg-success/10', icon: CheckCircle2, text: 'Ready' },
    processing: { color: 'text-warn bg-warn/10', icon: Loader2, text: 'Processing' },
    error: { color: 'text-error bg-error/10', icon: AlertCircle, text: 'Error' },
    no_model: { color: 'text-ink-quiet bg-ink-rule/30', icon: Package, text: 'No Model' },
  };

  const { color, icon: Icon, text } = configs[status];

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm ${color}`}>
      <Icon size={12} className={status === 'processing' ? 'animate-spin' : ''} />
      <span className="text-[10px] font-bold uppercase tracking-wider">{text}</span>
    </div>
  );
}
