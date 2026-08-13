const { Jimp } = require("jimp");

async function run() {
  try {
    const image = await Jimp.read("public/logo.jpeg");
    console.log("Image loaded.");
    
    // We assume the background is white. We will loop over pixels and set white pixels to transparent.
    // White is rgb(255, 255, 255).
    
    // Actually, setting a color to transparent in Jimp can be tricky if there are gradients/anti-aliasing.
    // A quick hack is to iterate:
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const hex = image.getPixelColor(x, y);
        const rgba = Jimp.intToRGBA(hex);
        // If pixel is very bright, make it transparent
        if (rgba.r > 240 && rgba.g > 240 && rgba.b > 240) {
          image.setPixelColor(Jimp.rgbaToInt(rgba.r, rgba.g, rgba.b, 0), x, y);
        }
      }
    }
    
    await image.write("public/logo.png");
    console.log("Saved as logo.png");
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
