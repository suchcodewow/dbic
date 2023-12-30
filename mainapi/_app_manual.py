from flask import Flask, make_response, request, jsonify
from flask_mongoengine import MongoEngine
from library import *
import datetime, os, random, time, json

# Pull Environment Variables
if "dynatraceUrl" in os.environ:
    dynatraceUrl = "https://" + os.environ["dynatraceUrl"]
    print("URL: " + dynatraceUrl)
else:
    print("URL missing.  Local: use setup.ps1, docker: ensure env variable set.")
if "dynatraceToken" in os.environ:
    dynatraceToken = os.environ["dynatraceToken"]
    print("Token: " + dynatraceToken)
else:
    print("Token missing.  Local: use setup.ps1, docker: ensure env variable set.")

# Opentel 1
from opentelemetry import trace
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.sdk.resources import SERVICE_NAME, Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

# resource = Resource(attributes={SERVICE_NAME: "transactionAPI"})
# consoleProcessor = BatchSpanProcessor(ConsoleSpanExporter())
if "dynatraceUrl" in globals() and "dynatraceToken" in globals():
    # batchProcessor = BatchSpanProcessor(
    #     OTLPSpanExporter(
    #         endpoint=dynatraceUrl + "/api/v2/otlp/v1/traces",
    #         headers={"Authorization": "Api-Token " + dynatraceToken},
    #     )
    # )
    trace.get_tracer_provider().add_span_processor(
        BatchSpanProcessor(
            OTLPSpanExporter(
                endpoint=dynatraceUrl + "/api/v2/otlp/v1/traces",
                headers={"Authorization": "Api-Token " + dynatraceToken},
            )
        )
    )
else:
    print("Skipping instrumentation: missing tenant or token.")
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(ConsoleSpanExporter())
)
trace.set_tracer_provider(
    TracerProvider(resource=Resource(attributes={SERVICE_NAME: "transactionAPI"}))
)

# FlaskInstrumentor().instrument(enable_commenter=True, commenter_options={})
# Opentel end

# Configuration
if "dbHostName" in os.environ:
    dbHostName = os.environ["dbHostName"]
else:
    dbHostName = "localhost"


def response(a, b):
    _response = app.make_response((jsonify(a), b))
    _response.headers["Content-Type"] = "application/json"
    return _response


app = Flask(__name__)

# Opentel 2

from pymongo import MongoClient
from opentelemetry.instrumentation.pymongo import PymongoInstrumentor

FlaskInstrumentor().instrument_app(app)
PymongoInstrumentor().instrument()
tracer = trace.get_tracer(__name__)

# Opentel end

db = MongoEngine()
app.config["MONGODB_SETTINGS"] = [
    {
        "db": "dbic",
        "host": dbHostName,
        "username": "root",
        "password": "password",
        "port": 27017,
        "alias": "default",
    }
]
db.init_app(app)


# Feature API
class Features:
    fraud_service = False
    failuron_service = False


features = Features()


@app.route("/api/features", methods=["GET"])
def api_features():
    global features
    return response(
        {
            "fraud_service": features.fraud_service,
            "failuron_service": features.failuron_service,
        },
        200,
    )


@app.route("/api/features/enable/<feature>", methods=["GET"])
def enableFeauture(feature):
    global features
    setattr(features, feature, True)
    return response({feature: True}, 200)


@app.route("/api/features/disable/<feature>", methods=["GET"])
def api_fraud_off(feature):
    global features
    setattr(features, feature, False)
    return response({feature: False}, 200)


# User API
class Account(db.EmbeddedDocument):
    name = db.StringField()
    balance = db.FloatField()


class Address(db.EmbeddedDocument):
    address1 = db.StringField()
    address2 = db.StringField()
    city = db.StringField()
    state = db.StringField()
    zip = db.StringField()


class Dynacard(db.EmbeddedDocument):
    ccnum = db.StringField()
    ccv = db.StringField()
    expiration = db.StringField()


class Users(db.Document):
    userId = db.StringField()
    accounts = db.ListField()
    defaultAddress = db.EmbeddedDocumentField(Address)
    dynacard = db.EmbeddedDocumentField(Dynacard)

    def to_json(self):
        return {
            "id": str(self.pk),
            "user": self.userId,
            "accounts": self.accounts,
            "defaultAddress": self.defaultAddress,
            "dynacard": self.dynacard,
        }


@app.route("/api/users", methods=["GET"])
def api_users():
    # traceparent = request.headers.get_all("traceparent")
    # carrier = {"traceparent": traceparent}
    # ctx = TraceContextTextMapPropagator().extract(carrier)
    # with tracer.start_as_current_span("my-span", context=ctx) as span:
    users = []
    for user in Users.objects:
        users.append(user.to_json())
    return response(users, 200)


@app.route("/api/users/<id>", methods=["GET", "PUT", "DELETE"])
def api_each_user(id):
    # traceparent = request.headers.get_all("traceparent")
    # carrier = {"traceparent": traceparent}
    # ctx = TraceContextTextMapPropagator().extract(carrier)
    # with tracer.start_as_current_span("my-span", context=ctx) as span:
    user = Users.objects(id=id).first()
    if not user:
        return response(request.method + ": " + id + " not found", 400)
    if request.method == "GET":
        return response(user.to_json(), 200)
    elif request.method == "PUT":
        content = request.json
        user.update(
            userId=chooser(content, "userId", user.userId),
            accounts=chooser(content, "accounts", user.accounts),
        )
        return response("user updated", 200)
    elif request.method == "DELETE":
        user.delete()
        return response("user deleted", 200)


@app.route("/api/users/login/<id>", methods=["GET"])
def api_login_user(id):
    # traceparent = request.headers.get_all("traceparent")
    # carrier = {"traceparent": traceparent}
    # ctx = TraceContextTextMapPropagator().extract(carrier)
    # with tracer.start_as_current_span("my-span", context=ctx) as span:
    user = Users.objects(userId=id).first()
    if not user:
        # generate a new user first
        print("generating a new user")
        checking = Account(name="Checking", balance=(random.randint(1005, 99999)) / 100)
        savings = Account(name="Savings", balance=(random.randint(10005, 999999)) / 100)
        dynacard = Account(name="Dynacard", balance=0.00)
        defaultAddress = Address(**generateAddress())
        defaultDynacard = Dynacard(**generateDynacard())
        newUser = Users(
            userId=id,
            accounts=[checking, savings, dynacard],
            defaultAddress=defaultAddress,
            dynacard=defaultDynacard,
        )
        newUser.save()
        user = Users.objects(userId=id).first()
    # user exists, just return it
    return response(user.to_json(), 200)


# Transaction API
class Transactions(db.Document):
    userId = db.StringField()
    accountName = db.StringField()
    vendor = db.StringField()
    amount = db.FloatField()
    timestamp = db.DateTimeField(default=datetime.datetime.utcnow)

    def to_json(self):
        # convert to json
        return {
            "id": str(self.pk),
            "userId": self.userId,
            "accountName": self.accountName,
            "vendor": self.vendor,
            "amount": self.amount,
            "timestamp": self.timestamp,
        }


@app.route("/api/transactions", methods=["GET", "POST"])
def api_transactions():
    # traceparent = request.headers.get_all("traceparent")
    # carrier = {"traceparent": traceparent}
    # ctx = TraceContextTextMapPropagator().extract(carrier)
    # with tracer.start_as_current_span("my-span", context=ctx) as span:
    if request.method == "GET":
        transactions = []
        for transaction in Transactions.objects.order_by("-timestamp").limit(100):
            transactions.append(transaction.to_json())
        return response(transactions, 200)

    elif request.method == "POST":
        content = request.json
        if features.fraud_service and content["amount"] >= 20:
            time.sleep(5)
            app.logger.error(
                "user %s: Transaction over $20 required fraud check but fraud service returned: [ Fraud Service requires ZipCode. Received: NULL ]",
                content["userId"],
            )
            return response("Fraud Error", 500)
        load_balancer = random.randint(1, 3)
        if load_balancer == 3 and features.failuron_service:
            return response("Failuron Service Failure", 500)
        else:
            transaction = Transactions(
                userId=content["userId"],
                accountName=content["accountName"],
                vendor=content["vendor"],
                amount=content["amount"],
            )
            transaction.save()
            return response("transaction added", 201)
    pass


@app.route("/api/transactions/<id>", methods=["GET", "PUT", "DELETE"])
def api_each_transaction(id):
    # traceparent = request.headers.get_all("traceparent")
    # carrier = {"traceparent": traceparent}
    # ctx = TraceContextTextMapPropagator().extract(carrier)
    # with tracer.start_as_current_span("my-span", context=ctx) as span:
    transaction = Transactions.objects(id=id).first()
    if not transaction:
        return response(request.method + ": " + id + " not found", 400)
    if request.method == "GET":
        return response(transaction.to_json(), 200)
    elif request.method == "PUT":
        content = request.json
        transaction.update(
            userId=chooser(content, "userId", transaction.userId),
            accountName=chooser(content, "accountName", transaction.accountName),
            vendor=chooser(content, "vendor", transaction.vendor),
            amount=chooser(content, "amount", transaction.amount),
            timestamp=datetime.datetime.utcnow,
        )
        return response("transaction updated", 200)
    elif request.method == "DELETE":
        transaction.delete()
        return response("transaction deleted", 200)


@app.route("/api/mytransactions/<userId>", methods=["GET"])
def my_transctions(userId):
    # traceparent = request.headers.get_all("traceparent")
    # carrier = {"traceparent": traceparent}
    # ctx = TraceContextTextMapPropagator().extract(carrier)
    # with tracer.start_as_current_span("my-span", context=ctx) as span:
    transactions = []
    for transaction in (
        Transactions.objects(userId=userId).order_by("-timestamp").limit(10)
    ):
        transactions.append(transaction.to_json())
    return response(transactions, 200)


print("dbHostname=" + dbHostName)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", use_reloader=False)
