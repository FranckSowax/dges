import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  Settings, 
  LogOut, 
  User,
  Bell
} from 'lucide-react';

const StudentLayout = ({ children }) => {
  const { signOut, user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/etudiant/dashboard' },
    { icon: GraduationCap, label: 'Mes Demandes', path: '/etudiant/demandes' },
    { icon: FileText, label: 'Documents', path: '/etudiant/documents' },
    { icon: User, label: 'Mon Profil', path: '/etudiant/profil' },
  ];

  return (
    <div className="min-h-screen bg-neutral-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-gray-light hidden md:flex flex-col fixed h-full">
        <div className="p-6 border-b border-neutral-gray-light">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gabon-green rounded-lg"></div>
            <span className="font-bold text-xl">DGES Étudiant</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-gabon-green/10 text-gabon-green font-medium' 
                    : 'text-neutral-gray-dark hover:bg-neutral-background'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-gray-light">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-neutral-gray-light flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-neutral-black">
            Espace Étudiant
          </h1>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-neutral-background rounded-full relative">
              <Bell className="w-5 h-5 text-neutral-gray-dark" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-neutral-gray-light">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-neutral-black">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-xs text-neutral-gray-dark">{user?.email}</p>
              </div>
              <div className="w-10 h-10 bg-gabon-green/10 rounded-full flex items-center justify-center text-gabon-green font-bold">
                {profile?.first_name?.[0]}{profile?.last_name?.[0]}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
