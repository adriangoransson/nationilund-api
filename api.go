package main

import (
	"github.com/gin-gonic/gin"
	"github.com/adriangoransson/studentlund-calendar"
)

func setupApi(router *gin.Engine) {
	api := router.Group("/api")

	api.GET("/", func (c *gin.Context) {
		title := "API"
		c.HTML(200, "api.tmpl", gin.H{
			"title":	 title,
			"pageTitle": createTitle("API"),
		})
	})


	day := api.Group("/day")
	{
		day.GET("/", func(c *gin.Context) {
			events, err := studentlund.GetCurrentDay()
			if err != nil {
				c.AbortWithError(400, err)
				return
			}

			c.JSON(200, events)
		})

		day.GET("/:date", func (c *gin.Context) {
			date, err := parseDate(c.Param("date"))

			if err != nil {
				c.AbortWithError(400, err)
				return
			}

			events, err := studentlund.GetDay(date)
			if err != nil {
				c.AbortWithError(400, err)
				return
			}

			c.JSON(200, events)
		})
	}

	week := api.Group("/week")
	{
		week.GET("/", func (c *gin.Context) {
			events, err := studentlund.GetCurrentWeek()
			if err != nil {
				c.AbortWithError(400, err)
				return
			}

			c.JSON(200, events)
		})

		week.GET("/:date", func (c *gin.Context) {
			date, err := parseDate(c.Param("date"))

			if err != nil {
				c.AbortWithError(400, err)
				return
			}

			events, err := studentlund.GetWeek(date)
			if err != nil {
				c.AbortWithError(400, err)
				return
			}

			c.JSON(200, events)
		})
	}

	month := api.Group("/month")
	{
		month.GET("/", func (c *gin.Context) {
			events, err := studentlund.GetCurrentMonth()
			if err != nil {
				c.AbortWithError(400, err)
				return
			}

			c.JSON(200, events)
		})

		month.GET("/:date", func (c *gin.Context) {
			date, err := parseDate(c.Param("date"))

			if err != nil {
				c.AbortWithError(400, err)
				return
			}

			events, err := studentlund.GetMonth(date)
			if err != nil {
				c.AbortWithError(400, err)
				return
			}

			c.JSON(200, events)
		})
	}
}
