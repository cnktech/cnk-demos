module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({
        message: 'I know how to make use of things defined in another service, like a url',
        serviceAUrl: process.env.SERVICE_A_URL,
        myOutput: process.env.OUTPUT
      })
  }
}
