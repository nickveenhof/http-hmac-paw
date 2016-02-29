var url   = require('url');
var jsSHA = require('jssha');

var HttpHmacV1 = function () {

    this.evaluate = function (context) {

        var request = context.getCurrentRequest();

        var message = [
            request.method,
            this.md5(request.body),
            this.getContentType(request),
            this.getDate(request)
        ];

        // @todo this technically works, but Paw complains about a circular dependency.
        // var customHeaders = this.getCustomHeaders(request);
        // message = message.concat(customHeaders);
        message.push(null);

        message.push(url.parse(request.url).path);

        return this.provider + ' ' + this.apiKey + ':' + this.signMessage(message, this.apiSecret);
    }

    this.title = function (context) {
        return 'HTTP HMAC Spec 1.0 signature';
    }

    this.md5 = function (input) {
        var dv = DynamicValue('com.luckymarmot.HashDynamicValue', {
            'input': input,
            'hashType': 2 /* MD5 */
        });

        return dv.getEvaluatedString();
    }

    this.getContentType = function (request) {
        var contentType = request.getHeaderByName('Content-Type');

        return contentType ? contentType : 'application/json; charset=utf-8';
    }

    this.getDate = function (request) {
        var date = request.getHeaderByName('Date');
        var dv = DynamicValue('com.luckymarmot.TimestampDynamicValue');

        return date ? date : dv.getEvaluatedString();
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

    this.signMessage = function (message, secret) {
        var sha = new jsSHA('SHA-1', 'TEXT');
        sha.setHMACKey(secret, 'TEXT');
        sha.update(message.join("\n"));

        return sha.getHMAC('B64');
    }
}

HttpHmacV1.identifier = 'com.marktrapp.HttpHmacV1';

HttpHmacV1.title = 'HTTP HMAC Spec v1.0';

HttpHmacV1.help = 'https://github.com/itafroma/http-hmac-paw';

HttpHmacV1.inputs = [
    DynamicValueInput("provider", "Provider", "String"),
    DynamicValueInput("apiKey", "API Key", "String"),
    DynamicValueInput("apiSecret", "API Secret", "String"),
];

registerDynamicValueClass(HttpHmacV1);
