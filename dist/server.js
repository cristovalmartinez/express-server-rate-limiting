"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const index_1 = __importDefault(require("./routes/index"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const corsOpt = { origin: true, credentials: true };
const urlEncodedOpt = { extended: true };
/**
 * Default route handler for handling unknown routes.
 * @param req The Express Request object.
 * @param res The Express Response object.
 */
const defaultRouteHandler = (req, res) => {
    res.status(404).json({
        url: `${req.protocol}://${req.hostname + req.url}`,
        method: req.method,
        status: "ERROR",
        "status-code": 404,
        message: `Endpoint does not exist. ERROR: ${req.url}`,
    });
};
/* Middleware */
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded(urlEncodedOpt));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(corsOpt));
/* Rate Limiting Middleware */
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100, // maximum 100 requests per window
});
app.use(limiter);
/* REST APIs */
app.use(index_1.default);
/* Unknown route handling */
app.use(defaultRouteHandler);
/* Error handling middleware */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error",
    });
});
exports.default = app;
//# sourceMappingURL=server.js.map