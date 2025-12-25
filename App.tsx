
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import MenuScreen from './screens/MenuScreen';
import SummaryScreen from './screens/SummaryScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import PreviewScreen from './screens/PreviewScreen';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MenuScreen />} />
          <Route path="/summary" element={<SummaryScreen />} />
          <Route path="/confirm" element={<ConfirmationScreen />} />
          <Route path="/preview" element={<PreviewScreen />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
