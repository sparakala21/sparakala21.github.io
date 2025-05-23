// PDFPage.tsx
import React from 'react';

const PDFPage: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '1200px' }}> {/* Reduced height */}
      <iframe
        src="/resume.pdf" // Corrected path
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="PDF Viewer"
      />
    </div>
  );
};

export default PDFPage;