"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.errorHandler = void 0;
var errorHandler = function (error, req, res, next) {
    var isValidationError = error instanceof ValidationError;
    res.status(isValidationError ? 400 : 500).json({
        message: isValidationError
            ? error.message
            : "Try again later. Some error occured.",
    });
};
exports.errorHandler = errorHandler;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, ValidationError.prototype);
        return _this;
    }
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
