# TicketFlow - Plataforma de Eventos con Microservicios

**TicketFlow** es una aplicacion moderna basada en microservicios diseñada para demostrar una arquitectura robusta capaz de manejar sistemas de venta de entradas de alta demanda. Este proyecto integra multiples lenguajes de programacion y tecnologias, aprovechando las fortalezas de cada uno para resolver problemas especificos del dominio de manera eficiente.

---

## Caracteristicas Clave

-   **Arquitectura de Microservicios**: Servicios desacoplados que se comunican a traves de APIs REST.
-   **Stack Poliglota**: Utiliza la mejor herramienta para cada tarea (Java para logica empresarial, Python para IA/Datos, Go para concurrencia, JS para UI).
-   **Sistema de Cola Virtual**: Simula una sala de espera de alto trafico utilizando la eficiencia de Go.
-   **Recomendaciones con IA**: Motor basado en Python que sugiere eventos segun el contexto del usuario.
-   **Autenticacion Segura**: Gestion de inicio de sesion y sesiones de usuario.
-   **Containerizacion**: Entorno totalmente Dockerizado para un despliegue consistente.

---

## Requisitos Previos

-   Docker y Docker Compose instalados en tu maquina.
-   Git.

---

## Comenzando

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/kaelhen/Ticket-Flow-app.git
    cd Ticket-Flow-app
    ```

2.  **Iniciar la aplicacion:**
    Ejecuta el siguiente comando para construir e iniciar todos los servicios:
    ```bash
    docker compose up -d --build
    ```

3.  **Acceder a la Aplicacion:**
    Abre tu navegador y navega a:
    > **http://localhost**

    *El API Gateway (Nginx) maneja el enrutamiento, por lo que no necesitas acceder a los puertos de los servicios individuales.*

---

## Probando el Flujo

1.  **Iniciar Sesion**: Ingresa con tu usuario registrado.
2.  **Dashboard**: Visualiza los eventos disponibles obtenidos desde el backend en Java.
3.  **Recomendaciones**: Revisa el widget de "Servicio de IA" para ver sugerencias generadas por Python.
4.  **Cola**: Haz clic en "Unirse a la Fila" para interactuar con el microservicio en Go.
5.  **Comprar Ticket**: Selecciona un evento y compra una entrada (procesado por Java).

---

## Estructura del Proyecto

```
Ticket-Flow-app/
├── auth-service/           # Aplicacion Java Spring Boot
├── frontend-app/           # Aplicacion React Vite
├── queue-service/          # Aplicacion Go Gin
├── recommendation-service/ # Aplicacion Python FastAPI
├── gateway/                # Configuracion de Nginx
├── docker-compose.yml      # Archivo de orquestacion
└── .gitignore
```

---

## Autor

Desarrollado por **[Kaelhen]** como un proyecto de portafolio para demostrar capacidades avanzadas en Full Stack y DevOps.
