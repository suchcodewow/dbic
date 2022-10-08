package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Quote struct {
	Id        primitive.ObjectID `json:"id,omitempty"`
	Name      string             `json:"name,omitempty" validate:"required"`
	BirthDate string             `json:"birthdate"  validate:"required"`
	Email     string             `json:"email,omitempty" validate:"required"`
	HomeSize  string             `json:"homesize,omitempty" validate:"required"`
	CarYear   string             `json:"caryear,omitempty" validate:"required"`
	CarModel  string             `json:"carmodel,omitempty" validate:"required"`
	Status    string             `json:"status,omitempty"`
}
