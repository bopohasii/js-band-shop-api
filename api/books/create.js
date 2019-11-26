const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event, context) => {
  let response;
  const timestamp = Date.now();
  const {
    title,
    description,
    author,
    logo,
    price,
    count,
    shopName,
  } = JSON.parse(event.body);

  //todo: validation
  const params = {
    TableName: process.env.BOOKS_TABLE,
    Item: {
      id: uuid.v1(),
      title,
      description,
      author,
      logo,
      price,
      count,
      shopName,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  try {
    await dynamoDb.put(params);

    response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };

  } catch (error) {
    response = {
      statusCode: error.statusCode || 501,
      body: JSON.stringify(error)
    };
  }

  return response;
};
