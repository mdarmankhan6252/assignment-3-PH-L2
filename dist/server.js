"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./app/config/db"));
const bookRoute_1 = __importDefault(require("./app/routes/bookRoute"));
const borrowRoute_1 = __importDefault(require("./app/routes/borrowRoute"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
dotenv_1.default.config();
(0, db_1.default)();
//middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//application routes
app.use('/api/books', bookRoute_1.default);
app.use('/api/borrow', borrowRoute_1.default);
//main routes
app.get('/', (req, res) => {
    res.send("Server is running on port: ");
});
app.listen(port, () => {
    console.log("Server is running on prot : ", port);
});
