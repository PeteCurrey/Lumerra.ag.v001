import { ArrowUpRight, ArrowDownRight, ShoppingBag, MessageSquare, BarChart3, Users } from 'lucide-react';

const kpis = [
  { name: 'Revenue (MTD)', value: '£142,490', change: '+12.5%', trend: 'up', icon: BarChart3 },
  { name: 'Orders', value: '18', change: '+2', trend: 'up', icon: ShoppingBag },
  { name: 'Leads', value: '142', change: '+14%', trend: 'up', icon: MessageSquare },
  { name: 'Customers', value: '1,204', change: '-4%', trend: 'down', icon: Users },
];

const recentActivity = [
  { id: 1, type: 'order', title: 'New Order #LMR-2026-0001', time: '2 hours ago', status: 'Deposit Paid' },
  { id: 2, type: 'lead', title: 'New Concierge Lead', time: '4 hours ago', status: 'New' },
  { id: 3, type: 'order', title: 'Balance Paid #LMR-2025-0892', time: '1 day ago', status: 'Processing' },
  { id: 4, type: 'customer', title: 'New Account Created', time: '1 day ago', status: 'Verified' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.name} className="bg-white p-6 border border-[var(--color-ink-rule)] shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-[var(--color-paper-sunken)]">
                  <kpi.icon size={20} className="text-[var(--color-ink)]" />
               </div>
               <div className={`flex items-center gap-1 text-[10px] font-bold ${kpi.trend === 'up' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                  {kpi.change}
                  {kpi.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
               </div>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-quiet)] font-medium mb-1">{kpi.name}</p>
            <p className="font-display text-3xl">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-12">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white p-8 border border-[var(--color-ink-rule)] h-96 flex flex-col">
           <div className="flex justify-between items-center mb-12">
              <h2 className="font-display text-2xl">Revenue Performance</h2>
              <select className="text-xs bg-[var(--color-paper-sunken)] border-none outline-none px-3 py-1">
                 <option>Last 30 Days</option>
                 <option>Last 90 Days</option>
              </select>
           </div>
           <div className="flex-1 flex items-end gap-2 px-4 pb-4">
              {/* Mock Bars */}
              {[40, 60, 45, 70, 90, 65, 80, 50, 40, 75, 85, 95].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-[var(--color-paper-sunken)] hover:bg-[var(--color-bronze)] transition-colors group relative"
                  style={{ height: `${h}%` }}
                >
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--color-ink)] text-white text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      £{(h * 1000).toLocaleString()}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-8 border border-[var(--color-ink-rule)]">
           <h2 className="font-display text-2xl mb-8">Recent Activity</h2>
           <div className="space-y-6">
              {recentActivity.map((act) => (
                <div key={act.id} className="flex gap-4 group cursor-pointer">
                   <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-bronze)] mt-2 group-hover:scale-150 transition-transform" />
                   <div className="flex-1 border-b border-[var(--color-ink-rule)] pb-4 space-y-1">
                      <p className="text-sm font-medium">{act.title}</p>
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[var(--color-ink-quiet)]">
                         <span>{act.time}</span>
                         <span className="text-[var(--color-success)]">{act.status}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-8 py-3 border border-[var(--color-ink-rule)] text-[10px] uppercase tracking-widest hover:bg-[var(--color-paper-sunken)] transition-all">
              View All Activity
           </button>
        </div>
      </div>
    </div>
  );
}
