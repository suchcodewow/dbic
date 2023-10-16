package main

import (
	"log"
	"net/http"
	"quotesapi2/configs"
	"quotesapi2/routes" 

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	//connect database
	configs.ConnectDB()

	//routes
	routes.QuoteRoute(router) 

	log.Fatal(http.ListenAndServe(":6000", router))
}
