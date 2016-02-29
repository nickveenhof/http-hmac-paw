var httpHmacJS = require('http-hmac-javascript');

var HttpHmacV2 = function () {

    this.evaluate = function (context) {

        var hmac_config = {
          realm: this.realm,
          public_key: this.apiKey,
          secret_key: this.apiSecret
        };
        const HMAC = new AcquiaHttpHmac(hmac_config);

        var request = context.getCurrentRequest();

        // Sign the request using AcquiaHttpHmac.sign().
        var sign_parameters = [
          request,
          request.method,
          url.parse(request.url).path,
          // additional headers should go here.
          "",
          this.getContentType(request),
          request.body
        ];

        HMAC.sign(sign_parameters);

        // Figure out if we can also just return the request here?
        return this.provider + ' ' + this.apiKey + ':' + this.signMessage(message, this.apiSecret);
    }

    this.title = function (context) {
        return 'HTTP HMAC Spec 2.0 signature';
    }

    this.getContentType = function (request) {
        var contentType = request.getHeaderByName('Content-Type');
        return contentType ? contentType : 'application/json; charset=utf-8';
    }

    this.getCustomHeaders = function (request) {
        var headers = request.getHeaders(false);
        var customHeaders = [];

        for (var headerName in headers) {
            if (headerName.toLowerCase().startsWith('x-')) {
                customHeaders.push(headerName.toLowerCase() + ': ' + headers[headerName].toString());
            }
        }

        return customHeaders;
    }
}


HttpHmacV2.identifier = 'com.marktrapp.HttpHmacV2';

HttpHmacV2.title = 'HTTP HMAC Spec v2.0';

HttpHmacV2.help = 'https://github.com/itafroma/http-hmac-paw';

HttpHmacV2.inputs = [
    DynamicValueInput("apiKey", "API Key", "String"),
    DynamicValueInput("apiSecret", "API Secret", "String"),
    DynamicValueInput("realm", "API Realm", "String"),
];

registerDynamicValueClass(HttpHmacV2);
