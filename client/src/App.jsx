import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Analytics from "./pages/Analytics";
import Build from "./pages/Build";
import Settings from "./pages/Settings";
import Inicio from "./pages/Inicio";
import PlayerTable from "./components/PlayTable";
import Duplas from "./pages/Duplas";
import Tabela from "./pages/Tabela"
const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/jogadores" element={<PlayerTable/>} />
        <Route path="/duplas" element={<Duplas />} />
        <Route path="/tabela" element={<Tabela/>}/>
        <Route path="/settings" element={<Settings />} />
        <Route path="/build/:bID" element={<Build />} />
        <Route path="/analytics/:aID" element={<Analytics />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
