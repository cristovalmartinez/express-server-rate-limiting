"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeApi = void 0;
function welcomeApi(req, res) {
    try {
        res.status(200).json({ message: "hello user" });
    }
    catch (err) {
        console.error(err);
    }
}
exports.welcomeApi = welcomeApi;
//# sourceMappingURL=controller.js.map