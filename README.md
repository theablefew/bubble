ⓑⓤⓑⓑⓛⓔ
======

A library for transforming data structures into other data structures. Make data portable. 

#### Examples

Let's assume that we have a data set that looks like this:
```javascript
var results = [{time: "2013-04-17T14:50:59.840Z", data: {browser:'Chrome', os: "Windows", browser_version: '20' }}
              ,{time: "2013-04-18T14:50:59.840Z", data: {browser:'Chrome', os: "Windows", browser_version: '22' }}
              ,{time: "2013-04-17T14:50:59.840Z", data: {browser:'Safari', os: "Mac", browser_version: '6' }}];
```

And we want to transform that into a nested array. We want time, browser and os:
```javascript
var nestedArrayMap = oO.mappable(function(){ return new Array(3); })
  .at(function(d,m) { d[0] = m; })
  .at(function(d,m) { d[1] = m; })
  .at(function(d,m) { d[2] = m; });
                       
var transformedData = oO().data(results)
  .pull(function(d) { return d.time; })
  .pull(function(d) { return d.data.browser; })
  .pull(function(d) { return d.data.os; })
  .as(nestedArrayMap);
  

```

Now, `transformedData` looks like this:

```javascript
   [["2013-04-17T14:50:59.840Z","Chrome","Windows"],
    ["2013-04-18T14:50:59.840Z","Chrome","Windows"],
    ["2013-04-17T14:50:59.840Z","Safari","Mac"]]
```

We can easily format the data during the transform, as well! So let's make our time value more readable. 

```javascript
var transformedData = oO().data(results)
  .pull(function(d) { return new Date(d.time).toUTCString(); })
  .pull(function(d) { return d.data.browser; })
  .pull(function(d) { return d.data.os; })
  .as(nestedArrayMap);
  
transformedData[0][0] // Wed, 17 Apr 2013 14:50:59 GMT
```
