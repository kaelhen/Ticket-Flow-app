import React, { useState } from 'react';
import './QueueServices.css';

const QueueService = () => {
    const [inQueue, setInQueue] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ticketData, setTicketData] = useState(null);

    const joinQueue = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost/queue/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) throw new Error('Error al unirse a la fila');

            const data = await response.json();

            console.log("Respuesta de Go:", data);
            setTicketData(data);
            setInQueue(true);

        } catch (error) {
            console.error("Error conectando con Go:", error);
            alert("⚠️ Error de conexión. Revisa que main.go esté corriendo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="service-widget go-service">
            <h4>🚀 Fila Virtual (Powered by Go)</h4>

            {inQueue ? (
                <div className="status-active">
                    <p>✅ ¡Estás en la fila!</p>
                    {ticketData && (
                        <div className="ticket-info">
                            <small>Usuario: {ticketData.user}</small>
                            <br />
                            <strong>Posición: {ticketData.position}</strong>
                            <p>{ticketData.message}</p>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={joinQueue}
                    className="btn-queue"
                    disabled={loading}
                >
                    {loading ? "Conectando..." : "Unirse a la Fila"}
                </button>
            )}
        </div>
    );
};

export default QueueService;