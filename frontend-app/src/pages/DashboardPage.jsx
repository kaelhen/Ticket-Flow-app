import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom" // Importamos para redirigir
import '../App.css'

function DashboardPage() {
    const [user, setUser] = useState(null) // Estado para el usuario logueado
    const [events, setEvents] = useState([])
    const [recommendationMsg, setRecommendationMsg] = useState("")
    const [recommendations, setRecommendations] = useState([]) // Para guardar la lista de eventos sugeridos
    const [queueMsg, setQueueMsg] = useState("")
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        // 1. VERIFICACIÓN DE SEGURIDAD (Gatekeeper)
        const storedUser = localStorage.getItem("user")

        if (!storedUser) {
            console.log("No hay usuario, redirigiendo al login...")
            navigate("/") // Si no hay usuario, patada al Login
            return
        }

        const userData = JSON.parse(storedUser)
        setUser(userData)
        console.log("Usuario cargado:", userData)

        // 2. CARGAR EVENTOS (JAVA)
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

        // 3. CARGAR RECOMENDACIONES PERSONALIZADAS (PYTHON)
        // Usamos el ID real del usuario logueado
        fetch(`http://localhost/recommend/${userData.userId}`)
            .then(response => response.json())
            .then(data => {
                console.log("Python IA dice:", data)
                // Python nos devuelve { user_id, recommendations: [] }
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

    const handleJoinQueue = () => {
        if (!user) return

        setQueueMsg("Conectando con Go...")

        // 4. UNIRSE A LA FILA (GO)
        // Ahora enviamos el nombre real del usuario
        fetch("http://localhost/queue/join", {
            method: "POST",
            body: JSON.stringify({ user: user.username }) // <--- AQUÍ ESTÁ LA CLAVE
        })
            .then(response => {
                if (response.ok) return response.json()
                throw new Error("Error en el servicio de Go")
            })
            .then(data => {
                // data = { user, position, message }
                setQueueMsg(`✅ Turno asignado a ${data.user}. Tu posición es: #${data.position}`)
            })
            .catch(error => {
                console.error(error)
                setQueueMsg("Error: El servicio de colas no responde")
            })
    }

    const handleBuyTicket = (eventId, eventName) => {
        if (!user) return

        const purchaseData = {
            userId: user.userId, // <--- USAMOS EL ID REAL DEL USUARIO
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

    if (!user) return null // Evita parpadeos mientras redirige

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>

            {/* HEADER CON SALUDO Y LOGOUT */}
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

            {/* SECCIÓN PYTHON (RECOMENDACIONES) */}
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

            {/* SECCIÓN GO (FILA VIRTUAL) */}
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

                {/* Mensaje de respuesta de Go */}
                {queueMsg && (
                    <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff', display: 'inline-block', borderRadius: '8px', border: '1px solid #ddd' }}>
                        <span style={{ fontSize: '1.2em' }}>{queueMsg}</span>
                    </div>
                )}
            </div>

            {/* LISTA PRINCIPAL DE EVENTOS (JAVA) */}
            <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>📅 Todos los Eventos</h2>

            {loading ? (
                <p style={{ textAlign: 'center' }}>🔄 Cargando eventos desde Java...</p>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                    marginTop: '20px'
                }}>
                    {events.length > 0 ? events.map(event => (
                        <div key={event.id} style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '12px',
                            padding: '20px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            backgroundColor: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <h2 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '1.2em' }}>{event.name}</h2>
                                <p style={{ color: '#7f8c8d', fontSize: '0.9em' }}>{event.description}</p>
                                <hr style={{ border: '0', borderTop: '1px solid #eee' }} />
                                <p style={{ fontSize: '0.9em' }}><strong>📍</strong> {event.location}</p>
                            </div>

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
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Comprar
                                </button>
                            </div>
                        </div>
                    )) : (
                        <p>No hay eventos disponibles.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default DashboardPage
