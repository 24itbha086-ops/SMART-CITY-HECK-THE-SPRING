import { Header } from "../common/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
