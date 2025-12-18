import { analyzeUrl } from "../services/score.service.js";

export const checkUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const analysis = await analyzeUrl(url);

    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({
      message: "URL analysis failed",
      error: error.message
    });
  }
};
