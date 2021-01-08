# Brilliant Errors

The base errors you get from Javascript leave a lot to be desired and this library attempts to provide a _consistent_ way to provide solid meta information on errors raised in Typescript/Javascript projects.

This library provides two _configurators_ for errors:

1. `createAppError` - intended primarily to meet the need of frontend applications
2. `createLibraryError` - intended to meet the needs of reusable "library code" 
3. `createServerlessError` - similar to the library configurator, this will generate some additional nuances to help you build good error classes for AWS serverless functions including those which may have been called via API Gateway (and therefore need special handling to be reported correctly)

For a repo which wants to use these configurators, you will create a file in your repo for the new error and then configure it something like this:

`src/error/MyError.ts`:
```ts
export default MyError = createLibraryError('MyError', { ... });
```

All options in the configurators are strongly typed which includes full documentatory information so rather than try to repeat that here we emplore you to use the _built-in_ Typescript documentation within your code editor of choice.