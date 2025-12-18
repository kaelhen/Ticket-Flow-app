import { useState, useEffect } from "react"
import { Await, useNavigate } from "react-router-dom"
import '../App.css'

function DashboardPage() {
    const [user, setUser] = useState(null)
    const [events, setEvents] = useState([])
    const [recommendationMsg, setRecommendationMsg] = useState("")
    const [recommendations, setRecommendations] = useState([])
    const [queueMsg, setQueueMsg] = useState("")
    const [loading, setLoading] = useState(true)
    const [eventForm, setEventForm] = useState({
        name: "", descripcion: "", location: "", price: 0, capacity: 0, date: ""
    })
    const [editingId, setEditingId] = useState(null)
    const navigate = useNavigate()
    const [queueToken, setQueueToken] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")

        if (!storedUser) {
            console.log("No hay usuario, redirigiendo al login...")
            navigate("/")
            return
        }

        const userData = JSON.parse(storedUser)
        setUser(userData)
        console.log("Usuario cargado:", userData)
        fetch("http://localhost/api/events")
            .then(response => response.json())
            .then(data => {
                setEvents(data)
                setLoading(false)
            })
            .catch(error => {
                console.error("Error Java:", error)
                setLoading(false)
            })

        fetch(`http://localhost/recommend/${userData.userId}`)
            .then(response => response.json())
            .then(data => {
                console.log("Python IA dice:", data)
                if (data.recommendations) {
                    setRecommendations(data.recommendations)
                    setRecommendationMsg("¡Hemos encontrado eventos basados en tus gustos!")
                } else {
                    setRecommendationMsg(data.message || "Analizando perfil...")
                }
            })
            .catch(error => {
                console.error("Error Python:", error)
                setRecommendationMsg("El servicio de IA está dormido 😴")
            })

    }, [navigate])

    const handleSaveEvent = async (e) => {
        e.preventDefault()

        if (!eventForm.name || !eventForm.price) return alert("Completa los datos")

        let formattedDate = eventForm.date;

        if (formattedDate && formattedDate.length === 16) {
            formattedDate = formattedDate + ":00";
        }

        const eventToSend = { ...eventForm, date: formattedDate };

        try {
            let response;
            if (editingId) {
                response = await fetch(`http://localhost/api/events/${editingId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(eventToSend)
                })
            } else {
                response = await fetch("http://localhost/api/events", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(eventToSend)
                })
            }

            if (response.ok) {
                alert(editingId ? "Evento actualizado exitosamente" : "Evento creado exitosamente")
                window.location.reload()
            } else {
                alert("Error al crear evento. Revisa la consola.")
            }
        } catch (error) {
            console.error("Error al crear evento:", error)
            alert("Error de conexión con Java")
        }
    }

    const handleEditClick = (event) => {
        setEditingId(event.id)
        setEventForm({
            name: event.name,
            description: event.description,
            location: event.location,
            price: event.price,
            capacity: event.capacity,
            date: event.date
        })
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const handleCancelEdit = () => {
        setEditingId(null)
        setEventFrom({
            name: "", description: "", location: "", price: 0, capacity: 0, date: ""
        })
    }

    const handleDeleteEvent = async (eventId) => {
        if (!window.confirm("¿estas seguro de eliminar este evento?"))
            return;
        try {
            const response = await fetch(`http://localhost/api/events/${eventId}`,
                { method: "DELETE" }
            )
            if (response.ok) {
                alert("Evento eliminado exitosamente")
                setEvents(events.filter(ev => ev.id !== eventId))
            } else {
                alert("Error al eliminar evento")
            }
        } catch (error) {
            console.error("Error")
        }
    }

    const handleJoinQueue = async () => {
        setQueueMsg("Procesando solicitud...")

        try {
            const response = await fetch("http://localhost/queue/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: user ? user.username : "invitado" })
            })

            if (response.ok) {
                const data = await response.json()
                // data = { turno: 123, token: "VAL...", mensaje: "..." }
                setQueueMsg(`Turno: ${data.turno} - ${data.mensaje}`)
                setQueueToken(data.token)
                alert(`Ya tienes tu turno. Posición: ${data.turno}`)
            } else {
                setQueueMsg("Error al asignar turno")
            }
        } catch (error) {
            console.error(error)
            setQueueMsg("Error al conectar con Go")
        }
    }

    const handleBuyTicket = (eventId, eventName) => {
        if (!user) return

        const purchaseData = {
            userId: user.userId,
            eventId: eventId
        }

        fetch("http://localhost/api/tickets", {
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
                alert(`¡Compra exitosa, ${user.username}!\nEvento: ${eventName}\nTicket ID: ${data.id}`)
            })
            .catch(error => {
                alert(`Error al comprar. Verifica que el backend Java esté corriendo.`)
                console.error(error)
            })
    }

    const handleLogout = () => {
        localStorage.removeItem("user")
        navigate("/")
    }

    if (!user) return null

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1 style={{ margin: 0, color: '#333' }}>🎟️ TicketFlow</h1>
                    <p style={{ margin: 0, color: '#666' }}>Bienvenido, <strong>{user.username}</strong> ({user.role})</p>
                </div>
                <button
                    onClick={handleLogout}
                    style={{ padding: '8px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Cerrar Sesión
                </button>
            </div>

            <div style={{
                backgroundColor: '#e3f2fd',
                border: '1px solid #2196f3',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '30px'
            }}>
                <h3 style={{ marginTop: 0, color: '#0d47a1' }}>🤖 Recomendaciones IA (Python)</h3>
                <p>{recommendationMsg}</p>

                {recommendations.length > 0 && (
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                        {recommendations.map((rec, index) => (
                            <div key={index} style={{ minWidth: '200px', backgroundColor: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                <strong>{rec.name}</strong>
                                <p style={{ fontSize: '0.8em', color: '#666' }}>{rec.reason}</p>
                                <span style={{ color: 'green', fontWeight: 'bold' }}>${rec.price}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div style={{ textAlign: 'center', marginBottom: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                <h3 style={{ color: '#8e44ad' }}>🚀 Fila de Alta Concurrencia (Go)</h3>
                <button
                    onClick={handleJoinQueue}
                    style={{
                        backgroundColor: '#8e44ad',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '50px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'transform 0.1s'
                    }}
                >
                    Solicitar Turno
                </button>

                {queueMsg && (
                    <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff', display: 'inline-block', borderRadius: '8px', border: '1px solid #ddd' }}>
                        <span style={{ fontSize: '1.2em' }}>{queueMsg}</span>
                    </div>
                )}
            </div>

            {user.role === 'ADMIN' && (
                <div style={{ backgroundColor: editingId ? '#d1ecf1' : '#fff3cd', padding: '20px', borderRadius: '10px', marginBottom: '30px', border: editingId ? '1px solid #bee5eb' : '1px solid #ffeeba' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>{editingId ? '✏️ Editando Evento' : '🛠 Crear Nuevo Evento'}</h3>
                        {editingId && <button onClick={handleCancelEdit} style={{ cursor: 'pointer', padding: '5px 10px' }}>Cancelar Edición</button>}
                    </div>

                    <form onSubmit={handleSaveEvent} style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
                        <input placeholder="Nombre" value={eventForm.name} onChange={e => setEventForm({ ...eventForm, name: e.target.value })} required style={{ padding: '8px' }} />
                        <input placeholder="Ubicación" value={eventForm.location} onChange={e => setEventForm({ ...eventForm, location: e.target.value })} required style={{ padding: '8px' }} />
                        <input placeholder="Descripción" value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} required style={{ gridColumn: 'span 2', padding: '8px' }} />
                        <input type="number" placeholder="Precio" value={eventForm.price} onChange={e => setEventForm({ ...eventForm, price: parseFloat(e.target.value) })} required style={{ padding: '8px' }} />
                        <input type="datetime-local" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} required style={{ padding: '8px' }} />

                        <button type="submit" style={{ gridColumn: 'span 2', backgroundColor: editingId ? '#17a2b8' : '#ffc107', color: editingId ? 'white' : 'black', border: 'none', padding: '10px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>
                            {editingId ? 'Guardar Cambios' : 'Publicar Evento'}
                        </button>
                    </form>
                </div>
            )}

            <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>📅 Todos los Eventos</h2>


            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>

                {events.map(event => (
                    <div key={event.id} style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '20px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <h2 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '1.2em' }}>{event.name}</h2>
                            <p style={{ color: '#7f8c8d', fontSize: '0.9em' }}>{event.description}</p>
                            <p style={{ fontSize: '0.9em' }}><strong>📍</strong> {event.location}</p>
                            <p style={{ fontSize: '0.9em' }}><strong>🗓</strong> {event.date.replace("T", " ")}</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                            <span style={{ color: '#27ae60', fontSize: '1.4em', fontWeight: 'bold' }}>${event.price}</span>


                            {user.role === 'ADMIN' ? (
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <button onClick={() => handleEditClick(event)} style={{ backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}>✏️</button>
                                    <button onClick={() => handleDeleteEvent(event.id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}>🗑</button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleBuyTicket(event.id, event.name)}
                                    disabled={!queueToken} // <--- Bloqueado si no hay token
                                    style={{
                                        backgroundColor: queueToken ? '#3498db' : '#bdc3c7', // Gris o Azul
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        cursor: queueToken ? 'pointer' : 'not-allowed'
                                    }}
                                >
                                    {queueToken ? "Comprar" : "Requiere Turno"}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default DashboardPage