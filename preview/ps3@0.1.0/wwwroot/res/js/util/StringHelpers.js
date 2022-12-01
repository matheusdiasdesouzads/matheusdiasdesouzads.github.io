/**
 * Formats given string.
 */
export function applyString(base, argumentsObject = undefined) {
    base = String(base);
    argumentsObject = argumentsObject ?? {};
    if (argumentsObject instanceof Array) {
        let array = argumentsObject;
        argumentsObject = {};
        let i = 0;
        for (let v of array) argumentsObject[(++i).toString()] = v;
    }
    return base.replace(/\$([a-z0-9]+|\$)/gi, (_, s) => {
        return s == '$' ? '$' : String(argumentsObject[s]);
    });
}