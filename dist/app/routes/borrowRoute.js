"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrowController_1 = require("../controllers/borrowController");
const borrowRouter = (0, express_1.Router)();
borrowRouter.post('/', borrowController_1.borrowABook);
borrowRouter.get('/', borrowController_1.getBorrowBooksSummary);
exports.default = borrowRouter;
