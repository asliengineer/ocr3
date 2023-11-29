const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;
const tesseract = require("node-tesseract-ocr")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//app.use(express.json());

app.post('/extractText', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const imageBuffer = req.file.buffer;
    // OCR k liye CODE
    const config = {
        lang: "eng",
        oem: 1,
        psm: 3,
      }
      
      tesseract
        .recognize(imageBuffer, config)
        .then((text) => {
          console.log(text);  
          res.json({ text });
            
        })
        .catch((error) => {
          console.log(error.message)
        })
  
    // OCR KHATAM
  } catch (error) {
    res.status(500).json({ error: 'Error extracting text from the image' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});