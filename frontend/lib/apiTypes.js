/**
 * @typedef {Object} GenerateRequest
 * @property {string} problem
 * @property {'auto'|'student'|'teacher'} [model]
 */

/**
 * @typedef {Object} GenerateResponse
 * @property {string} code
 * @property {'student'|'teacher'} route
 * @property {number} latency_ms
 * @property {number} router_confidence
 * @property {boolean} [passed]
 */

export {};