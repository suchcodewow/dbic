if (Test-Path .\publish) { remove-item .\publish -r -force }
dotnet publish -o publish
Set-Location .\publish
Compress-Archive * ..\publish.zip -Force
Set-Location ..