$webAppName = "scwshawnpearson"
$resourceGroup = "shawn-pearson-projects"
$repo = "https://github.com/suchcodewow/dbic/tree/main/estimationsvc"
az webapp deployment source config --branch master --manual-integration --name $webAppName --repo-url $repo --resource-group $resourceGroup