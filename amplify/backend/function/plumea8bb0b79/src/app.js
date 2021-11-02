var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var stripeKey = process.env.STRIPE_KEY;
var successUrl = process.env.REDIRECT_SUCCESS;
var cancelUrl = process.env.REDIRECT_CANCEL;

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

const stripe = require('stripe')(stripeKey);
// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.post('/checkout', async function(req, res) {
  console.log('creating checkout session:', req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl
    });
    res.json({ id: session.id });
  } catch (e) {
    res.json({ error: e });
  }
});

app.get('/products', async function(req,res) {
  let result = {};
  let params = req.params || { limit: 3 };
  try {
    let products = await stripe.products.list(params);
    let prices = await stripe.prices.list(params);
    products.data.map((product) => {
      prices.data.forEach(price => {
        if (price.product === product.id) product.price = price;
      });
    })
    result = products;
  } catch (error) {
    result = { 'error': error };
  }


  res.json(result);
});

app.get('/checkout/*', async function(req, res) {
  const { sessionId } = req.query;
  console.log(`retrieved session: ${sessionId}`);
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
