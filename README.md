![Podcast Index banner](https://raw.githubusercontent.com/Podcastindex-org/art-graphics-logos/master/pci_banner.jpg)

# Podcast Index API Documentation
<small>v1.3.4 - 2020.09.16</small>

<br>

[Homepage](https://podcastindex.org/) | [Developers](https://api.podcastindex.org/) | [Documentation](http://podcastindex-org.github.io/docs-api) | [Example Code](https://github.com/Podcastindex-org-Examples)

## Basics

Sending an api request is easy. We use an Amazon style request authorization token to secure each request.

These are the required headers for each request:

*   "**User-Agent**" - Please identify the system/product you are using to make this request.
    
*   "**X-Auth-Date**" - The current unix epoch time as a string.  5 minute window.  This value is an integer; round down if needed.  The value must not include a decimal point.
    
*   "**X-Auth-Key**" - Your API key string.
    
*   "**Authorization**" - A SHA-1 hash of the X-Auth-Key, the corresponding key, secret and the X-Auth-Date value concatenated as a string.  The resulting hash should be encoded as a hexadecimal value, two digits per byte, using lower case letters for the hex digits "a" through "f".
    
    The Authorizaton header is computed with something like this (pseudo-code):
    
    `authHeader = sha1(apiKey+apiSecret+unixTime)`
    
<br><br>

## Endpoints

Note that all parameters passed should be url encoded where necessary.

<br>

### Searching

"**/api/1.0/search/byterm**" - Pass a search term to look for with ?q=\[search terms\].

> Example: GET [https://api.podcastindex.org/api/1.0/search/byterm?q=batman+university](https://api.podcastindex.org/api/1.0/search/byterm?q=batman+university&pretty)

This call returns all of the feeds that match the search terms **in the title** of the feed.

This is ordered by the last-released episode, with the latest at the top of the results.

<br>

### Podcasts

"**/api/1.0/podcasts/byfeedurl**" - Pass a feed url with ?url=\[feed url\].

> Example: GET [https://api.podcastindex.org/api/1.0/podcasts/byfeedurl?url=https://feeds.theincomparable.com/batmanuniversity](https://api.podcastindex.org/api/1.0/podcasts/byfeedurl?url=https://feeds.theincomparable.com/batmanuniversity&pretty)

This call returns everything we know about the feed.

-----

"**/api/1.0/podcasts/byfeedid**" - Pass a feed id with ?id=\[feed id\].

> Example: GET [https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=75075](https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=75075&pretty)

This call returns everything we know about the feed.

-----

"**/api/1.0/podcasts/byitunesid**" - Pass an itunes id with ?id=\[itunes id\].

> Example: GET [https://api.podcastindex.org/api/1.0/podcasts/byitunesid?id=1441923632](https://api.podcastindex.org/api/1.0/podcasts/byitunesid?id=1441923632&pretty)

If we have an itunes id on file for a feed, then this call returns everything we know about that feed.

*   Note: The itunes id parameter can either be the number alone, or be prepended with "id".

<br>

### Episodes

"**/api/1.0/episodes/byfeedurl**" - Pass a feed url with ?url=\[feed url\].

- Optional: since=\[unix timestamp\] or \[-seconds\] (int) - You can specify a hard-coded unix timestamp, or a negative integer
            that represents a number of seconds prior to right now.  Either way you specify, the search will start from that
            time and only return feeds updated since then.
- Optional: max=\[count\] (int) - You can specify a maximum number of results to return.

> Example: GET [https://api.podcastindex.org/api/1.0/episodes/byfeedurl?url=https://feeds.theincomparable.com/batmanuniversity](https://api.podcastindex.org/api/1.0/episodes/byfeedurl?url=https://feeds.theincomparable.com/batmanuniversity&pretty)

This call returns all the episodes we know about for this feed, in reverse chronological order.

-----

"**/api/1.0/episodes/byfeedid**" - Pass a feed id with ?id=\[id\].

- Optional: since=\[unix timestamp\] or \[-seconds\] (int) - You can specify a hard-coded unix timestamp, or a negative integer
            that represents a number of seconds prior to right now.  Either way you specify, the search will start from that
            time and only return feeds updated since then.
- Optional: max=\[count\] (int) - You can specify a maximum number of results to return.

> Example: GET [https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=75075](https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=75075&pretty)

This call returns all the episodes we know about for this feed, in reverse chronological order.

*   Note: The id parameter is the internal Podcastindex id for this feed.

-----

"**/api/1.0/episodes/byitunesid**" - Pass an itunes id with ?id=\[itunes id\].

- Optional: since=\[unix timestamp\] or \[-seconds\] (int) - You can specify a hard-coded unix timestamp, or a negative integer
            that represents a number of seconds prior to right now.  Either way you specify, the search will start from that
            time and only return feeds updated since then.
- Optional: max=\[count\] (int) - You can specify a maximum number of results to return.

> Example: GET [https://api.podcastindex.org/api/1.0/episodes/byitunesid?id=1441923632](https://api.podcastindex.org/api/1.0/episodes/byitunesid?id=1441923632&pretty)

If we have an itunes id on file for a feed, then this call returns all the episodes we know about for the feed, in reverse chronological order.

*   Note: The itunes id parameter can either be the number alone, or be prepended with "id".

-----

"**/api/1.0/episodes/byid**" - Pass an episode id with ?id=\[id\].

> Example: GET [https://api.podcastindex.org/api/1.0/episodes/byid?id=16795090](https://api.podcastindex.org/api/1.0/episodes/byid?id=16795090&pretty)

Get all the metadata for a single episode by passing its id.


<br>

### Recent

"**/api/1.0/recent/episodes**" - Pass the count you want with ?max=\[count\].

- Optional: excludeString=\[url encoded string\] (string) - If you pass this argument, any item containing this string will be discarded from the result set. This may, in certain cases, reduce your set size below your "max" value.
- Optional: before=\[episode id\] (int) - If you pass an episode id, you will get recent episodes before that id, allowing you to walk back through the episode history sequentially.

> Example: GET [https://api.podcastindex.org/api/1.0/recent/episodes?max=7](https://api.podcastindex.org/api/1.0/recent/episodes?max=7&pretty)

This call returns the most recent \[max\] number of episodes globally across the whole index, in reverse chronological order.

*   Note: If no \[max\] is specified, the default is 10.
*   Note: The \[excludeString\] value matches against title and urls.

-----

"**/api/1.0/recent/feeds**" - Pass the count you want with ?max=\[count\].

- Optional: since=\[unix timestamp\] or \[-seconds\] (int) - You can specify a hard-coded unix timestamp, or a negative integer
            that represents a number of seconds prior to right now.  Either way you specify, the search will start from that
            time and only return feeds updated since then.
- Optional: lang=\[rss language code\] (string) - Specifying a language code (like "en") will return only feeds having that
            specific language.  You can specify multiple languages by separating them with commas. If you also want
            to return feeds that have no language given, use the token "unknown".  (ex. en,es,ja,unknown)
- Optional: cat=\[category id|name\] (int|string) - You may use this argument to specify that you ONLY want feeds with these categories
            in the results.  Separate multiple categories with commas.  You may specify either the category id or the category name.
- Optional: notcat=\[category id|name\] (int|string) - You may use this argument to specify categories of feeds to NOT show
            in the results.  Separate multiple categories with commas.  You may specify either the category id or the category name.

> Example: GET [https://api.podcastindex.org/api/1.0/recent/feeds?max=20&cat=102,health&lang=de,ja](https://api.podcastindex.org/api/1.0/recent/feeds?max=20&cat=102,health&lang=de,ja&pretty)

This call returns the most recent \[max\] feeds, in reverse chronological order.

*   Note: If no \[max\] is specified, the default is 40.
*   Note: Language and category names are case-insensitive.
*   Note: You can mix and match the cat and !cat filters to fine tune a very specific result set.

-----

"**/api/1.0/recent/newfeeds**"

> Example: GET [https://api.podcastindex.org/api/1.0/recent/newfeeds](https://api.podcastindex.org/api/1.0/recent/newfeeds?pretty)

This call returns every new feed added to the index over the past 24 hours in reverse chronological order.

*   Note: There is an upper limit for now of 1000 feeds returned.

<br>

### Adding

"**/api/1.0/add/byfeedurl**" - POST/GET - Pass a feed url with ?url=\[feed url\].

> Example: POST/GET [https://api.podcastindex.org/api/1.0/add/byfeedurl?url=https://feeds.theincomparable.com/batmanuniversity](https://api.podcastindex.org/api/1.0/add/byfeedurl?url=https://feeds.theincomparable.com/batmanuniversity&pretty)

\*\*This call requires a read-write api key.

This call adds a podcast to the index using its feed url. If a feed already exists, you will get its existing feed id returned.

-----

"**/api/1.0/add/byitunesid**" - POST/GET - Pass an itunes id with ?id=\[id\].

> Example: POST/GET [https://api.podcastindex.org/api/1.0/add/byitunesid?id=1441923632](https://api.podcastindex.org/api/1.0/add/byitunesid?id=1441923632&pretty)

\*\*This call requires a read-write api key.

This call adds a podcast to the index using its itunes id. If a feed already exists, it will be noted in the response.

-----

"**/api/1.0/add/batch/byfeedurl**" - POST - Pass an array of urls in a form encoded post request.

> Example: POST [https://api.podcastindex.org/api/1.0/add/batch/byfeedurl](https://api.podcastindex.org/api/1.0/add/batch/byfeedurl?pretty)

Form data:
* url[]:http://feed.nashownotes.com/rss.xml
* url[]:http://feeds.soundcloud.com/users/soundcloud:users:475750905/sounds.rss
* url[]:https://feeds.theincomparable.com/batmanuniversity

\*\*This call requires a publisher api key.  Available by request/approval.

This call adds multiple feed urls at once.  It returns an array listing the results of each one.  If the feed existed already, or if it was added, you will get back its podcastindex.org feed id.  If we have linkage to an itunes id for
this feed it will be returned as well.  There are also "error" and "valid" properties returned.  A false in the "valid" property indicates the feed url was structurally invalid.  A true in the "error" property indicates something went
wrong internally while adding the feed.



<br><br>

## Return Values

By default, all responses are in JSON format if nothing different is specified. You can ask for a different data type by adding responseType=\[type\] where \[type\] is one of the values listed below.

These are the response data types we support:

*   "**json**" - The default.
*   "**plist**" - Format that apple developers may want. Coming soon
*   "**xml**" - Standard, well-formed XML data. Coming soon
*   "**opml**" - XML data formatted as an OPML outline according to the spec. Coming soon
*   "**rss**" - An RSS v2.0 representation of the data if you wanted to follow a result set as if it were a feed. Coming soon
*   "**csv**" - The result set formatted as comma separated values, with double-quote value delimiters. Coming soon

<br><br>

## Optional Parameters

There are various optional parameters you can pass when calling API endpoints to modify the reponses. Some are boolean true by their presence (like "itunes"), while others require a value to be passed.

Here is the current list:

*   "**pretty**" (bool) - If present, makes the output "pretty" to help with debugging.
*   "**apple**" (bool) - If present, only returns podcasts that also exist in Apple's directory, if we can determine that. Coming soon
*   "**itunes**" (bool) - If present, gives you back exactly what an itunes lookup API call would. Coming soon
*   "**max=<99>**" (int) - Limits the number of results returned to the maximum number specified, where contextually appropriate.
*   "**fulltext**" (bool) - If present, returns the full text of long text properties, like 'description'. Otherwise, all text fields are truncated to 100 words.

<br><br>

## Response Structure (Podcasts/Feeds)

We give you everything we know about the feed. Here is a breakdown of the different values and their meaning. You can expect additional properties to be added going forward. We attempt to "normalize" podcast feeds into a predictable property set, to minimize the need for vendor specifics and namespaces.

```json
{
    "status": "true",
    "feeds": [
    {
        "id": 75075,
        "title": "Batman University",
        "url": "https:\/\/feeds.theincomparable.com\/batmanuniversity",
        "originalUrl": "https:\/\/feeds.theincomparable.com\/batmanuniversity",
        "link": "https:\/\/www.theincomparable.com\/batmanuniversity\/",
        "description": "Batman University is a seasonal podcast about you know who...",
        "author": "Tony Sindelar",
        "ownerName": "The Incomparable",
        "image": "https:\/\/www.theincomparable.com\/imgs\/logos\/logo-batmanuniversity-3x.jpg",
        "artwork": "https:\/\/www.theincomparable.com\/imgs\/logos\/logo-batmanuniversity-3x.jpg",
        "lastUpdateTime": 1546399813,
        "lastCrawlTime": 1599328949,
        "lastParseTime": 1599012694,
        "lastGoodHttpStatusTime": 1599328949,
        "lastHttpStatus": 200,
        "contentType": "application\/x-rss+xml",
        "itunesId": 1441923632,
        "generator": null,
        "language" : "en-us",
        "type": 0,
        "dead": 0,
        "crawlErrors": 0,
        "parseErrors": 0,
        "categories": {
            "104": "TV",
            "105": "Film",
            "107": "Reviews"
        }
    }
    ],
    "count": 1,
    "query": "batman university",
    "description": "Found matching feeds."
}
```
*   "**id**" - The internal podcastindex.org feed id.
*   "**title**" - The feed title.
*   "**url**" - The current feed url.
*   "**originalUrl**" - The url of the feed, before it changed to its current url.
*   "**link**" - The channel level link in the feed.
*   "**description**" - The channel-level description.
*   "**author**" - The channel-level author element. Usually iTunes specific, but could be from another namespace if not present.
*   "**ownerName**" - The channel-level owner:name element. Usually iTunes specific, but could be from another namespace if not present.
*   "**image**" - The channel-level image element.
*   "**artwork**" - The seemingly best artwork we can find for the feed. Might be the same as 'image' in most instances.
*   "**lastUpdateTime**" - \[Unix Epoch\] The channel-level pubDate for the feed, if it's sane. If not, this is a heuristic valu, arrived at by analyzing other parts of the feed, like item-level pubDates.
*   "**lastCrawlTime**" - \[Unix Epoch\] The last time we attempted to pull this feed from its url.
*   "**lastParseTime**" - \[Unix Epoch\] The last time we tried to parse the downloaded feed content.
*   "**lastGoodHttpStatusTime**" - \[Unix Epoch\] Timestamp of the last time we got a "good", meaning non-4xx/non-5xx, status code when pulling this feed from its url.
*   "**lastHttpStatus**" - The last http status code we got when pulling this feed from its url. You will see some made up status codes sometimes. These are what we use to track state within the feed puller. These all start with 9xx.
*   "**contentType**" - The Content-Type header from the last time we pulled this feed from its url.
*   "**lastCrawlTime**" - \[Unix Epoch\] The last time we attempted to pull this feed from its url.
*   "**itunesId**" - The itunes id of this feed if there is one, and we know what it is.
*   "**generator**" - The channel-level generator element if there is one.
*   "**language**" - The channel-level language specification of the feed. Languages accord with the RSS [language spec](https://www.rssboard.org/rss-language-codes).
*   "**type**" - 0 = RSS, 1 = ATOM
*   "**dead**" - At some point, we give up trying to process a feed and mark it as dead. This is usually after 1000 errors without a successful pull/parse cycle. Once the feed is marked dead, we only check it once per month.
*   "**crawlErrors**" - The number of errors we've encountered trying to pull a copy of the feed. Errors are things like a 500 or 404 resopnse, a server timeout, bad encoding, etc.
*   "**parseErrors**" - The number of errors we've encountered trying to parse the feed content. Errors here are things like not well-formed xml, bad character encoding, etc. We fix many of these types of issues on the fly when parsing. We only increment the errors count when we can't fix it.
*   "**categories**" - An array of categories, where the index is the category id and the value is the category name.

\*\* Note that when we return properties for episodes, we also send back some of what we consider critical info about the feed the episode came from.  For these properies, we just prepend "feed" to the front
of the camel-cased version of the property name.  For instance, "language" becomes "feedLanguage".

<br><br>

## Example code

Here are some examples to get you started.



**PHP**

```php
//Required values
$apiKey = "UXKCGDSYGUUEVQJSYDZH";
$apiSecret = "yzJe2eE7XV-3eY576dyRZ6wXyAbndh6LUrCZ8KN|";
$apiHeaderTime = time();

//Hash them to get the Authorization token
$hash = sha1($apiKey.$apiSecret.$apiHeaderTime);

//Set the required headers
$headers = [
    "User-Agent: SuperPodcastPlayer/1.3",
    "X-Auth-Key: $apiKey",
    "X-Auth-Date: $apiHeaderTime",
    "Authorization: $hash"
];

//Make the request to an API endpoint
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,"https://api.podcastindex.org/api/1.0/search/byterm?q=bastiat");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

//Collect and show the results
$response = curl_exec ($ch);
curl_close ($ch);
echo print_r(json_decode($response), TRUE);
```


**C#**

```csharp
//Required values
string apiKey = "UXKCGDSYGUUEVQJSYDZH";
string apiSecret = "yzJe2eE7XV-3eY576dyRZ6wXyAbndh6LUrCZ8KN|";
TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
int apiHeaderTime = (int)t.TotalSeconds;

//Hash them to get the Authorization token
string hash = "";
using (SHA1Managed sha1 = new SHA1Managed())
{
    var hashed = sha1.ComputeHash(Encoding.UTF8.GetBytes(apiKey + apiSecret + apiHeaderTime));
    var sb = new StringBuilder(hashed.Length * 2);

    foreach (byte b in hashed)
    {
        // can be "x2" if you want lowercase
        sb.Append(b.ToString("x2"));
    }

    hash = sb.ToString();
}

//Create the web request and add the required headers
HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://api.podcastindex.org/api/1.0/search/byterm?q=bastiat");
request.Headers.Add("User-Agent", "SuperPodcastPlayer/1.3");
request.Headers.Add("X-Auth-Date", apiHeaderTime.ToString());
request.Headers.Add("X-Auth-Key", apiKey);
request.Headers.Add("Authorization", hash);

//Send the request and collect/show the results
try
{
    WebResponse webResponse2 = request.GetResponse();
    Stream stream2 = webResponse2.GetResponseStream();
    StreamReader reader2 = new StreamReader(stream2);

    Console.WriteLine(reader2.ReadToEnd());

    webResponse2.Close();
}
catch (Exception e)
{
    Console.WriteLine("Error.");
}
```

**Swift**

```swift
import Foundation
import CommonCrypto

extension String {
    func sha1() -> String {
        let data = Data(self.utf8)
        var digest = [UInt8](repeating: 0, count:Int(CC_SHA1_DIGEST_LENGTH))
        data.withUnsafeBytes {
            _ = CC_SHA1($0.baseAddress, CC_LONG(data.count), &digest)
        }
        let hexBytes = digest.map { String(format: "%02hhx", $0) }
        return hexBytes.joined()
    }
}

let apiKey = "UXKCGDSYGUUEVQJSYDZH"
let apiSecret = "yzJe2eE7XV-3eY576dyRZ6wXyAbndh6LUrCZ8KN|"
let apiHeaderTime = String(Int(Date().timeIntervalSince1970))
let hash = (apiKey + apiSecret + apiHeaderTime).sha1()

var semaphore = DispatchSemaphore (value: 0)
var request = URLRequest(url: URL(string: "https://api.podcastindex.org/api/1.0/search/byterm?q=bastiat")!,timeoutInterval: Double.infinity)
request.addValue("SuperPodcastPlayer/1.3", forHTTPHeaderField: "User-Agent")
request.addValue(apiKey, forHTTPHeaderField: "X-Auth-Key")
request.addValue(apiHeaderTime, forHTTPHeaderField: "X-Auth-Date")
request.addValue(hash, forHTTPHeaderField: "Authorization")

request.httpMethod = "GET"

let task = URLSession.shared.dataTask(with: request) { data, response, error in
    guard let data = data else {
        print(String(describing: error))
        return
    }
    print(String(data: data, encoding: .utf8)!)
    semaphore.signal()
}

task.resume()
semaphore.wait()
```

**Postman**

* * *

1) Download the contents of the `Postman Docs` folder.
2) Import the `PodcastIndex.postman_collection.json` collection to Postman
3) Import the `PodcastIndexOrgEnvironment.postman_environment.json` to Postman
4) Set the `AuthKey` environment variable
5) Set the `SecretKey` environment variable
6) Hit the `Send` button (⌘ + return)

<br><br>

## Libraries

**Javascript (Node.js)**

- [podcast-index-api](https://github.com/comster/podcast-index-api)
- [podcastdx-client](https://github.com/RyanHirsch/podcastdx-client) - typescript support
