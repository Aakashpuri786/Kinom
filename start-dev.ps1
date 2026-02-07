<#
Start the development Docker stack and open frontend/backend URLs when ready.
Usage: .\start-dev.ps1
#>
param(
    [int]$MaxAttempts = 60,
    [int]$DelaySeconds = 2
)

Write-Host "Starting docker-compose (detached, rebuilding images)..."
docker-compose up --build -d

function Wait-UntilUrl($url) {
    $attempt = 0
    while ($attempt -lt $MaxAttempts) {
        try {
            $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
            if ($r.StatusCode -eq 200) {
                Write-Host "`n$url is available."
                return $true
            }
        } catch {
            Write-Host -NoNewline "."
        }
        Start-Sleep -Seconds $DelaySeconds
        $attempt++
    }
    Write-Host "`nTimed out waiting for $url"
    return $false
}

$frontendUrl = 'http://localhost:5173'
$backendHealth = 'http://localhost:5001/api/health'

Write-Host "Waiting for frontend ($frontendUrl) to become available..."
$feUp = Wait-UntilUrl $frontendUrl

Write-Host "Waiting for backend ($backendHealth) to return healthy..."
$beUp = Wait-UntilUrl $backendHealth

if ($feUp) {
    Write-Host "Opening frontend in default browser: $frontendUrl"
    Start-Process $frontendUrl
} else {
    Write-Host "Frontend did not respond within timeout. Open $frontendUrl manually later."
}

if ($beUp) {
    Write-Host "Opening backend health endpoint: $backendHealth"
    Start-Process $backendHealth
} else {
    Write-Host "Backend health endpoint did not respond within timeout. Check logs with 'docker-compose logs backend'."
}

Write-Host "Done. Use .\stop-dev.ps1 to stop the stack."