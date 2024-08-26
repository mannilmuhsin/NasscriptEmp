import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import LeaveVacation from './components/LeaveVacation';
import Reports from './components/Reports';
import EditEmployee from './components/EditEmployee';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-grow">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateEmployee />} />
              <Route path="/leave" element={<LeaveVacation />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/edit/:id" element={<EditEmployee />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  </LocalizationProvider>
  );
}

export default App;