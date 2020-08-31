#### Basics

Sending an api request is easy. We use an Amazon style request authorization token to secure each request.

These are the required headers for each request:

*   "**User-Agent**" - Please identify the system/product you are using to make this request.
    
*   "**X-Auth-Date**" - The current unix epoch time as a string. 5 minute window.
    
*   "**X-Auth-Key**" - Your API key string.
    
*   "**Authorization**" - A SHA-1 hash of the X-Auth-Key, the corresponding key secret and the X-Auth-Date value concatenated as a string.
    
    The Authorizaton header is computed with something like this (pseudo-code):
    
    `authHeader = sha1(apiKey+apiSecret+unixTime)`
    

#### Endpoints

Note that all parameters passed should be url encoded where necessary.

These are the endpoints currently supported:

*   ##### Search
    
    *   "**/api/1.0/search/byterm**" - Pass a search term to look for with ?q=\[search terms\].
        
        `Example: GET [https://api.podcastindex.org/api/1.0/search/byterm?q=batman+university](https://api.podcastindex.org/api/1.0/search/byterm?q=batman+university&pretty)`
        
        This call returns all of the feeds that match the search terms **in the title** of the feed.
        
*   ##### Podcasts
    
    *   "**/api/1.0/podcasts/byfeedurl**" - Pass a feed url with ?url=\[feed url\].
        
        `Example: GET [https://api.podcastindex.org/api/1.0/podcasts/byfeedurl?url=https://feeds.theincomparable.com/batmanuniversity](https://api.podcastindex.org/api/1.0/podcasts/byfeedurl?url=https://feeds.theincomparable.com/batmanuniversity&pretty)`
        
        This call returns everything we know about the feed.
        
    *   "**/api/1.0/podcasts/byfeedid**" - Pass a feed id with ?id=\[feed id\].
        
        `Example: GET [https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=75075](https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=75075&pretty)`
        
        This call returns everything we know about the feed.
        
    *   "**/api/1.0/podcasts/byitunesid**" - Pass an itunes id with ?id=\[itunes id\].
        
        `Example: GET [https://api.podcastindex.org/api/1.0/podcasts/byitunesid?id=1441923632](https://api.podcastindex.org/api/1.0/podcasts/byitunesid?id=1441923632&pretty)`
        
        If we have an itunes id on file for a feed, then this call returns everything we know about that feed.
        
        *   Note: The itunes id parameter can either be the number alone, or be prepended with "id".
    *   "**/api/1.0/add/byfeedurl**" - Pass a feed url with ?url=\[feed url\].
        
        `Example: GET [https://api.podcastindex.org/api/1.0/add/byfeedurl?url=https://feeds.theincomparable.com/batmanuniversity](https://api.podcastindex.org/api/1.0/add/byfeedurl?url=https://feeds.theincomparable.com/batmanuniversity&pretty)`
        
        \*\*This call requires a read-write api key.
        
        This call adds a podcast to the index using it's feed url. If a feed already exists, you will get it's existing feed id returned.
        
*   ##### Episodes
    
    *   "**/api/1.0/episodes/byfeedurl**" - Pass a feed url with ?url=\[feed url\].
        
        `Example: GET [https://api.podcastindex.org/api/1.0/episodes/byfeedurl?url=https://feeds.theincomparable.com/batmanuniversity](https://api.podcastindex.org/api/1.0/episodes/byfeedurl?url=https://feeds.theincomparable.com/batmanuniversity&pretty)`
        
        This call returns all the episodes we know about for this feed, in reverse chronological order.
        
    *   "**/api/1.0/episodes/byfeedid**" - Pass a feed id with ?id=\[id\].
        
        `Example: GET [https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=75075](https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=75075&pretty)`
        
        This call returns all the episodes we know about for this feed, in reverse chronological order.
        
        *   Note: The id parameter is the internal Podcastindex id for this feed.
    *   "**/api/1.0/episodes/byitunesid**" - Pass an itunes id with ?id=\[itunes id\].
        
        `Example: GET [https://api.podcastindex.org/api/1.0/episodes/byitunesid?id=1441923632](https://api.podcastindex.org/api/1.0/episodes/byitunesid?id=1441923632&pretty)`
        
        If we have an itunes id on file for a feed, then this call returns all the episodes we know about for the feed, in reverse chronological order.
        
        *   Note: The itunes id parameter can either be the number alone, or be prepended with "id".
*   ##### Recent
    
    *   "**/api/1.0/recent/episodes**" - Pass the count you want with ?max=\[count\].
        
        `Example: GET [https://api.podcastindex.org/api/1.0/recent/episodes?max=7](https://api.podcastindex.org/api/1.0/recent/episodes?max=7&pretty)`
        
        This call returns the most recent \[max\] number of episodes globally across the whole index, in reverse chronological order.
        
        *   Note: If no \[max\] is specified, the default is 10.

#### Return Values

By default, all responses are in JSON format if nothing different is specified. You can ask for a different data type by adding responseType=\[type\] where \[type\] is one of the values listed below.

These are the response data types we support:

*   "**json**" - The default.
*   "**plist**" - Format that apple developers may want. Coming soon
*   "**xml**" - Standard, well-formed XML data. Coming soon
*   "**opml**" - XML data formatted as an OPML outline according to the spec. Coming soon
*   "**rss**" - An RSS v2.0 representation of the data if you wanted to follow a result set as if it were a feed. Coming soon
*   "**csv**" - The result set formatted as comma separated values, with double-quote value delimiters. Coming soon

#### Optional Parameters

There are various optional parameters you can pass when calling API endpoints to modify the reponses. Some are boolean true by their presence (like "itunes"), while others require a value to be passed.

Here is the current list:

*   "**pretty**" (bool) - Makes the output "pretty" to help with debugging.
*   "**apple**" (bool) - Only returns podcasts that also exist in Apple's directory, if we can determine that. Coming soon
*   "**itunes**" (bool) - Gives you back exactly what an itunes lookup API call would. Coming soon
*   "**max=<99>**" (int) - Limits the number of results returned to the maximum number specified, where contextually appropriate.

#### Example code

Here are some examples to get you started.

  

**PHP**

* * *

`

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


`

**C#**

* * *

`

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


`
