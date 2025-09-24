import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';

import { AuthProvider } from './auth/AuthContext';
import RequireAuth from './auth/RequireAuth';

import InstagramCallback from './pages/Auth/InstagramCallback.jsx';
import LoginPage from './pages/Auth/LoginPage.jsx';
import RegisterPage from './pages/Auth/RegisterPage.jsx';

import FirstTimePage from './pages/Onboarding/FirstTimePage.jsx';
import NewUserPage from './pages/Onboarding/NewUserPage.jsx';
import CreateIntroPage from './pages/Onboarding/CreateIntroPage.jsx';
import ReturningUserPage from './pages/Onboarding/ReturningUserPage.jsx';

import InstructAIPage from './pages/Creator/InstructAIPage.jsx';
import GeneratingPage from './pages/Creator/GeneratingPage.jsx';
import ResultPage from './pages/Creator/ResultPage.jsx';
import SchedulePage from './pages/Creator/SchedulePage.jsx';
import PublishSuccessPage from './pages/Creator/PublishSuccessPage.jsx';

import RepositoryOverview from './pages/Repository/RepositoryOverview.jsx';
import ArchiveList from './pages/Repository/ArchiveList.jsx';
import ArchiveDetail from './pages/Repository/ArchiveDetail.jsx';

const router = createBrowserRouter([
  /* Públicas */
  { path: '/', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/auth/instagram/callback', element: <InstagramCallback /> },

  /* Protegidas */
  { path: '/first-time', element: <RequireAuth><FirstTimePage /></RequireAuth> },
  { path: '/onboarding/first-time', element: <RequireAuth><FirstTimePage /></RequireAuth> },

  // Onboarding (2 pantallas)
  { path: '/onboarding/new', element: <RequireAuth><NewUserPage /></RequireAuth> },
  { path: '/onboarding/create', element: <RequireAuth><CreateIntroPage /></RequireAuth> },

  // Returning (destino final del onboarding)
  { path: '/onboarding/returning', element: <RequireAuth><ReturningUserPage /></RequireAuth> },

  // Aliases/compatibilidad con rutas antiguas
  { path: '/onboarding/new-user', element: <Navigate to="/onboarding/new" replace /> },
  { path: '/onboarding/returning-user', element: <Navigate to="/onboarding/returning" replace /> },

  // Creator
  { path: '/instruct', element: <RequireAuth><InstructAIPage /></RequireAuth> },
  { path: '/instruct/generating', element: <RequireAuth><GeneratingPage /></RequireAuth> },
  { path: '/instruct/result', element: <RequireAuth><ResultPage /></RequireAuth> },
  { path: '/instruct/schedule', element: <RequireAuth><SchedulePage /></RequireAuth> },
  { path: '/publish/success', element: <RequireAuth><PublishSuccessPage /></RequireAuth> },

    // Repositorio
  { path: '/repository', element: <RequireAuth><RepositoryOverview /></RequireAuth> },
  { path: '/repository/archived', element: <RequireAuth><ArchiveList /></RequireAuth> },
  { path: '/repository/archived/:id', element: <RequireAuth><ArchiveDetail /></RequireAuth> },

  // Redirecciones
  { path: '/onboarding', element: <Navigate to="/first-time" replace /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
