import type { AWS } from '@serverless/typescript';
require('dotenv').config()
// import hello from '@functions/hello';


const serverlessConfiguration: AWS = {
  service: 'aws-typescript-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      MONGO_USER:process.env.MONGO_USER,
      MONGO_PASSWORD:process.env.MONGO_PASSWORD ,
      MONGO_HOST:process.env.MONGO_HOST,
      DB_NAME:process.env.DB_NAME,
    },
    region:'us-west-2',
    iamRoleStatements:[
      {
        Effect: 'Allow',
        Action: ['dynamodb:*'],
        Resource: ['arn:aws:dynamodb:us-east-2:322714799116:table/CardsTable'],
      },
    ]
  },
  // import the function via paths
  functions: { 
    test: {
      handler: 'src/functions/test.test',
      events: [
        {
          http: {
            method: 'get',
            path: '/test',
          }
        }
      ]
    },
    getCard: {
      handler: 'src/functions/getCard.getCard',
      events: [
        {
          http: {
            method: 'get',
            path: '/',
          }
        }
      ]
    },
    postCard: {
      handler: 'src/functions/postCard.postCard',
      events: [
        {
          http: {
            method: 'put',
            path: '/',
          }
        }
      ]
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
