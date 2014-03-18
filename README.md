whatcd-search
----

search What.CD for things.

## Command Line

```
% export WHAT_USERNAME=''
% export WHAT_PASSWORD=''
```

Usage:

```
% whatcd-search [OPTIONS]
```

```
Options:
    --artistname ['Ween',...]
    --searchstr ['',...]
    --media [...]
    --encoding [,...]
    --format [FLAC,...]

     .. and so forth ...
 ```

## Node

Usage:

```
// make sure your environment variables are set.
var whatcd_search = require('whatcd_search');

whatcd_search(params);
```
