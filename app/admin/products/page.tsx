'use client';

import { allProducts } from '@/data/products';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';

export default function AdminProductsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
           <p className="text-caption mb-2">Catalogue Management</p>
           <h2 className="display-48">Products</h2>
        </div>
        <button className="btn btn-primary flex items-center gap-2">
           <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-white border border-[var(--color-ink-rule)]">
        <div className="flex items-center gap-4 flex-1">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-3 text-[var(--color-ink-quiet)]" size={18} />
              <input 
                type="text" 
                placeholder="Search products by name, SKU or brand..." 
                className="w-full bg-[var(--color-paper-sunken)] border-none outline-none py-3 pl-12 pr-4 text-sm focus:ring-1 focus:ring-[var(--color-bronze)]"
              />
           </div>
           <button className="flex items-center gap-2 px-4 py-3 border border-[var(--color-ink-rule)] text-[10px] uppercase tracking-widest hover:bg-[var(--color-paper-sunken)] transition-all">
              <Filter size={16} /> Filter
           </button>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-[10px] text-[var(--color-ink-quiet)] uppercase tracking-widest">{allProducts.length} Products Found</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[var(--color-ink-rule)] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[var(--color-paper-sunken)] border-b border-[var(--color-ink-rule)]">
            <tr>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold">Product</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold">Category</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold">Brand</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold">Price</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold">Status</th>
              <th className="p-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-ink-rule)]">
            {allProducts.map((p) => (
              <tr key={p.slug} className="group hover:bg-[var(--color-paper-sunken)]/30 transition-colors cursor-pointer">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[var(--color-paper-sunken)] relative overflow-hidden flex-shrink-0">
                       <img src={p.heroImageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <p className="font-medium text-sm">{p.name}</p>
                       <p className="text-[10px] text-[var(--color-ink-quiet)] font-mono">{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                   <span className="text-xs capitalize">{p.category.replace('_', ' ')}</span>
                </td>
                <td className="p-6">
                   <span className="text-xs capitalize">{p.brandSlug.replace('-', ' ')}</span>
                </td>
                <td className="p-6">
                   <span className="font-mono text-xs">£{(p.price / 100).toLocaleString()}</span>
                </td>
                <td className="p-6">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-success)]">Active</span>
                   </div>
                </td>
                <td className="p-6 text-right">
                   <button className="p-2 hover:bg-white rounded-full transition-colors">
                      <MoreHorizontal size={18} className="text-[var(--color-ink-quiet)]" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
