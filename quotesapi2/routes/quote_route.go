package routes

import (
	"quotesapi2/controllers"

	"github.com/gorilla/mux"
)

func QuoteRoute(router *mux.Router) {
	router.HandleFunc("/quote", controllers.CreateQuote()).Methods("POST")
	router.HandleFunc("/quote/{quoteId}", controllers.GetAQuote()).Methods("GET")
	router.HandleFunc("/quote", controllers.GetAllQuotes()).Methods("GET")
	router.HandleFunc("/quote/my/{name}", controllers.GetMyQuotes()).Methods("GET")
	// app.Put("/quote/:quoteId", controllers.EditAQuote)
	// app.Delete("/quote/:quoteId", controllers.DeleteAQuote)
}

// func QuoteRoute(app *fiber.App) {
// 	app.Post("/quote", controllers.CreateQuote)
// 	app.Get("/quote/:quoteId", controllers.GetAQuote)
// 	app.Put("/quote/:quoteId", controllers.EditAQuote)
// 	app.Delete("/quote/:quoteId", controllers.DeleteAQuote)
// 	app.Get("/quote", controllers.GetAllQuotes)
// 	app.Get("/quote/my/:name", controllers.GetMyQuotes)
// }
