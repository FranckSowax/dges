import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/Auth/ProtectedRoute'

import App from './App.jsx'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import StudentDashboard from './pages/Student/Dashboard.jsx'
import ApplicationForm from './pages/Student/ApplicationForm.jsx'

import Organigramme from './pages/Organigramme.jsx'
import AnnuaireResponsables from './pages/AnnuaireResponsables.jsx'
import AttributionOrganisation from './pages/AttributionOrganisation.jsx'
import AnnuaireUniversites from './pages/AnnuaireUniversites.jsx'
import EtablissementsPublics from './pages/EtablissementsPublics.jsx'
import EtablissementsPrives from './pages/EtablissementsPrives.jsx'
import EtablissementsRUP from './pages/EtablissementsRUP.jsx'
import EtablissementsInterEtat from './pages/EtablissementsInterEtat.jsx'
import ConventionsCooperation from './pages/ConventionsCooperation.jsx'
import Actualites from './pages/Actualites.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DashboardEtablissements from './pages/DashboardEtablissements.jsx'
import DashboardConventions from './pages/DashboardConventions.jsx'
import DashboardActualites from './pages/DashboardActualites.jsx'
import DashboardHome from './pages/DashboardHome.jsx'
import DashboardKnowledge from './pages/DashboardKnowledge.jsx'
import DashboardOrganigramme from './pages/DashboardOrganigramme.jsx'
import DashboardResponsables from './pages/DashboardResponsables.jsx'
import DashboardAttribution from './pages/DashboardAttribution.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          {/* Student Routes (Protected) */}
          <Route path="/etudiant/dashboard" element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/etudiant/demandes" element={
            <ProtectedRoute>
              <StudentDashboard /> 
              {/* À remplacer par une liste de demandes si on veut une page dédiée, sinon dashboard suffit pour l'instant */}
            </ProtectedRoute>
          } />
          <Route path="/etudiant/demandes/nouvelle" element={
            <ProtectedRoute>
              <ApplicationForm />
            </ProtectedRoute>
          } />

          <Route path="/dges/organigramme" element={<Organigramme />} />
        <Route path="/dges/responsables" element={<AnnuaireResponsables />} />
        <Route path="/dges/attribution-organisation" element={<AttributionOrganisation />} />
        <Route path="/universites" element={<AnnuaireUniversites />} />
        <Route path="/etablissements-publics" element={<EtablissementsPublics />} />
        <Route path="/etablissements-prives" element={<EtablissementsPrives />} />
        <Route path="/etablissements-rup" element={<EtablissementsRUP />} />
        <Route path="/etablissements-inter-etat" element={<EtablissementsInterEtat />} />
        <Route path="/cooperation/accords" element={<ConventionsCooperation />} />
        <Route path="/actualites" element={<Actualites />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/home" element={<DashboardHome />} />
        <Route path="/dashboard/knowledge" element={<DashboardKnowledge />} />
        
        {/* DGES Management */}
        <Route path="/dashboard/organigramme" element={<DashboardOrganigramme />} />
        <Route path="/dashboard/responsables" element={<DashboardResponsables />} />
        <Route path="/dashboard/attribution" element={<DashboardAttribution />} />
        
        <Route path="/dashboard/etablissements" element={<DashboardEtablissements />} />
        <Route path="/dashboard/etablissements-publics" element={<DashboardEtablissements />} />
        <Route path="/dashboard/etablissements-publics/universites" element={<DashboardEtablissements />} />
        <Route path="/dashboard/etablissements-publics/instituts" element={<DashboardEtablissements />} />
        <Route path="/dashboard/etablissements-publics/grandes-ecoles" element={<DashboardEtablissements />} />
        <Route path="/dashboard/etablissements-publics/centres-universitaires" element={<DashboardEtablissements />} />
        <Route path="/dashboard/etablissements-prives" element={<DashboardEtablissements />} />
        <Route path="/dashboard/etablissements-rup" element={<DashboardEtablissements />} />
        <Route path="/dashboard/etablissements-inter-etat" element={<DashboardEtablissements />} />
        <Route path="/dashboard/cooperation" element={<DashboardConventions />} />
        <Route path="/dashboard/actualites" element={<DashboardActualites />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
