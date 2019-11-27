const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async event => {
  let response;
  const params = {
    TableName: process.env.BOOKS_TABLE,
    Key: {
      bookId: event.pathParameters.bookId,
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();

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