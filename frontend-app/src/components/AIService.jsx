import React, { useState } from 'react';

const AIService = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getRecommendation = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8001/1');

            if (!response.ok) throw new Error("Error conectando con Python");

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setRecommendations(data || []);

        } catch (err) {
            console.error("Error:", err);
            setError("⚠️ No pudimos conectar con la base de datos de eventos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="service-widget ai-service" style={{ borderTop: "4px solid #FFD43B", background: "#fffbe6", padding: "20px", borderRadius: "12px" }}>
            <h4 style={{ color: "#306998", textAlign: 'center' }}>🐍 Python IA Service</h4>

            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <button
                    onClick={getRecommendation}
                    disabled={loading}
                    style={{
                        padding: "8px 16px",
                        background: "#306998",
                        color: "white",
                        border: "none",
                        borderRadius: "20px",
                        cursor: loading ? "wait" : "pointer",
                        fontWeight: "bold"
                    }}
                >
                    {loading ? "🔍 Consultando DB..." : "🔮 Ver Recomendaciones"}
                </button>
            </div>

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            {recommendations.length > 0 && (
                <div style={{ textAlign: 'left', marginTop: '10px' }}>
                    <p style={{ fontSize: '0.9em', color: '#666', textAlign: 'center' }}>Eventos sugeridos para ti:</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {recommendations.map((rec, index) => (
                            <li key={index} style={{ background: 'white', padding: '10px', marginBottom: '8px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                <strong>{rec.name}</strong>
                                <br />
                                <small>{rec.description}</small>
                                <br />
                                <span style={{ color: 'green', fontWeight: 'bold' }}>${rec.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AIService;