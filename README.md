# 🎟️ TicketFlow - Plataforma de Eventos con Microservicios

**TicketFlow** es una aplicación moderna basada en microservicios diseñada para demostrar una arquitectura robusta capaz de manejar sistemas de venta de entradas de alta demanda. Este proyecto integra múltiples lenguajes de programación y tecnologías, aprovechando las fortalezas de cada uno para resolver problemas específicos del dominio de manera eficiente.

---

## ✨ Características Clave

-   **Arquitectura de Microservicios**: Servicios desacoplados que se comunican a través de APIs REST.
-   **Stack Políglota**: Utiliza la mejor herramienta para cada tarea (Java para lógica empresarial, Python para IA/Datos, Go para concurrencia, JS para UI).
-   **Sistema de Cola Virtual**: Simula una sala de espera de alto tráfico utilizando la eficiencia de Go.
-   **Recomendaciones con IA**: Motor basado en Python que sugiere eventos según el contexto del usuario.
-   **Autenticación Segura**: Gestión de inicio de sesión y sesiones de usuario.
-   **Containerización**: Entorno totalmente Dockerizado para un despliegue consistente.

---

## 🛠️ Requisitos Previos

-   [Docker](https://www.docker.com/) y Docker Compose instalados en tu máquina.
-   Git.

---

## 🏁 Comenzando

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/kaelhen/Ticket-Flow-app.git
    cd Ticket-Flow-app
    ```

2.  **Iniciar la aplicación:**
    Ejecuta el siguiente comando para construir e iniciar todos los servicios:
    ```bash
    docker compose up -d --build
    ```

3.  **Acceder a la Aplicación:**
    Abre tu navegador y navega a:
    > **http://localhost**

    *El API Gateway (Nginx) maneja el enrutamiento, por lo que no necesitas acceder a los puertos de los servicios individuales.*

---

## 🧪 Probando el Flujo

1.  **Iniciar Sesión**: Ingresa con tu usuario registrado.
2.  **Dashboard**: Visualiza los eventos disponibles obtenidos desde el backend en Java.
3.  **Recomendaciones**: Revisa el widget de "Servicio de IA" para ver sugerencias generadas por Python.
4.  **Cola**: Haz clic en "Unirse a la Fila" para interactuar con el microservicio en Go.
5.  **Comprar Ticket**: Selecciona un evento y compra una entrada (procesado por Java).

---

## 📂 Estructura del Proyecto

```
Ticket-Flow-app/
├── auth-service/           # Aplicación Java Spring Boot
├── frontend-app/           # Aplicación React Vite
├── queue-service/          # Aplicación Go Gin
├── recommendation-service/ # Aplicación Python FastAPI
├── gateway/                # Configuración de Nginx
├── docker-compose.yml      # Archivo de orquestación
└── .gitignore
```

---

## 👨‍💻 Autor

Desarrollado por **[Kaelhen]** como un proyecto de portafolio para demostrar capacidades avanzadas en Full Stack y DevOps.
