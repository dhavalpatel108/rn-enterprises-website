"use client";

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfThumbnail({ file }: { file: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-24 bg-surface-container-low flex items-center justify-center pointer-events-none">
        <span className="material-symbols-outlined text-secondary/40 text-3xl">meeting_room</span>
      </div>
    );
  }

  return (
    <div className="w-full h-24 overflow-hidden pointer-events-none flex items-center justify-center bg-white">
      <Document 
        file={file} 
        loading={<span className="text-xs text-secondary animate-pulse">Loading...</span>}
        onLoadError={() => setError(true)}
        onSourceError={() => setError(true)}
      >
        <Page pageNumber={1} height={96} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
    </div>
  );
}
