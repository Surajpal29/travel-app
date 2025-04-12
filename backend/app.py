from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import time  # For response delay simulation
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load tours dataset
with open('tours.json', 'r') as f:
    tours = json.load(f)

# Process descriptions for similarity matching
descriptions = [tour['description'] for tour in tours]
vectorizer = TfidfVectorizer().fit(descriptions)
tour_vectors = vectorizer.transform(descriptions)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_input = data.get('query')

    if not user_input:
        return jsonify({"error": "Query cannot be empty"}), 400

    input_vector = vectorizer.transform([user_input])
    similarities = cosine_similarity(input_vector, tour_vectors).flatten()

    # Get top 3 recommendations
    top_indices = similarities.argsort()[-3:][::-1]
    recommendations = [
        {**tours[i], "score": round(similarities[i] * 100, 2)}
        for i in top_indices
    ]

    # Simulate delay for realistic response time
    time.sleep(1)

    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
