Basics
Sending an api request is easy. We use an Amazon style request authorization token to secure each request.

These are the required headers for each request:

"User-Agent" - Please identify the system/product you are using to make this request.

"X-Auth-Date" - The current unix epoch time as a string. 5 minute window.

"X-Auth-Key" - Your API key string.

"Authorization" - A SHA-1 hash of the X-Auth-Key, the corresponding key secret and the X-Auth-Date value concatenated as a string.

The Authorizaton header is computed with something like this (pseudo-code):

authHeader = sha1(apiKey+apiSecret+unixTime)
