'use strict';

const aws = require('aws-sdk');
const ses = new aws.SES();

const toEmail = "sam.zagrobelny@gmail.com";
const fromEmail = "strangesast@gmail.com";


const domainName = '*';
const headers = {
  'Access-Control-Allow-Origin': domainName,
  'Access-Control-Allow-Headers': 'x-requested-with',
  'Access-Control-Allow-Credentials': true
};


module.exports.staticSiteMailer = async (event, context) => {
  let name, email, company, message;
  try {
    ({name, email, company, message} = JSON.parse(event.body));
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err.message),
      headers,
    };
  }

  const Data = [
    `A message redirected from direktforce.com:`,
    `Name: ${name || '(blank)'}`,
    `Email: ${email || '(blank)'}`
    `Company: ${company || '(blank)'}`
    `Message:`,
    `${message || '(blank)'}`,
  ].join('\n');

  const emailParams = {
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Body: { Text: { Data } },
      Subject: { Data: `A message from ${name} (${email})` },
    },
    Source: fromEmail,
  };

  try {
    const data = await ses.sendEmail(emailParams).promise();
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err.message),
      headers,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({message: 'Message sent successfully', params: {name, email, company, message}}),
    headers,
  };
};
