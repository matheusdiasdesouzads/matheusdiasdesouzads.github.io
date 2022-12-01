export function cloneImage(img) {
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    let r = document.createElement('img');
    r.src = canvas.toDataURL();
    r.draggable = img.draggable;
    r.style.cssText = img.style.cssText;
    r.width = img.width;
    r.height = img.height;
    return r;
}