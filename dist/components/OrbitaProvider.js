"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
;
exports.OrbitaContext = react_1.createContext({
    endpoint: '',
});
var OrbitaProvider = /** @class */ (function (_super) {
    tslib_1.__extends(OrbitaProvider, _super);
    function OrbitaProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrbitaProvider.prototype.render = function () {
        var _a = this.props, endpoint = _a.endpoint, children = _a.children;
        return (react_1.default.createElement(exports.OrbitaContext.Provider, { value: { endpoint: endpoint } }, children));
    };
    return OrbitaProvider;
}(react_1.Component));
exports.default = OrbitaProvider;
//# sourceMappingURL=OrbitaProvider.js.map