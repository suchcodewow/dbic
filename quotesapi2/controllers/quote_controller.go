package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"quotesapi2/configs"
	"quotesapi2/models"
	"quotesapi2/responses"
	"time"

	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var quoteCollection *mongo.Collection = configs.GetCollection(configs.DB, "quotes")
var validate = validator.New()

func CreateQuote() http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var quote models.Quote
		defer cancel()

		//validate the request body
		if err := json.NewDecoder(r.Body).Decode(&quote); err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			response := responses.QuoteResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(rw).Encode(response)
			return
		}

		//use the validator library to validate required fields
		if validationErr := validate.Struct(&quote); validationErr != nil {
			rw.WriteHeader(http.StatusBadRequest)
			response := responses.QuoteResponse{Status: http.StatusBadRequest, Message: "error", Data: map[string]interface{}{"data": validationErr.Error()}}
			json.NewEncoder(rw).Encode(response)
			return
		}

		newQuote := models.Quote{
			Id:        primitive.NewObjectID(),
			Name:      quote.Name,
			BirthDate: quote.BirthDate,
			Email:     quote.Email,
			HomeSize:  quote.HomeSize,
			CarYear:   quote.CarYear,
			CarModel:  quote.CarModel,
			Status:    "new",
		}

		result, err := quoteCollection.InsertOne(ctx, newQuote)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			response := responses.QuoteResponse{Status: http.StatusInternalServerError, Message: "error", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(rw).Encode(response)
			return
		}

		rw.WriteHeader(http.StatusCreated)
		response := responses.QuoteResponse{Status: http.StatusCreated, Message: "success", Data: map[string]interface{}{"data": result}}
		json.NewEncoder(rw).Encode(response)
	}
}
