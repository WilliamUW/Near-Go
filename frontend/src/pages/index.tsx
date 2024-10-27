import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Camera, Upload, Check, Home, Book, User } from 'lucide-react';

export default function HomePage() {
  const [image, setImage] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing camera:", err));
    }
  }, []);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      const imageDataUrl = canvas.toDataURL("image/jpeg");
      setImage(imageDataUrl);
      setStep(2);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    color: 'white',
    fontWeight: 'bold' as const,
    borderRadius: '25px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
  };

  const iconStyle = {
    marginRight: '10px',
    animation: 'pulse 2s infinite',
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
    }}>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
      <h1 style={{ 
        textAlign: 'center', 
        fontSize: '36px', 
        fontWeight: 'bold', 
        color: '#4a4a4a',
        marginBottom: '20px',
        animation: 'fadeIn 1s ease-in',
      }}>
        🦁 Near Go!
      </h1>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        marginBottom: '20px', 
        backgroundColor: '#ffffff',
        padding: '10px',
        borderRadius: '25px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <Link href="/" style={{ color: '#4a4a4a', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <Home style={{ marginRight: '5px' }} /> Home
        </Link>
        <Link href="/neardex" style={{ color: '#4a4a4a', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <Book style={{ marginRight: '5px' }} /> Neardex
        </Link>
        <Link href="/profile" style={{ color: '#4a4a4a', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <User style={{ marginRight: '5px' }} /> Profile
        </Link>
      </nav>
      {step === 1 && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '25px',
              marginBottom: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          <button
            onClick={handleCapture}
            style={{
              ...buttonStyle,
              backgroundColor: '#4CAF50',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
          >
            <Camera style={iconStyle} />
            Capture
          </button>
          <button
            onClick={() => fileInputRef?.current?.click()}
            style={{
              ...buttonStyle,
              backgroundColor: '#2196F3',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e87db'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2196F3'}
          >
            <Upload style={iconStyle} />
            Upload
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </>
      )}
      {step === 2 && image && (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '25px',
          padding: '20px',
          marginTop: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 0.5s ease-in',
        }}>
          <h3 style={{ textAlign: 'center', color: '#4a4a4a', marginBottom: '15px' }}>Confirm Animal Photo</h3>
          <img
            src={image}
            alt="Captured"
            style={{
              width: '100%',
              borderRadius: '25px',
              marginBottom: '20px',
            }}
          />
          <button
            onClick={() => {/* Handle submission */}}
            style={{
              ...buttonStyle,
              backgroundColor: '#FF9800',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e68a00'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF9800'}
          >
            <Check style={iconStyle} />
            Add Record
          </button>
        </div>
      )}
    </div>
  );
}