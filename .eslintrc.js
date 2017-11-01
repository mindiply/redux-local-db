module.exports = {
    "env": {
        browser: true,
        node: true
    },
    "plugins": [
        "react",
        "standard",
        "promise"
    ],
    "extends": ["standard", "plugin:react/all"],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "indent" : [2, 4],
        "no-tabs": 0,
        "react/jsx-curly-brace-presence": [0],
        "react/jsx-indent": [1, 4],
        "react/jsx-filename-extension": 0,
        "react/jsx-no-bind": [1, { "allowArrowFunctions": true }],
        "react/forbid-prop-types": 0,
        "react/sort-prop-types": 0,
        "react/require-optimization": 0
    }
};
