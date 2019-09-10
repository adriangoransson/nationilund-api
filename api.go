package main

import (
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/adriangoransson/studentlund"
)

func nationFilter(events []studentlund.Event, filter bool) []studentlund.Event {
	if !filter {
		return events
	}

	filtered := make([]studentlund.Event, 0)

	for _, event := range events {
		if strings.Contains(event.Organizer.Name, "Nation") {
			filtered = append(filtered, event)
		}
	}

	return filtered
}

func filterParam(c *gin.Context) bool {
	return c.Query("all") == ""
}

func getDateFromContext(c *gin.Context) (time.Time, bool) {
	t, err := time.Parse("2006-01-02", c.Param("date"))
	if err != nil {
		c.AbortWithError(400, err)
		return time.Now(), false
	}

	return t, true
}

func setupAPI(router *gin.Engine) {
	router.Use(cors.Default())

	day := router.Group("/day")
	{
		day.GET("", func(c *gin.Context) {
			events, err := studentlund.GetCurrentDay()
			if err != nil {
				c.AbortWithError(503, err)
				return
			}

			c.JSON(200, nationFilter(events, filterParam(c)))
		})

		day.GET("/:date", func(c *gin.Context) {
			date, ok := getDateFromContext(c)
			if !ok {
				return
			}

			events, err := studentlund.GetDay(date)
			if err != nil {
				c.AbortWithError(503, err)
				return
			}

			c.JSON(200, nationFilter(events, filterParam(c)))
		})
	}

	week := router.Group("/week")
	{
		week.GET("", func(c *gin.Context) {
			events, err := studentlund.GetCurrentWeek()
			if err != nil {
				c.AbortWithError(503, err)
				return
			}

			c.JSON(200, nationFilter(events, filterParam(c)))
		})

		week.GET("/:date", func(c *gin.Context) {
			date, ok := getDateFromContext(c)
			if !ok {
				return
			}

			events, err := studentlund.GetWeek(date)
			if err != nil {
				c.AbortWithError(503, err)
				return
			}

			c.JSON(200, nationFilter(events, filterParam(c)))
		})
	}

	month := router.Group("/month")
	{
		month.GET("", func(c *gin.Context) {
			events, err := studentlund.GetCurrentMonth()
			if err != nil {
				c.AbortWithError(503, err)
				return
			}

			c.JSON(200, nationFilter(events, filterParam(c)))
		})

		month.GET("/:date", func(c *gin.Context) {
			date, ok := getDateFromContext(c)
			if !ok {
				return
			}

			events, err := studentlund.GetMonth(date)
			if err != nil {
				c.AbortWithError(503, err)
				return
			}

			c.JSON(200, nationFilter(events, filterParam(c)))
		})
	}
}
