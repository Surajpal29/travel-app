
import Tour from "../models/Tour.js";

export const recomandationController =async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({ success: false, message: 'Query is required' });
    }

    const regex = new RegExp(query.trim(), 'i');
    const matchedTours = await Tour.find({
      $or: [
        { title: regex },
        { city: regex },
        { address: regex },
        { desc: regex },
      ],
    });

    const recommendations = matchedTours.map((tour) => {
      let score = 0;
      const fields = [tour.title, tour.city, tour.address, tour.desc];
      fields.forEach((field) => {
        if (field.toLowerCase().includes(query.toLowerCase())) {
          score += 25; // weightage
        }
      });

      return {
        id:tour._id,
        title: tour.title,
        description: tour.desc.substring(0, 100) + '...',
        location: tour.city,
        score,
        photo: tour.photo,
        price: tour.price,
      };
    });

    // Sort by score descending
    recommendations.sort((a, b) => b.score - a.score);

    res.status(200).json({ success: true, recommendations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}