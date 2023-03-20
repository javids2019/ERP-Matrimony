"use strict";
var PaginatedResult = (function () {
    function PaginatedResult() {
    }
    return PaginatedResult;
}());
exports.PaginatedResult = PaginatedResult;
var IFilter = (function () {
    function IFilter() {
    }
    return IFilter;
}());
exports.IFilter = IFilter;
var SelectItems = (function () {
    function SelectItems() {
    }
    SelectItems.prototype.SelectItems = function (value, text) {
        this.Text = text;
        this.Value = value;
    };
    return SelectItems;
}());
exports.SelectItems = SelectItems;
//# sourceMappingURL=interfaces.js.map