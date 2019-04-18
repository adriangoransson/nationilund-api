package main

import (
	"context"
	"log"
	"os"
	"time"

	"net/http"
	"os/signal"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	setupApi(router)

	port := ":8080"
	envPort := os.Getenv("PORT")
	if envPort != "" {
		port = ":" + envPort
	}

	// Handle server and shutdown. This is a copy-paste from the readme.
	// https://github.com/gin-gonic/gin/blob/master/examples/graceful-shutdown/graceful-shutdown/server.go
	srv := &http.Server{
		Addr:    port,
		Handler: router,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil {
			log.Printf("listen: %s\n", err)
		}
	}()

    log.Printf("Listening on %s\n", port)

	// Wait for interrupt signal to gracefully shutdown the server with
	// a timeout of 5 seconds.
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt)
	<-quit
	log.Println("Shutdown Server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server Shutdown:", err)
	}
	log.Println("Server exiting")
}
