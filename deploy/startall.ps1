$portList = @(8080, 5000, 8000, 6000, 3666, 5130, 3000, 80)
write-host -ForegroundColor green "Pulling any submodules..."
git submodule update --init --recursive

write-host -ForegroundColor green "Checking for java"
$testJavaHome = Get-ChildItem env:JAVA_HOME
if ($testJavaHome -like "*17*") {
    write-host "Java 17 SDK found."
}
else {
    write-host "JAVA_HOME variable not found or JAVA 17 not installed.  Maybe try 'winget install Microsoft.OpenJDK.17'?"
    break
}
write-host -ForegroundColor green "Checking for ports in use"
foreach ($port in $portList) {
    $portUsed = (Get-NetTCPConnection -LocalPort $port).OwningProcess 2>$null
    if ($portUsed) {
        Stop-Process -ID $portUsed -Force
        write-host "Stopped process using port: $port"

    }
}

write-host -ForegroundColor green "Checking for Docker..."
$testDocker = get-process "*docker"
if (-not $testDocker) {
    write-host -ForegroundColor red "Please start docker engine and try again."
    break
}
write-host -ForegroundColor green  "Starting Docker databases (catalogdb, ordersdb, maindb)"
docker compose up catalogdb -d
docker compose up ordersdb -d
docker compose up maindb -d
write-host -ForegroundColor green  "Starting services in different tabs"
write-host -ForegroundColor blue "Window 1: Catalog Api"
wt --window 0 nt -p "PowerShell" -d "..\catalogapi" pwsh -noExit ".\start.ps1"
write-host -ForegroundColor blue "Window 2: Main Api (Logins and banking)"
wt --window 0 nt -p "PowerShell" -d "..\mainapi" pwsh -noExit ".\start.ps1"
write-host -ForegroundColor blue "Window 3: Orders Api"
wt --window 0 nt -p "PowerShell" -d "..\ordersapi" pwsh -noExit ".\start.ps1"
write-host -ForegroundColor blue "Window 4: Quotes Api"
wt --window 0 nt -p "PowerShell" -d "..\quotesapi" pwsh -noExit ".\start.ps1"
write-host -ForegroundColor blue "Window 5: Specialty Insurance Api (Collecticare)"
wt --window 0 nt -p "PowerShell" -d "..\specialtyapi" pwsh -noExit ".\start.ps1"
write-host -ForegroundColor blue "Window 6: Instamation Service (Collecticare)"
wt --window 0 nt -p "PowerShell" -d "..\instamationsvc" pwsh -noExit ".\start.ps1"
write-host -ForegroundColor blue "Window 7: UI (Frontend)"
wt --window 0 nt -p "PowerShell" -d "..\ui" pwsh -noExit ".\start.ps1"
write-host -ForegroundColor blue "Window 8: Load Generator"
wt --window 0 nt -p "PowerShell" -d "..\loadgen" pwsh -noExit ".\start.ps1"