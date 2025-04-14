import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/diagnose`, {
        symptoms,
      });
      setResult(response.data.diagnosis); // <-- Fixed this line
    } catch (error) {
      console.error('Error diagnosing the symptoms', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Car Diagnosis</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Enter symptoms:</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe the car symptoms"
            rows="4"
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Diagnose
          </button>
        </form>
        {result && (
          <div className="mt-4">
            <h2 className="font-bold">Diagnosis Result:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
