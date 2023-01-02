enum StatusCodes {
  OK = 200,
  BadRequest = 400,
  Unauthorized,
  PaymentRequired,
  Forbidden,
  NotFound,
}

const okNumber = StatusCodes.OK;
const stringBadRequest = StatusCodes[400]; // BadRequest

// A const enum's value is replaced by TypeScript during
// transpilation of your code, instead of being looked up
// via an object at runtime.

const enum MouseAction {
  MouseDown,
  MouseUpOutside,
  MouseUpInside,
}
