'use strict';

const aws = require('aws-sdk');
const ses = new aws.SES();

const ToAddresses = ['sam.zagrobelny@gmail.com']; // kwk@direktforce.com
const CcAddresses = [`7165122455@msg.fi.google.com`, 'prizerebel_junk@live.com']; // sam.zagrobelny@gmail.com
const SourceAddress = 'strangesast@gmail.com'; // eventually will be contact.direktforce.com

const domainName = '*'; // should update to direktforce.com / direktforce.github.io
const HEADERS = {
  'Access-Control-Allow-Origin': domainName,
  'Access-Control-Allow-Headers': 'x-requested-with',
  'Access-Control-Allow-Credentials': true
};

const HTMLHead = `
  <title>A Message From direktforce.com</title>
  <style>
    body {
      margin: 0;
    }
    .details {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 8px;
    }
    .detail p {
      grid-column: 1 / 3;
    }
    .detail > *:empty:after {
      content: "(blank)";
    }
  </style>
`;

const DOMAIN = {
  url: 'https://direktforce.com',
  name: 'direktforce.com',
};

function formatContactEmail(body) {
  const vals = ['name', 'email', 'company', 'message']
    .map(key => key in body ? body[key] : '(blank)');

  const TextData = [
    `A message redirected from direktforce.com:`,
    `Name: ${vals[0]}`, `Email: ${vals[1]}`,
    `Company: ${vals[2]}`, `Message:`, `${vals[3]}`,
  ].join('\n');

  const HTMLData = `
  <html><body>
    <h1>New message redirected from <a href="${DOMAIN.url}">${DOMAIN.name}</a></h1>
    <div style="display: grid; grid-template-columns: auto auto;">
      <span>Name:</span><span>${body.name}</span>
      <span>Email:</span><span>${body.email}</span>
      <span>Company:</span><span>${body.company}</span>
      <span>Message:</span>
      <p style="grid-column: 1 / 3;">${body.message}</p>
    </div>
  </body></html>
  `;
  const SubjectData = `A message from ${body.name} (${body.email})`;

  return {
    Body: {
      Text: { Data: TextData },
      Html: { Data: HTMLData },
    },
    Subject: { Data: SubjectData },
  };
}

function formatApplicationEmail(body) {
  const vals = ['name', 'email', 'message']
    .map(key => key in body ? body[key] : '(blank)');

  const TextData = [
    `A new application redirected from direktforce.com:`,
    `Name: ${vals[0]}`, `Email: ${vals[1]}`, `Message:`, `${vals[2]}`,
  ].join('\n');

  const HTMLData = `
  <html><body>
    <h1>New application redirected from <a href="${DOMAIN.url}">${DOMAIN.name}</a></h1>
    <div style="display: grid; grid-template-columns: auto auto;">
      <span>Name:</span><span>${body.name}</span>
      <span>Email:</span><span>${body.email}</span>
      <span>Message:</span>
      <p style="grid-column: 1 / 3;">${body.message}</p>
    </div>
  </body></html>
  `;
  const SubjectData = `A new application from ${body.name} (${body.email})`;

  return {
    Body: {
      Text: { Data: TextData },
      Html: { Data: HTMLData },
    },
    Subject: { Data: SubjectData },
  };
}

module.exports.staticSiteMailer = async (event, context) => {
  let body;
  try {
    body = JSON.parse(event.body) || {};
    if (!body.type || (body.type !== "application" && body.type != "contact")) throw new Error("invalid message type");
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err.message),
      headers: HEADERS,
    };
  }
  try {
    const result = await ses.sendEmail({
      Message: body.type == 'contact' ? formatContactEmail(body): formatApplicationEmail(body),
      Destination: {
        ToAddresses,
        CcAddresses,
      },
      Source: SourceAddress,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({message: 'Message sent successfully', result, body}),
      headers: HEADERS,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err.message),
      headers: HEADERS,
    };
  }
};
