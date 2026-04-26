import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper-sunken">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
