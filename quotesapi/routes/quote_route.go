package routes

import (
	"quotesapi/controllers"

	"github.com/gorilla/mux"
)

func QuoteRoute(router *mux.Router) {
	router.HandleFunc("/quote", controllers.CreateQuote()).Methods("POST")
	router.HandleFunc("/quote/{quoteId}", controllers.GetAQuote()).Methods("GET")
	router.HandleFunc("/quote", controllers.GetAllQuotes()).Methods("GET")
	router.HandleFunc("/quote/my/{name}", controllers.GetMyQuotes()).Methods("GET")
}
