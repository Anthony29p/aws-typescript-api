// import { APIGatewayProxyHandler } from 'aws-lambda'
// import 'source-map-support/register'

export const test = async (event,_context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Test!"
      },
    ),
  };
};
