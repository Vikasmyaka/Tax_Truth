import { Routes, Route } from 'react-router-dom';
import WizardController from './wizard/WizardController';
import ResultPage from './results/ResultPage';
import TaxLibrary from './library/TaxLibrary';
import Form16Upload from './upload/Form16Upload';
import Dashboard from './dashboard/Dashboard';
import CTCOptimizer from './ctc/CTCOptimizer';
import CapitalGains from './capitalgains/CapitalGains';
import ITRAcademy from './itr/ITRAcademy';
import './styles/tokens.css';
import './styles/global.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/calculate" element={<WizardController />} />
      <Route path="/results" element={<ResultPage />} />
      <Route path="/library" element={<TaxLibrary />} />
      <Route path="/upload" element={<Form16Upload />} />
      <Route path="/ctc-optimizer" element={<CTCOptimizer />} />
      <Route path="/capital-gains" element={<CapitalGains />} />
      <Route path="/itr" element={<ITRAcademy />} />
    </Routes>
  );
}

export default App;
