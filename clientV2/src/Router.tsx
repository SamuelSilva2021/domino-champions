import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { PlayerPage } from './pages/PlayerPage/Player.page';
import PairPage from './pages/DoublePage/DoublePage';
import GamesPage from './pages/GamesPage/GamesPage';
import AnaliticsPage from './pages/AnaliticsPage/AnaliticsPage';
import SecurityPage from './pages/SecurityPage/SecurityPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';

export function AppRouter () {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jogadores" element={<PlayerPage />} />
        <Route path="/duplas" element={<PairPage />} />
        <Route path="/jogos" element={<GamesPage />} />
        <Route path="/analises" element={<AnaliticsPage />} />
        <Route path="/seguranca" element={<SecurityPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
  );
};
