package main

import (
	"log"
	"net/http"
	"quotesapi2/configs"
	"quotesapi2/routes" //add this

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	//run database
	configs.ConnectDB()

	//routes
	routes.QuoteRoute(router) //add this

	log.Fatal(http.ListenAndServe(":6000", router))
}
