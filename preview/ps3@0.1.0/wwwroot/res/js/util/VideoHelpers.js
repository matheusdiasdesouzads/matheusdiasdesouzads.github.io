export function createVideoFromBinary(src, mimeType = 'video/mp4') {
    let $video = $(`<video/>`);
    let $source = $(`<source type="${mimeType}"/>`);
    let blob = new Blob([src], {type: mimeType});
    let urlCreator = window.URL || window.webkitURL;
    let objUrl = urlCreator.createObjectURL(blob);
    $source.attr('src', objUrl);
    $video.append($source);
    return $video.get(0);
}