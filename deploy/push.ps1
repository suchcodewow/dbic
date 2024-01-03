# Push dbic to docker hub
$repo = "suchcodewow/"
$tag = "instamation"
$newTag = read-host -prompt "Tag? (<enter>: $tag)"
$imageName = read-host -prompt "Specific image? (<enter> for all suchcodewow/)"
if ($newTag) { $tag = $newTag }
$images = $(docker images --format "{{.Repository}}") -split "\r\n"
foreach ($image in $images) {
    if ($image.contains($repo) -and $image.contains($imageName)) {
        write-host "tagging <$image>"
        Invoke-Expression "docker image tag $image $($image):$tag"
        Invoke-Expression "docker push $($image):$tag"
    }
    else {
        # write-host "No match <$image>"
    }
}