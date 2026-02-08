import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PortfolioAnalytics from './pages/portfolio-analytics';
import ExecutiveDashboard from './pages/executive-dashboard';
import ComplianceDashboard from './pages/compliance-dashboard';
import SmartContractManager from './pages/smart-contract-manager';
import VirtualBoardroom from './pages/virtual-boardroom';
import TransactionMonitor from './pages/transaction-monitor';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ExecutiveDashboard />} />
        <Route path="/portfolio-analytics" element={<PortfolioAnalytics />} />
        <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
        <Route path="/compliance-dashboard" element={<ComplianceDashboard />} />
        <Route path="/smart-contract-manager" element={<SmartContractManager />} />
        <Route path="/virtual-boardroom" element={<VirtualBoardroom />} />
        <Route path="/transaction-monitor" element={<TransactionMonitor />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
