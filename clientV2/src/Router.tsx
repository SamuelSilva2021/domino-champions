import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { PlayerPage } from './pages/PlayerPage/Player.page';

export function AppRouter () {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jogadores" element={<PlayerPage />} />
        {/* ... outras rotas */}
      </Routes>
  );
};
