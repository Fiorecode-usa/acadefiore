import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './App.module.css'

//Templates
import LandingTemplate from './components/templates/landing-template/LandingTemplate'
import AuthTemplate from './components/templates/auth-template/AuthTemplate'
import DashboardTemplate from './components/templates/dashboard-template/DashboardTemplate'

//Routes
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'

//Pages - Public
import LandingPage from './pages/public/landing-page/LandingPage'
import AuthPage from './pages/public/auth-page/AuthPage'

//Pages - Private
import DashboardPage from './pages/private/dashboard-page.tsx/DashboardPage'
import CalculatorPage from './pages/private/calculator-page.tsx/CalculatorPage'

//Google Analytics Tracker
import PageViewTracker from './components/atoms/ga-tracker/PageViewTracker'

function App() {

  return (
    <>
      <BrowserRouter>
        <PageViewTracker />
        <Routes>

          {/* GRUPO DE RUTAS PÚBLICAS - LANDING */}
          <Route path="/" element={<LandingTemplate />}>
            <Route index element={<LandingPage/>} />
          </Route>

          {/* GRUPO DE RUTAS PÚBLICAS - AUTENTICACIÓN */}
          <Route path="/auth" element={
            <PublicRoute redirectIfAuth={true}>
              <AuthTemplate />
            </PublicRoute>
          }>
            <Route index element={<AuthPage/>} />
          </Route>

          {/* RUTAS PRIVADAS - Requiere autenticación */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardTemplate />
            </PrivateRoute>
          }>
            <Route index element={<DashboardPage/>} />
          </Route>

          <Route path="/calculator" element={
            <PrivateRoute>
              <DashboardTemplate />
            </PrivateRoute>
          }>
            <Route index element={<CalculatorPage/>} />
          </Route>

          {/* CATCH-ALL 404: Redirige a la landing si la ruta no existe */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
