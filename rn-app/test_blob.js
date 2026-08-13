import fs from 'fs';

async function testUpload() {
  const formData = new FormData();
  
  // Create a dummy file
  const blob = new Blob(['Hello World!'], { type: 'application/pdf' });
  formData.append('file', blob, 'test.pdf');
  
  // We need to bypass auth or pass session cookie to test local /api/upload.
  // Actually, Vercel Blob can be tested directly using their SDK if we use the token.
  
  const { put } = await import('@vercel/blob');
  
  try {
    const res = await put('test_upload.pdf', 'Hello World', {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    console.log('Upload success:', res.url);
  } catch (err) {
    console.error('Upload failed:', err);
  }
}

testUpload();
