"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const port = process.env.PORT || 6699;
/**
 * Listener function to handle server startup.
 */
const listener = () => {
    try {
        console.log(`Server is now listening on PORT: ${port}`);
    }
    catch (err) {
        console.log("There seems to be an error connecting to the server. Please try again.");
    }
};
server_1.default.listen(port, listener);
//# sourceMappingURL=app.js.map