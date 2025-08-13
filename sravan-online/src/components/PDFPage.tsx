import React, { useState, useEffect } from 'react';

const PDFPage: React.FC = () => {
  const [showFallback, setShowFallback] = useState(false);
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewInNewTab = () => {
    window.open('/resume.pdf', '_blank');
  };

  useEffect(() => {
    // Set a timeout to show fallback if iframe doesn't load
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: '100%', height: '1200px' }}>
      <div style={{ 
        padding: '10px', 
        backgroundColor: '#f5f5f5', 
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px'
      }}>
        <button onClick={handleViewInNewTab} style={{
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          Open in New Tab
        </button>
        <button onClick={handleDownload} style={{
          backgroundColor: '#2C2C2C',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          Download PDF
        </button>
      </div>
      
      {showFallback ? (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h3>PDF Preview Not Available</h3>
          <p>GitHub Pages doesn't support PDF embedding in some browsers.</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button onClick={handleViewInNewTab} style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              View in New Tab
            </button>
            <button onClick={handleDownload} style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Download Resume
            </button>
          </div>
        </div>
      ) : (
        <iframe
          src="/resume.pdf"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="PDF Viewer"
          onLoad={() => setShowFallback(false)}
          onError={() => setShowFallback(true)}
        />
      )}
    </div>
  );
};

export default PDFPage;