package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type TicketTurn struct {
	User     string `json:"user"`
	Position int    `json:"position"`
	Message  string `json:"message"`
}

func main() {
	r := gin.Default()
	r.POST("/queue/join", func(c *gin.Context) {
		c.JSON(http.StatusOK, TicketTurn{
			User:     "Usuario_Anonimo",
			Position: 145,
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
