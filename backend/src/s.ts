// DO NOT EDIT!
// This was added on purpose to emulate an unstable/slow endpoint for the take-home project.
export default function DO_NOT_EDIT_OR_REMOVE(_: any, __: any, next: any) {
  if (Math.random() > 0.8) {
    return next(new Error("Endpoint unstable!"));
  }
  setTimeout(next, Math.random() * 1500 + 1000);
}
