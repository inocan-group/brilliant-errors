import { suite } from "uvu";
import assert from "uvu/assert";
import { createAppError } from "../src/AppError";
import { ErrorKind, createLibraryError, createApiGatewayError } from "../src";

const basics = suite("basic tests => ");

basics("Calling createAppError() produces correct error class and props", () => {
  const MyError = createAppError("MyApp");
  const e = new MyError("we got a problem");
  assert.equal(e.kind, ErrorKind.AppError);
  assert.match(e.message, "MyApp");
});

basics("Calling createLibraryError() produces correct error class and props", () => {
  const MyError = createLibraryError("MyLibrary");
  const e = new MyError("we got a problem", "bad-shit");
  assert.equal(e.kind, ErrorKind.LibraryError);
  assert.equal(e.code, "bad-shit");
  assert.match(e.message, "MyLibrary");
});

basics("Calling createApiGatewayError() produces correct error class and props", () => {
  const MyError = createApiGatewayError("MyProject", "MyFn");
  const e = new MyError(400, "we got a problem");
  assert.equal(e.kind, ErrorKind.ApiGatewayError);
  assert.match(e.message, "MyFn");
});

basics.run();
