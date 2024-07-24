import React from 'react';
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import ProductsTab from './pages/ProductsTab';
import PoliciesTab from './pages/PoliciesTab';
import HooksTab from './pages/HooksTab';
import TransactionHistoryTab from './pages/TransactionHistoryTab';
import AnalyticsTab from './pages/AnalyticsTab';
import MultiplayerModeTab from './pages/MultiplayerModeTab';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <Header />
          <TabNavigation />
          <Routes>
            <Route path="/" element={<ProductsTab />} />
            <Route path="/policies" element={<PoliciesTab />} />
            <Route path="/hooks" element={<HooksTab />} />
            <Route path="/history" element={<TransactionHistoryTab />} />
            <Route path="/analytics" element={<AnalyticsTab />} />
            <Route path="/multiplayer" element={<MultiplayerModeTab />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;