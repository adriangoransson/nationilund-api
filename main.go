package main

import (
	"github.com/gin-gonic/gin"
)

const PAGETITLE = "Nation i Lund"

func main() {
	router := gin.Default()

	setupApi(router)

	router.LoadHTMLGlob("templates/*.tmpl")

	router.GET("/", func (c *gin.Context) {
		c.HTML(200, "index.tmpl", gin.H{"title": PAGETITLE})
	})

	router.GET("/about", func (c *gin.Context) {
		title := "About"
		c.HTML(200, "about.tmpl", gin.H{
			"title":		title,
			"pageTitle":	createTitle(title),
		})
	})

	router.Static("/assets", "./assets")

	router.Run() // listen and serve on 0.0.0.0:8080
}
