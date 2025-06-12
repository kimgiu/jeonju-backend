
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());

const API_KEY = "FTiRUVLFi6jvY4yJlVT/2ChAO0MhSw0ILpHjiw/YEn0nNzM9eHCR9YH09s+nG/oEGmfhSxJ+J0n2fijaN17pCw==";
const BASE_URL = "https://openapi.jeonju.go.kr/rest";

const endpoints = {
  places: "/local",
  food: "/jeonjufood",
  lodging: "/hanokhouse",
  festival: "/event/getEventList",
  shopping: "/shoppingcenter"
};

app.get("/api/:type", async (req, res) => {
  const type = req.params.type;
  const url = endpoints[type];
  if (!url) return res.status(400).send("Invalid API type");

  try {
    const result = await axios.get(`${BASE_URL}${url}`, {
      params: {
        serviceKey: API_KEY,
        dataType: "json"
      }
    });
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Jeonju Tour API Backend is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
