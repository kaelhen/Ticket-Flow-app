# 🎟️ TicketFlow - Microservices Event Platform

**TicketFlow** is a modern, polyglot microservices application designed to demonstrate a robust architecture for high-demand event ticketing systems. It integrates multiple programming languages and technologies to solve specific domain problems efficiently.

---

## 🚀 Architecture Overview

The system is composed of independent services containerized with Docker and orchestrated via Docker Compose.

| Service | Technology | Port | Description |
| :--- | :--- | :--- | :--- |
| **Frontend App** | **React (Vite) + Node.js** | `5173` | User interface for browsing events, buying tickets, and managing user sessions. |
| **Auth Service** | **Java (Spring Boot)** | `8080` | Core backend handling Users, Events, and Ticket transactions. |
| **Recommendation Service** | **Python (FastAPI)** | `8001` | AI-powered service providing personalized event recommendations. |
| **Queue Service** | **Go (Gin)** | `8082` | High-concurrency virtual queue system for managing traffic spikes. |
| **API Gateway** | **Nginx** | `80` | Reverse proxy routing requests to appropriate backend services. |
| **Database** | **PostgreSQL** | `5432` | Centralized relational database for persistent storage. |

---

## ✨ Key Features

-   **Microservices Architecture**: Decoupled services communicating via REST APIs.
-   **Polyglot Stack**: Leverages the best tool for each job (Java for enterprise logic, Python for AI/Data, Go for concurrency, JS for UI).
-   **Virtual Queue System**: Simulates a high-traffic waiting room using Go's efficiency.
-   **AI Recommendations**: Python-based engine suggesting events based on user context.
-   **Secure Authentication**: User login and session management.
-   **Containerization**: Fully Dockerized environment for consistent deployment.

---

## 🛠️ Prerequisites

-   [Docker](https://www.docker.com/) & Docker Compose installed on your machine.
-   Git.

---

## 🏁 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kaelhen/Ticket-Flow-app.git
    cd Ticket-Flow-app
    ```

2.  **Start the application:**
    Run the following command to build and start all services:
    ```bash
    docker compose up -d --build
    ```

3.  **Access the Application:**
    Open your browser and navigate to:
    > **http://localhost**

    *The Nginx Gateway handles routing, so you don't need to access individual service ports.*

---

## 🧪 Testing the Flow

1.  **Login**: Use the default credentials (or register a new user via API).
    *   *Email*: `admin@ticketflow.com`
    *   *Password*: `admin123` (Ensure you create this user in DB or use the registration flow).
2.  **Dashboard**: View available events fetched from the Java backend.
3.  **Recommendations**: Check the "AI Service" widget to see Python-generated suggestions.
4.  **Queue**: Click "Join Queue" to interact with the Go microservice.
5.  **Buy Ticket**: Select an event and purchase a ticket (processed by Java).

---

## 📂 Project Structure

```
Ticket-Flow-app/
├── auth-service/           # Java Spring Boot Application
├── frontend-app/           # React Vite Application
├── queue-service/          # Go Gin Application
├── recommendation-service/ # Python FastAPI Application
├── gateway/                # Nginx Configuration
├── docker-compose.yml      # Orchestration file
└── .gitignore
```

---

## 👨‍💻 Author

Developed by **[Kaelhen]** as a portfolio project demonstrating advanced Full Stack and DevOps capabilities.
