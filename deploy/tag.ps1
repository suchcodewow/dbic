# Push dbic to docker hub
$repo = "suchcodewow/"
$tag = "ccare"
$images = $(docker images --format "{{.Repository}}") -split "\r\n"
foreach ($image in $images) {
    if ($image.contains($repo)) {
        write-host "tagging <$image>"
        Invoke-Expression "docker image tag $image $($image):$tag"
        Invoke-Expression "docker push $($image):$tag"
    }
    else {
        write-host "No match <$image>"
    }
}