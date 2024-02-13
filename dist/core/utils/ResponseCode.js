"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseResult {
    constructor() {
        this.successPost = (res, message) => {
            return res.status(201).json({
                code: 201,
                status: true,
                message: message,
                result: null
            });
        };
        this.successGet = (res, data) => {
            return res.status(200).json({
                code: 200,
                status: true,
                message: "Success",
                result: data
            });
        };
        this.error = (res, props) => {
            return res.status(props.code).json({
                errorCode: props.code,
                status: false,
                message: props.message,
                result: props.result
            });
        };
    }
}
exports.default = new ResponseResult();
