import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                alert("Cuenta Creada Exitosamente, Puedes iniciar sesión")
                navigate("/")
            } else {
                alert("Error al registrar Usuario")
            }
        } catch (error) {
            console.error(error)
            alert("Error de conexion")
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
            <form onSubmit={handleRegister} style={{ padding: '40px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>📝 Crear Cuenta</h2>

                <input
                    name="username" placeholder="Usuario" onChange={handleChange} required
                    style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}
                />
                <input
                    name="email" type="email" placeholder="Correo (ej: user@mail.com)" onChange={handleChange} required
                    style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}
                />
                <input
                    name="password" type="password" placeholder="Contraseña" onChange={handleChange} required
                    style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}
                />

                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Registrarse
                </button>

                <p style={{ marginTop: '15px', textAlign: 'center' }}>
                    ¿Ya tienes cuenta? <Link to="/">Inicia Sesión</Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage