package main

import (
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
)

type TicketTurn struct {
	User     string `json:"user"`
	Position int    `json:"position"`
	Message  string `json:"message"`
}

var (
	currentPosition int = 100
	mu              sync.Mutex
)

func main() {
	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})
	type JoinRequest struct {
		User string `json:"user"`
	}
	r.POST("/join", func(c *gin.Context) {
		var requestBody JoinRequest
		if err := c.ShouldBindJSON(&requestBody); err != nil {
			requestBody.User = "Usuario_Desconocido"
		}
		mu.Lock()
		currentPosition++
		myTurn := currentPosition
		mu.Unlock()
		c.JSON(http.StatusOK, TicketTurn{
			User:     requestBody.User,
			Position: myTurn,
			Message:  "Estas en la fila, espera tu turno",
		})
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"service": "queue service",
		})
	})

	r.Run(":8082")
}
