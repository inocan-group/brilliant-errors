import { BaseBrilliance } from "~/@types";
import { createError } from "~/configurators";

describe("using MessageContructor", () => {
  it("createError() with no options produces flexible error class and props", () => {
    type Type = "config" | "execution";
    const MyError = createError<Type>("MyError", "MyApp");
    const err = new MyError("a message to you Rudy", "config/bar");
    expect(err).toBeInstanceOf(BaseBrilliance);
    console.log(JSON.stringify(err.structuredStack));
  });
  it.todo("createError() with specified Type restricts typing of error classes classification");
  it.todo("createError() with specified Type and SubType, classification further restricted");

  it.todo("Error stack looks correct in basic calling structure");
});

describe("using HttpConstructor", () => {
  it("createError() with no options produces flexible error class and props", () => {
    type Type = "config" | "execution";
    const MyError = createError<Type>("MyError", "MyApp");
    const err = new MyError("a message to you Rudy", "config/bar");
    expect(err).toBeInstanceOf(BaseBrilliance);
    console.log(JSON.stringify(err.structuredStack));

    // expect(isAppError(MyError)).toBeTruthy();
  });
  it.todo("createError() with specified Type restricts typing of error classes classification");
  it.todo("createError() with specified Type and SubType, classification further restricted");

  it.todo("Error stack looks correct in basic calling structure");
});

// const basics = suite("basic tests => ");

// basics("Calling createAppError() produces correct error class and props", () => {
//   const MyError = createAppError("MyApp");
//   const e = new MyError("we got a problem");
//   assert.equal(e.kind, ErrorKind.AppError);
//   assert.match(e.message, "MyApp");
// });

// basics("Calling createLibraryError() produces correct error class and props", () => {
//   const MyError = createLibraryError("MyLibrary");
//   const e = new MyError("we got a problem", "bad-shit");
//   assert.equal(e.kind, ErrorKind.LibraryError);
//   assert.equal(e.code, "bad-shit");
//   assert.match(e.message, "MyLibrary");
// });

// basics("Calling createApiGatewayError() produces correct error class and props", () => {
//   const MyError = createApiGatewayError("MyProject", "MyFn");
//   const e = new MyError(400, "we got a problem");
//   assert.equal(e.kind, ErrorKind.ApiGatewayError);
//   assert.match(e.message, "MyFn");
// });

// basics.run();
