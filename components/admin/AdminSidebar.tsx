'use client';

import { 
  Users, 
  BarChart3, 
  Search, 
  Settings, 
  LogOut, 
  LayoutDashboard,
  Share2,
  Globe,
  Bell,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: Users, label: 'Leads', href: '/admin/leads' },
  { icon: Search, label: 'SEO Intelligence', href: '/admin/seo' },
  { icon: Share2, label: 'Social Sync', href: '/admin/social' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Globe, label: 'Brand Sites', href: '/admin/brands' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-ink border-r border-white/10 flex flex-col fixed left-0 top-0 z-50">
      {/* Brand Header */}
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 bg-bronze rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <div>
            <h2 className="text-white text-sm font-bold tracking-widest uppercase">The Group</h2>
            <p className="text-[10px] text-white/40 tracking-tighter uppercase font-medium">Superadmin v3.0</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`group flex items-center gap-3 px-4 py-3 transition-all duration-200 relative ${
                isActive ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="admin-nav-active"
                  className="absolute inset-0 bg-white/5 border-l-2 border-bronze"
                />
              )}
              <item.icon size={18} className={isActive ? 'text-bronze' : 'group-hover:text-bronze transition-colors'} />
              <span className="text-sm font-medium tracking-wide relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-white/5 space-y-4">
        <button className="flex items-center gap-3 px-4 py-2 text-white/50 hover:text-white transition-colors w-full">
          <Settings size={18} />
          <span className="text-sm font-medium">Settings</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-2 text-error hover:text-error/80 transition-colors w-full">
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      {/* Profile */}
      <div className="p-6 bg-white/5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-bronze/20 border border-bronze/30 flex items-center justify-center text-bronze font-bold">
          AD
        </div>
        <div>
          <p className="text-xs font-bold text-white uppercase tracking-wider">Admin User</p>
          <p className="text-[10px] text-white/40 uppercase">Avorria Systems</p>
        </div>
        <div className="ml-auto relative">
          <Bell size={16} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-bronze rounded-full" />
        </div>
      </div>
    </aside>
  );
}
