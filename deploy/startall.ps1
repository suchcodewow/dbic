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
wt --window 0 nt -p "PowerShell" -d "..\catalogapi" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\mainapi" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\ordersapi" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\quotesapi" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\specialtyapi" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\instamationsvc" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\ui" pwsh -noExit ".\start.ps1"
wt --window 0 nt -p "PowerShell" -d "..\loadgen" pwsh -noExit ".\start.ps1"
