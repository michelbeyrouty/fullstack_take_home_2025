"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DO_NOT_EDIT_OR_REMOVE;
// DO NOT EDIT!
// This was added on purpose to emulate an unstable/slow endpoint for the take-home project.
function DO_NOT_EDIT_OR_REMOVE(_, __, next) {
    if (Math.random() > 0.8) {
        return next(new Error("Endpoint unstable!"));
    }
    setTimeout(next, Math.random() * 1500 + 1000);
}
