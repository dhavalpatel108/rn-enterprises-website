"use client";

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfThumbnail({ file }: { file: string }) {
  return (
    <div className="w-full h-24 overflow-hidden pointer-events-none flex items-center justify-center bg-white">
      <Document file={file} loading={<span className="text-xs text-secondary animate-pulse">Loading...</span>}>
        <Page pageNumber={1} height={96} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
    </div>
  );
}
