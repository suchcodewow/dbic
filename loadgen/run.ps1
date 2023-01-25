param (
    [string] $url # what to use for frontend URL
)
# npm install -g artillery artillery-engine-playwright
$Env:frontendURL = "$url"
$Env:TEST_DURATION = 3600
$Env:TEST_Rate = 5
$Env:TEST_MAXUSERS = 5
artillery run dbicLoadgen.yaml