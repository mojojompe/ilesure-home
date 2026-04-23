const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/illustrations');

async function processImages() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const img = await Jimp.read(filePath);
      console.log('Processing', file);
      
      // We will make any pixel close to white transparent
      img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
        const red = this.bitmap.data[idx + 0];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];
        const alpha = this.bitmap.data[idx + 3];
        
        // Threshold for 'white' (240-255 range). The background generated uses pure or near white.
        if (red > 240 && green > 240 && blue > 240) {
          // Set alpha to 0
          this.bitmap.data[idx + 3] = 0;
        }
      });
      // Overwrite the file
      await img.writeAsync(filePath);
      console.log('Saved', file);
    } catch (e) {
      console.error('Failed processing', file, e);
    }
  }
}
processImages();
