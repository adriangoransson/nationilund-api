package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/ulule/limiter"
	ginLimiter "github.com/ulule/limiter/drivers/middleware/gin"
	"github.com/ulule/limiter/drivers/store/memory"

	"github.com/adriangoransson/gin-cache"
	"github.com/adriangoransson/gin-cache/persistence"

	"github.com/adriangoransson/studentlund"
)

func setupApi(router *gin.Engine) {
	cacheStore := persistence.NewInMemoryStore(time.Hour)
	limiterStore := memory.NewStore()

	rateLimit := limiter.Rate{
		Period: time.Minute,
		Limit:  30,
	}
	rateLimiter := ginLimiter.NewMiddleware(limiter.New(limiterStore, rateLimit))

	router.Use(cors.Default())

	day := router.Group("/day")
	{
		day.GET("", cache.CachePageWithDurationFn(cacheStore, getCacheDuration(time.Hour), func(c *gin.Context) {
			events, err := studentlund.GetCurrentDay()
			if err != nil {
				c.AbortWithError(503, err)
				return
			}

			c.JSON(200, events)
		}))

		day.GET("/:date", rateLimiter, cache.CachePage(cacheStore, time.Hour, func(c *gin.Context) {
			date, err := parseDate(c.Param("date"))

			if err != nil {
				c.AbortWithError(400, err)
				return
			}

			events, err := studentlund.GetDay(date)
			if err != nil {
				c.AbortWithError(503, err)
				return
			}

			c.JSON(200, events)
		}))
	}

	week := router.Group("/week")
	{
		week.GET("", cache.CachePageWithDurationFn(cacheStore, getCacheDuration(time.Hour), func(c *gin.Context) {
			events, err := studentlund.GetCurrentWeek()
			if err != nil {
				c.AbortWithError(503, err)
				return
			}

			c.JSON(200, events)
		}))

		week.GET("/:date", rateLimiter, cache.CachePage(cacheStore, time.Hour, func(c *gin.Context) {
			date, err := parseDate(c.Param("date"))

			if err != nil {
				c.AbortWithError(400, err)
				return
			}

			events, err := studentlund.GetWeek(date)
			if err != nil {
				c.AbortWithError(503, err)
				return
			}

			c.JSON(200, events)
		}))
	}

	month := router.Group("/month")
	{
		month.GET("", cache.CachePageWithDurationFn(cacheStore, getCacheDuration(time.Hour), func(c *gin.Context) {
			events, err := studentlund.GetCurrentMonth()
			if err != nil {
				c.AbortWithError(503, err)
				return
			}

			c.JSON(200, events)
		}))

		month.GET("/:date", rateLimiter, cache.CachePage(cacheStore, time.Hour, func(c *gin.Context) {
			date, err := parseDate(c.Param("date"))

			if err != nil {
				c.AbortWithError(400, err)
				return
			}

			events, err := studentlund.GetMonth(date)
			if err != nil {
				c.AbortWithError(503, err)
				return
			}

			c.JSON(200, events)
		}))
	}
}
