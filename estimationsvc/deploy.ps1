# Check your account:
# az subscription show

$webAppName = "scw-webapp-shawnpearson"
$webASPName = "scw-asp-shawnpearson"
$resourceGroup = "shawn-pearson-projects"
$localRepo = "./publish.zip"

# Check subscription stuffs
$azAccount = (az account show | Convertfrom-Json).name
$azAllAccounts = (az account list | Convertfrom-Json) | select-object -property name, id
$azAllAccounts | Out-Host
write-host "Publishing to $azAccount change with:"
write-host "az account set -s <id from above>"


# Build
if (Test-Path .\publish) { remove-item .\publish -r -force }
write-host "Building application"
dotnet publish -o publish
Set-Location .\publish
Compress-Archive * ..\publish.zip -Force
Set-Location ..

#az appservice plan show --resource-group $resourceGroup --name $webASPName
#az appservice plan create --name $webASPName --resource-group $resourceGroup --sku B1
#$webAppPlan = (az webapp create --resource-group $resourceGroup --name $webAppName --plan $webASPName --query hostNames[0]) | Convertfrom-Json
write-host "Publishing $webAppName"
az webapp deploy --resource-group $resourceGroup --name $webAppName --src-path $localRepo --type zip

# Pulls 
#$webapp = az webapp config hostname list --resource-group $resourceGroup --webapp-name $webAppName | Convertfrom-Json


# Not super useful :\
#az webapp config appsettings list --resource-group $resourceGroup --name $webAppName
#az webapp deployment slot list --resource-group $resourceGroup --name $webAppName
