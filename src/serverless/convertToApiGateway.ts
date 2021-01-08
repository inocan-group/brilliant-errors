import type { IServerlessError } from "../types";

/**
 * When an error occurs in an AWS Lambda function which was
 * called by API Gateway, we need to convert the format of
 * the error to something that can appropriately be conveyed
 * back to the user.
 *
 * This function takes a `ServerlessError` as input and returns
 * this API Gateway format which is defined by the `IApiGatewayErrror`
 * interface.
 *
 * Note: this function will work when using the
 * [Lambda Proxy Integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html)
 * mappings (which are the default in AWS). If you have your
 * own mappings then you must manage the appropriate mappings
 * yourself.
 *
 * - Docs: [Handle Lambda errors in API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/handle-errors-in-lambda-integration.html)
 */
export function convertToApiGatewayError(err: IServerlessError) {
  //
}
