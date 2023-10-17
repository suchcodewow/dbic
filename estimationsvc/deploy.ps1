$webAppName = "scw-webapp-shawnpearson"
$webASPName = "scw-asp-shawnpearson"
$resourceGroup = "shawn-pearson-projects"
$repo = "https://github.com/suchcodewow/dbic/raw/main/estimationsvc/publish.zip"
$localRepo = "./publish.zip"
#az appservice plan show --resource-group $resourceGroup --name $webASPName
#az appservice plan create --name $webASPName --resource-group $resourceGroup --sku B1
#$webAppPlan = (az webapp create --resource-group $resourceGroup --name $webAppName --plan $webASPName --query hostNames[0]) | Convertfrom-Json
az webapp deploy --resource-group $resourceGroup --name $webAppName --src-path $localRepo --type zip 