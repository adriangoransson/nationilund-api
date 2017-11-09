package main

import (
	"context"
	"log"
	"os"
	"time"

	"os/signal"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	setupApi(router)

	router.LoadHTMLGlob("templates/*")

	router.GET("/", func (c *gin.Context) {
		c.HTML(200, "index.tmpl", gin.H{})
	})

	router.GET("/about", func (c *gin.Context) {
		title := "About"
		c.HTML(200, "about.tmpl", gin.H{"title": title})
	})

	router.Static("/assets", "./assets")

	// Handle server and shutdown. This is a copy-paste from the readme.
	// https://github.com/gin-gonic/gin/blob/master/examples/graceful-shutdown/graceful-shutdown/server.go
	srv := &http.Server{
		Addr: 	":8080",
		Handler: router,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil {
			log.Printf("listen: %s\n", err)
		}
	}()

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
