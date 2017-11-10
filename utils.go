package main

import "time"

func parseDate(date string) (time.Time, error) {
	return time.Parse("2006-01-02", date)
}

func getCacheDuration(cacheDuration time.Duration) func() time.Duration {
	return func() time.Duration {
		currentTime := time.Now()
		newTime := time.Now().Add(cacheDuration)

		if (newTime.Day() > currentTime.Day()) {
			// Ignore error because "local"
			location, _ := time.LoadLocation("Local")
			// Truncate and round only works for UTC time
			midnight := time.Date(
				newTime.Year(),
				newTime.Month(),
				newTime.Day(),
				0,
				0,
				0,
				0,
				location,
			)

			return time.Until(midnight)
		} else {
			return cacheDuration
		}
	}
}
