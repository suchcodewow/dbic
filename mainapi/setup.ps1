param (
    [string]$url,
    [string]$token
)

# $tenant = Read-Host "tenant URL? (no trailing slash!)"
$env:OTEL_EXPORTER_OTLP_PROTOCOL = "http/protobuf"
# $env:OTEL_EXPORTER_OTLP_ENDPOINT = "https://$url/api/v2/otlp"
$env:OTEL_EXPORTER_OTLP_TRACES_ENDPOINT = "https://$url/api/v2/otlp/traces/v1/"
# $token = Read-Host "Token with Opentel Ingest?"
$env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=" + [System.Web.HttpUtility]::UrlEncode("Api-Token $token")
$env:OTEL_SERVICE_NAME = "transactionAPI"
$env:OTEL_TRACES_EXPORTER = "otlp"
$env:OTEL_METRICS_EXPORTER = "none"
$env:OTEL_LOGS_EXPORTER = "none"
$env:OTEL_TRACES_SAMPLER = "always_on"

