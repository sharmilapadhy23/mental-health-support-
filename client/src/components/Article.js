import React, { useEffect, useState } from 'react';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  // Always store API keys in environment variables in production
  const API_KEY = '638384d3b30371eb420d6f4a9eed5acf'; // Wrap in quotes
  const API_URL = `https://gnews.io/api/v4/search?q=mental%20health&lang=en&max=10&apikey=${API_KEY}`;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        // Check if articles exist in response
        if (!data.articles || !Array.isArray(data.articles)) {
          throw new Error('Invalid data format from API');
        }

        setArticles(data.articles);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [API_URL]); // Add API_URL to dependency array

  if (loading) {
    return <div className="text-gray-700 p-4">Loading articles...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  const displayedArticles = expanded ? articles : articles.slice(0, 5);

  return (
    <div className="bg-white p-4 rounded shadow-md mt-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Mental Health Articles</h2>
      
      {displayedArticles.length === 0 ? (
        <div className="text-gray-600 p-2">No articles found.</div>
      ) : (
        displayedArticles.map((article, index) => (
          <div key={index} className="border-b py-2">
            <h3 className="font-semibold">{article.title}</h3>
            <p className="text-sm text-gray-700">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm inline-block mt-1"
            >
              Read more
            </a>
          </div>
        ))
      )}

      {articles.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-blue-600 hover:underline text-sm focus:outline-none"
          aria-label={expanded ? 'Show less articles' : 'Show more articles'}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}
