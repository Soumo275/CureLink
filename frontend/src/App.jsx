import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext'; // Importing the correct AuthProvider
import { useEffect, useState } from 'react';
import Loading from './components/Loading';

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate a loading screen for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  // If still loading, show the loading component
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <AuthProvider> 
        <Navbar />
        <main>
          <Outlet /> 
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
