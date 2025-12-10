import React from 'react';

const TicketCard = ({ event, onBuy }) => {
    return (
        <div className="ticket-card">
            <img src={event.image} alt={event.name} className="ticket-image" />
            <h3>{event.name}</h3>
            <p>📍 {event.location}</p>
            <p>📅 {event.date}</p>
            <div className="price-action">
                <span className="price">${event.price.toLocaleString('es-CL')}</span>
                <button onClick={() => onBuy(event)} className="btn-buy">
                    Comprar
                </button>
            </div>
        </div>
    );
};

export default TicketCard;