import { useState, useEffect } from "react"
import './App.css'

function App() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then(response => response.json())
      .then(data => {
        console.log("eventos cargados", data)
        setEvents(data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error conectando con java", error)
        setLoading(false)
      })
  }, [])

  const handleBuyTicket = (eventId, eventName) => {
    const purchaseData = {
      userId: 1,
      eventId: eventId
    }

    fetch("http://localhost:8080/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(purchaseData),
    })
      .then(response => {
        if (response.ok) return response.json()
        throw new Error("Error en la transacción")
      })
      .then(data => {
        alert(`¡Compra exitosa para el evento: ${eventName}!\nTicket ID: ${data.id}\nEstado: ${data.status}`)
      })
      .catch(error => {
        alert(`Error al comprar revisa de java esta corriendo`)
        console.error(error)
      })
  }
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🎟️ TicketFlow</h1>
      <h3 style={{ textAlign: 'center', color: '#666' }}>Tu Portafolio de Microservicios en Acción</h3>

      {loading ? (
        <p style={{ textAlign: 'center' }}>🔄 Conectando con el Backend Java...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>

          {/* Mapeamos la lista de eventos */}
          {events.length > 0 ? events.map(event => (
            <div key={event.id} style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              backgroundColor: 'white'
            }}>
              <h2 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{event.name}</h2>
              <p style={{ color: '#7f8c8d' }}>{event.description}</p>
              <hr style={{ border: '0', borderTop: '1px solid #eee' }} />
              <p><strong>📍 Ubicación:</strong> {event.location}</p>
              <p><strong>📅 Fecha:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <span style={{ color: '#27ae60', fontSize: '1.4em', fontWeight: 'bold' }}>
                  ${event.price}
                </span>
                <button
                  onClick={() => handleBuyTicket(event.id, event.name)}
                  style={{
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background 0.2s'
                  }}
                >
                  Comprar
                </button>
              </div>
            </div>
          )) : (
            <p>No hay eventos disponibles en la base de datos.</p>
          )}

        </div>
      )}
    </div>
  )
}

export default App
