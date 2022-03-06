import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from './main-lambda';

const SERVER = 'server';

jest.mock('aws-serverless-express', () => ({
  createServer: jest.fn(() => SERVER),
  proxy: jest.fn(() => ({ promise: Promise.resolve(SERVER) })),
}));

jest.mock('./app', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    use: jest.fn(),
    init: jest.fn().mockResolvedValue(undefined),
    getHttpAdapter: jest.fn(() => ({ getInstance: jest.fn() })),
  })),
}));

describe('Main Lambda', () => {
  const identity = {
    accessKey: null,
    accountId: null,
    apiKey: null,
    apiKeyId: null,
    caller: null,
    cognitoAuthenticationProvider: null,
    cognitoAuthenticationType: null,
    cognitoIdentityId: null,
    cognitoIdentityPoolId: null,
    principalOrgId: null,
    sourceIp: '',
    user: null,
    userAgent: null,
    userArn: null,
    clientCert: null,
  };

  const requestContext = {
    accountId: '',
    apiId: '',
    protocol: '',
    httpMethod: '',
    path: '',
    stage: '',
    requestId: '',
    requestTimeEpoch: 123,
    resourceId: '',
    resourcePath: '',
    identity,
    authorizer: null,
  };

  const event: APIGatewayProxyEvent = {
    body: null,
    headers: {},
    multiValueHeaders: {},
    httpMethod: 'post',
    isBase64Encoded: true,
    path: 'path',
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext,
    resource: '',
  };

  const context: Context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: '',
    functionVersion: '',
    invokedFunctionArn: '',
    memoryLimitInMB: '',
    awsRequestId: '',
    logGroupName: '',
    logStreamName: '',
    getRemainingTimeInMillis: jest.fn(),
    succeed: jest.fn(),
    done: jest.fn(),
    fail: jest.fn(),
  };

  it('should start api server using serverless lambda', async () => {
    await handler(event, context, jest.fn());
  });

  it('should return cached server', async () => {
    await handler(event, context, jest.fn());
  });
});
