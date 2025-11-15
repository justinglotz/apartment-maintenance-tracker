import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [connectionStatus, setConnectionStatus] = useState({
    loading: true,
    connected: false,
    message: 'Checking connection...'
  });

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${apiUrl}/health`);

        if (response.data.status === 'ok' && response.data.database === 'connected') {
          setConnectionStatus({
            loading: false,
            connected: true,
            message: 'Connected'
          });
        } else {
          setConnectionStatus({
            loading: false,
            connected: false,
            message: 'Backend connected but database disconnected'
          });
        }
      } catch (error) {
        setConnectionStatus({
          loading: false,
          connected: false,
          message: 'Not connected'
        });
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Hello World
        </h1>
        <div className="mt-6">
          {connectionStatus.loading ? (
            <p className="text-gray-600">Checking connection...</p>
          ) : (
            <p className={`text-lg font-semibold ${connectionStatus.connected ? 'text-green-600' : 'text-red-600'}`}>
              {connectionStatus.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
