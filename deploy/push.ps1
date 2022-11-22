# Push dbic to docker hub
$repo = "suchcodewow/"
$images = $(docker images --format "{{.Repository}}") -split "\r\n"
foreach ($image in $images) {
    if ($image.contains($repo)) {
        write-host "Uploading $image"
        Invoke-Expression "docker push $image"
    }
    else {
        write-host "No match $i"
    }
}