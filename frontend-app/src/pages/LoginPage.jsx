import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        setError("")

        const loginData = {
            username: email,
            password: password
        }
        fetch("http://localhost/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Credenciales invalidas")
                }
                return response.json()
            })
            .then(data => {
                console.log("Login exitoso", data)
                localStorage.setItem("user", JSON.stringify(data))
                navigate("/dashboard")
            })
            .catch(error => {
                console.error(error)
                setError("Error: Usuario o contraseña incorrectos")
            })
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f6fa' }}>
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '350px' }}>
                <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>🔐 Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d' }}>Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            placeholder="admin@ticketflow.com"
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d' }}>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            placeholder="********"
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
                        Entrar a TicketFlow
                    </button>
                </form>
                <hr style={{ margin: '25px 0', border: '0', borderTop: '1px solid #eee' }} />

                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>¿No tienes cuenta?</p>
                    <Link to="/register">
                        <button style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#2ecc71',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>
                            Crear Cuenta Nueva
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
