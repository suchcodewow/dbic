$host.ui.RawUI.WindowTitle = "mainapi"
if (-not(Test-Path -Path  ".\venv\Scripts\Activate.ps1")) {
    Invoke-expression -Command "python -m venv .\venv"
}
Invoke-expression -Command ".\venv\Scripts\Activate.ps1"
Invoke-expression -Command "pip install -r requirements.txt"
Invoke-expression -Command "python -m flask run"