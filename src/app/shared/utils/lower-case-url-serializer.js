"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var router_1 = require('@angular/router');
// /ref: https://stackoverflow.com/questions/42065409/angular-2-routes-3-0-case-sensitive
var LowerCaseUrlSerializer = (function (_super) {
    __extends(LowerCaseUrlSerializer, _super);
    function LowerCaseUrlSerializer() {
        _super.apply(this, arguments);
    }
    LowerCaseUrlSerializer.prototype.parse = function (url) {
        return _super.prototype.parse.call(this, url.toLowerCase());
    };
    return LowerCaseUrlSerializer;
}(router_1.DefaultUrlSerializer));
exports.LowerCaseUrlSerializer = LowerCaseUrlSerializer;
//# sourceMappingURL=lower-case-url-serializer.js.map