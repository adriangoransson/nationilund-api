module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["vnode"] }]
    }
};
