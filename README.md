# Netlify rewrite rule bug

`_redirects` rules is following

```
/api/*  https://netlify-rewrite-proxy-ddxfwwgnff.now.sh/:splat  200
/q id=:id  https://netlify-rewrite-proxy-ddxfwwgnff.now.sh/id=:id  200
/path id=:id  https://netlify-rewrite-proxy-ddxfwwgnff.now.sh/:id  200
```

Request: 

```
/api/test%3Ftest
```

Actual Request Result:

Drop after `?`

```
https://netlify-rewrite-proxy-ddxfwwgnff.now.sh/test
```

The server-side log:

```
     originalUrl: '/test',
     _parsedUrl:
      Url {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: null,
        query: null,
        pathname: '/test',
        path: '/test',
        href: '/test',
        _raw: '/test' },
     params: { '0': 'test' },
     query: {},
     res: [Circular],
     route: Route { path: '/*', stack: [Array], methods: [Object] } },
  locals: {},
```

## Usage

    git clone ...
    npm install

### See Logs

    npm run log

### Send Request from  Netlify + rewrite rules

    open https://astronaut-envelope-21017.netlify.com/
    
And request "test%3Ftest".

## Workaround

Twice escape `?` and `&`

- `test%3Ftest` => `test%253FFtest`

```js
const requestURL = encodeURIComponent(encodeURIComponent(apiURL))
```


Request: 

```
/api/test%253FFtest
```


Server-side logs:

```

     baseUrl: '',
     originalUrl: '/test%3FFtest',
     _parsedUrl:
      Url {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: null,
        query: null,
        pathname: '/test%3FFtest',
        path: '/test%3FFtest',
        href: '/test%3FFtest',
        _raw: '/test%3FFtest' },
     params: { '0': 'test?Ftest' },
     query: {},
     res: [Circular],
     route: Route { path: '/*', stack: [Array], methods: [Object] } },
  locals: {},
```

