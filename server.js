const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;
const API_KEY = 'FTiRUVLFi6jvY4yJlVT/2ChAO0MhSw0ILpHjiw/YEn0nNzM9eHCR9YH09s+nG/oEGmfhSxJ+J0n2fijaN17pCw==';

app.get('/', (req, res) => {
  res.send('Jeonju GPT Backend API 서버입니다.');
});

// ✅ Jeonju 음식 API
app.get('/api/jeonju/food', async (req, res) => {
  try {
    const url = `https://openapi.jeonju.go.kr/rest/jeonjufood/getJeonjuFoodList?serviceKey=${encodeURIComponent(API_KEY)}&pageNo=1&numOfRows=10&type=json`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('음식 API 호출 실패:', error.message);
    res.status(500).json({ error: 'Jeonju API 호출 실패' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
