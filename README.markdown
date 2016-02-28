# HTTP HMAC Signer for Paw

A [Paw extension][1] that implements version 1.0 of the [HTTP HMAC Spec][2] to sign and verify RESTful web API requests.

## Installation

1. Open Paw.
2. Open the extensions manager by selecting the **Paw** → **Extensions** → **Manage extensions…** menu.
3. Note the extensions folder path.
4. Open Terminal and navigate to the extensions folder path:

    ```sh
    cd /path/to/extensions
    ```

5. Clone this repository into your extensions folder as `com.marktrapp.HttpHmacV1`:

    ```sh
    git clone git@github.com:itafroma/http-hmac-paw.git com.marktrapp.HttpHmacV1
    ```

6. Back in Paw's extensions manager, click the **Reload Installed Extensions** button.

## License and copyright

This extension is copyright [Mark Trapp][3]. All Rights Reserved. It is made available under the terms of the MIT license. A copy of the license can be found in the LICENSE file within this repository.

## Disclosure and disclaimer

I am an employee of [Acquia Inc.][4], the author of the HTTP HMAC Spec. This extension was created as a personal project and had no Acquia involvement. Likewise, this development of this extension has had involvement from [Paw Inc.][5], the developers of Paw, with whom I am not affiliated in any way.

[1]: http://luckymarmot.com/paw/extensions/
[2]: https://github.com/acquia/http-hmac-spec/tree/1.0
[3]: https://marktrapp.com
[4]: https://www.acquia.com
[5]: https://luckymarmot.com/paw
