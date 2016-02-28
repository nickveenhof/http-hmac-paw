var HttpHmacV1 = function () {

    this.evaluate = function () {
        return 'foo';
    }

    this.title = function (context) {
        return 'HTTP HMAC Spec 1.0 signature';
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
