write-host "Starting Docker databases (catalogdb, ordersdb, maindb)"
docker compose up catalogdb -d
docker compose up ordersdb -d
docker compose up maindb -d
write-host "Starting services in different tabs"
wt --window 0 nt -p "PowerShell" -d "..\catalogapi" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\mainapi" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\ordersapi" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\quotesapi" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\specialtyapi" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\instamationsvc" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\ui" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\loadgen" pwsh -noExit ".\start.ps1"
