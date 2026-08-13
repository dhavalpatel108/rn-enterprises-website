const fs = require('fs');
const lines = fs.readFileSync('C:/Users/dhava/.gemini/antigravity/brain/99cf378e-85cf-4ee8-b815-49efd9090fac/.system_generated/logs/transcript.jsonl', 'utf8').split('\n');
const lastInput = lines.reverse().find(l => l.includes('use this image for the pvc door image button'));
console.log(lastInput ? 'Found message in transcript' : 'Not found');
if (lastInput) {
    const json = JSON.parse(lastInput);
    // Find the base64 part of the image in the content
    // Sometimes images are just URLs, sometimes base64. Let's see if we can find data:image
    const m = lastInput.match(/data:image\/[^;]+;base64,([^\"]+)/);
    if (m) {
        fs.writeFileSync('public/pvc_door.jpg', Buffer.from(m[1], 'base64'));
        console.log('Saved to public/pvc_door.jpg using Base64');
    } else {
        console.log('No base64 image data found in the message line.');
    }
}
