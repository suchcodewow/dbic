package main

import (
    "quotesapi/configs" //add this
	"quotesapi/routes"
    "github.com/gofiber/fiber/v2" 
)

func main() {
    app := fiber.New()

    //run database
    configs.ConnectDB()

	//routes
	routes.QuoteRoute(app)

    app.Listen(":6000")
}