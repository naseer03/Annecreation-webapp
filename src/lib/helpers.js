export const getTitleCase = (camelCaseString) => camelCaseString
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, function(str){ return str.toUpperCase(); });