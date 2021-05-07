// const extending = suite("extending error classes => ");

// extending("Calling createAppError() produces correct error class and props", () => {
//   class MyError extends createAppError("MyApp") {}
//   const e = new MyError("we got a problem");
//   assert.ok(e instanceof MyError);
//   assert.equal(e.kind, ErrorKind.AppError);
//   assert.match(e.message, "MyApp");
// });

// extending("Calling createLibraryError() produces correct error class and props", () => {
//   class MyError extends createLibraryError("MyLibrary") {}
//   const e = new MyError("we got a problem", "bad-shit");
//   assert.ok(e instanceof MyError);
//   assert.equal(e.kind, ErrorKind.LibraryError);
//   assert.equal(e.code, "bad-shit");
//   assert.match(e.message, "MyLibrary");
// });

// extending("Calling createApiGatewayError() produces correct error class and props", () => {
//   class MyError extends createApiGatewayError("MyProject", "MyFn") {}
//   const e = new MyError(400, "we got a problem");
//   assert.ok(e instanceof MyError);
//   assert.equal(e.kind, ErrorKind.ApiGatewayError);
//   assert.match(e.message, "MyFn");
// });

// extending.run();
