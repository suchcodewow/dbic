package routes

import (
	"quotesapi/controllers"

	"github.com/gofiber/fiber/v2"
)

func QuoteRoute(app *fiber.App) {
    app.Post("/quote", controllers.CreateQuote)
    app.Get("/quote/:quoteId", controllers.GetAQuote)
    app.Put("/quote/:quoteId", controllers.EditAQuote)
    app.Delete("/quote/:quoteId", controllers.DeleteAQuote)
    app.Get("/quote", controllers.GetAllQuotes)
}