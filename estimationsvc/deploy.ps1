$webAppName = "scw-webapp-shawnpearson"
$webASPName = "scw-asp-shawnpearson"
$resourceGroup = "shawn-pearson-projects"
$repo = "https://github.com/suchcodewow/dbic/raw/main/estimationsvc/publish.zip"
$localRepo = "./publish.zip"

# Build
if (Test-Path .\publish) { remove-item .\publish -r -force }
dotnet publish -o publish
Set-Location .\publish
Compress-Archive * ..\publish.zip -Force
Set-Location ..

#az appservice plan show --resource-group $resourceGroup --name $webASPName
#az appservice plan create --name $webASPName --resource-group $resourceGroup --sku B1
#$webAppPlan = (az webapp create --resource-group $resourceGroup --name $webAppName --plan $webASPName --query hostNames[0]) | Convertfrom-Json
az webapp deploy --resource-group $resourceGroup --name $webAppName --src-path $localRepo --type zip

# Pulls 
#$webapp = az webapp config hostname list --resource-group $resourceGroup --webapp-name $webAppName | Convertfrom-Json


# Not super useful :\
#az webapp config appsettings list --resource-group $resourceGroup --name $webAppName
#az webapp deployment slot list --resource-group $resourceGroup --name $webAppName
