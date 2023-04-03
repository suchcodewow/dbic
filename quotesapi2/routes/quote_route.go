package routes

import (
	"quotesapi2/controllers"

	"github.com/gorilla/mux"
)

func QuoteRoute(router *mux.Router) {
	router.HandleFunc("/quote", controllers.CreateQuote()).Methods("POST") //add this
}

// func QuoteRoute(app *fiber.App) {
// 	app.Post("/quote", controllers.CreateQuote)
// 	app.Get("/quote/:quoteId", controllers.GetAQuote)
// 	app.Put("/quote/:quoteId", controllers.EditAQuote)
// 	app.Delete("/quote/:quoteId", controllers.DeleteAQuote)
// 	app.Get("/quote", controllers.GetAllQuotes)
// 	app.Get("/quote/my/:name", controllers.GetMyQuotes)
// }
