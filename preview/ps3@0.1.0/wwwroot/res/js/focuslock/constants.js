/**
 * defines a focus group
 */
export var FOCUS_GROUP = 'data-focus-lock';
/**
 * disables element discovery inside a group marked by key
 */
export var FOCUS_DISABLED = 'data-focus-lock-disabled';
/**
 * allows uncontrolled focus within the marked area, effectively disabling focus lock for it's content
 */
export var FOCUS_ALLOW = 'data-no-focus-lock';
/**
 * instructs autofocus engine to pick default autofocus inside a given node
 * can be set on the element or container
 */
export var FOCUS_AUTO = 'data-autofocus-inside';
/**
 * instructs autofocus to ignore elements within a given node
 * can be set on the element or container
 */
export var FOCUS_NO_AUTOFOCUS = 'data-no-autofocus';
