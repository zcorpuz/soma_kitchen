// Server requirements for admin/login //
const handlebars = require('express-handlebars');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const squareConnect = require('square-connect');

const PORT = process.env.PORT || 9000;
// Access Token for Square Payment Form API
const accessToken = 'EAAAEH3Rp6IlsxAQBlnhSqNPFLhWanH4iBDfokFouBCbAlsW_bC5NF8gSuGFd4z2';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');

//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    }));

//Serves static files (we need it to imPORT a css file)
app.use(express.static('public'))

//Sets a basic route
app.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('index', {layout : 'main'});
});

//Set Square Connect credentials and environment
const defaultClient = squareConnect.ApiClient.instance;

// Configure OAuth2 access token for authorization: oauth2
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = accessToken;

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = 'https://connect.squareupsandbox.com';

app.post('/process-payment', async (req, res) => {
  const request_params = req.body;

  // length of idempotency_key should be less than 45
  const idempotency_key = crypto.randomBytes(22).toString('hex');

  // Charge the customer's card
  const payments_api = new squareConnect.PaymentsApi();
  const request_body = {
    source_id: request_params.nonce,
    amount_money: {
      amount: 100, // $100.00 charge
      currency: 'USD'
    },
    idempotency_key: idempotency_key
  };

  try {
    const response = await payments_api.createPayment(request_body);
    res.status(200).json({
      'title': 'Payment Successful',
      'result': response
    });
  } catch(error) {
    res.status(500).json({
      'title': 'Payment Failure',
      'result': error.response.text
    });
  }
});


//Makes the app listen to PORT 9000
app.listen(PORT, () => console.log(`App listening to PORT ${PORT}`));

