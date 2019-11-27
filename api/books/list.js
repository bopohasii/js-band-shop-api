const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async () => {
  let response;
  const params = {
    TableName: process.env.BOOKS_TABLE,
  };

  try {
    const result = await dynamoDb.scan(params).promise();

    response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
    response = {
      statusCode: error.statusCode || 501,
      body: JSON.stringify(error)
    };
  }

  return response;
};
