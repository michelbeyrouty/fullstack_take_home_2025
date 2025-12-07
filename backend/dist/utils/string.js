"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringUtils {
    static formatDateTime(date) {
        const yyyy = date.getFullYear();
        const mm = StringUtils.padNumber(date.getMonth() + 1);
        const dd = StringUtils.padNumber(date.getDate());
        const hh = StringUtils.padNumber(date.getHours());
        const min = StringUtils.padNumber(date.getMinutes());
        const ss = StringUtils.padNumber(date.getSeconds());
        return `${yyyy}-${mm}-${dd} - ${hh}:${min}:${ss}`;
    }
    static padNumber(numberToPad, outputWidth = 2) {
        return String(numberToPad).padStart(outputWidth, "0");
    }
}
exports.default = StringUtils;
