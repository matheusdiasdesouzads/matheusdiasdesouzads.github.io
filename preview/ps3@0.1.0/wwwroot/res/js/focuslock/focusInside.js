import { contains } from './utils/DOMutils.js';
import { getAllAffectedNodes } from './utils/all-affected.js';
import { toArray } from './utils/array.js';
import { getActiveElement } from './utils/getActiveElement.js';
var focusInFrame = function (frame) { return frame === document.activeElement; };
var focusInsideIframe = function (topNode) {
    return Boolean(toArray(topNode.querySelectorAll('iframe')).some(function (node) { return focusInFrame(node); }));
};
/**
 * @returns {Boolean} true, if the current focus is inside given node or nodes
 */
export var focusInside = function (topNode) {
    var activeElement = document && getActiveElement();
    if (!activeElement || (activeElement.dataset && activeElement.dataset.focusGuard)) {
        return false;
    }
    return getAllAffectedNodes(topNode).some(function (node) { return contains(node, activeElement) || focusInsideIframe(node); });
};
