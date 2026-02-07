<#
Stop and remove the development Docker stack
Usage: .\stop-dev.ps1
#>
Write-Host "Stopping docker-compose and removing containers..."
docker-compose down
Write-Host "Stopped."