$ErrorActionPreference = "Stop"

Write-Host "Downloading HTML files with correct URLs..."

curl.exe -L "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1N2MzZWU3ZDgyNmEwMzgzOGVhNjZmMjg4OGRiEgsSBxCBsP6xxAgYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzQzNjA3OTU1NDk1MDQ4MjcwNQ&filename=&opi=89354086" -o "home.html"

curl.exe -L "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1N2MzZDY2ZjdmYzcwMmQzYzVhOTA2MTkzODYwEgsSBxCBsP6xxAgYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzQzNjA3OTU1NDk1MDQ4MjcwNQ&filename=&opi=89354086" -o "hardware_catalog.html"

curl.exe -L "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1N2MzZDY2MjI5ZjUwMmQzYzVhOTA2MTkzODYwEgsSBxCBsP6xxAgYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzQzNjA3OTU1NDk1MDQ4MjcwNQ&filename=&opi=89354086" -o "premium_doors_catalog.html"

curl.exe -L "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAwMDY1N2MzZTc1YTNiY2YwMWE2MTEwMDI1MWE2OTljEgsSBxCBsP6xxAgYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzQzNjA3OTU1NDk1MDQ4MjcwNQ&filename=&opi=89354086" -o "post_forming_door_frames.html"

Write-Host "Done"
