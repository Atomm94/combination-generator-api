"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateValidCombinations = exports.mapItems = void 0;
/**
 * Convert items like [1,2,1] into A1, B1, B2, C1
 */
const mapItems = (items) => {
    const mapped = [];
    const counter = {};
    items.forEach((num, i) => {
        const letter = String.fromCharCode(65 + i); // A, B, C...
        counter[num] = (counter[num] || 0) + 1;
        mapped.push(`${letter}${counter[num]}`);
    });
    return mapped;
};
exports.mapItems = mapItems;
/**
 * Generate combinations of length N
 * Rules:
 * items starting with same letter cannot occur together (A1 & A2 invalid)
 */
const generateValidCombinations = (items, length) => {
    const results = [];
    const helper = (start, combo) => {
        if (combo.length === length) {
            results.push([...combo]);
            return;
        }
        for (let i = start; i < items.length; i++) {
            const item = items[i];
            // rule: cannot repeat same letter
            const letter = item[0];
            if (combo.some((c) => c[0] === letter))
                continue;
            combo.push(item);
            helper(i + 1, combo);
            combo.pop();
        }
    };
    helper(0, []);
    return results;
};
exports.generateValidCombinations = generateValidCombinations;
