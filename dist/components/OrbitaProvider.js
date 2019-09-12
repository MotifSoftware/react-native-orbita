import * as tslib_1 from "tslib";
import React, { Component, createContext } from 'react';
;
export var OrbitaContext = createContext({
    endpoint: '',
});
var OrbitaProvider = /** @class */ (function (_super) {
    tslib_1.__extends(OrbitaProvider, _super);
    function OrbitaProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrbitaProvider.prototype.render = function () {
        var _a = this.props, endpoint = _a.endpoint, children = _a.children;
        return (React.createElement(OrbitaContext.Provider, { value: { endpoint: endpoint } }, children));
    };
    return OrbitaProvider;
}(Component));
export default OrbitaProvider;
//# sourceMappingURL=OrbitaProvider.js.map