whatcd-search
----

search What.CD for things.

## Command Line

```shell
% export WHAT_USERNAME=''
% export WHAT_PASSWORD=''
```

Usage:

```shell
% whatcd-search [OPTIONS]
% # or
% ./node_modules/.bin/whatcd-search [OPTIONS]
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

```shell
% npm install feltnerm/whatcd-search
% export WHAT_USERNAME=''
% export WHAT_PASSWORD=''
```

then

```
var whatcd_search = require('whatcd_search');

var params = {
	artistname: '',
	searchstr: '',
	media: '',
	encoding: '',
	format: '',
	// etc ...
};

whatcd_search(params).then(handle_results, error);

// or

whatcd_search(params, cb);
```
