"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = __importDefault(require("./constants/config"));
const db_1 = require("./db");
(0, db_1.initDb)()
    .then(() => (0, app_1.createApp)())
    .then((app) => {
    console.info(`Server is running on http://localhost:${config_1.default.PORT}`);
    app.listen(config_1.default.PORT);
})
    .catch((e) => {
    console.error("DB error occurred:", e);
    process.exit(1);
});
