function oO() {
  var _data;
  var callbacks = [];

  function e() {}

  e.data = function(_) {
    _data = _;
    return e;
  }

  e.pull = function(_) {
    callbacks.push(_);
    return e;
  }

  e.as = function(mappable) {
    var transform = [];
    for(var i = 0; i < _data.length; i++) {
      var c = mappable.copy();
      for( k = 0; k < callbacks.length; k++) {
        var value = callbacks[ k].call(this, _data[ i]);
        console.log(value);
        c.assign(k,value);
      }
      transform.push(c.data());
    }
    return transform;
  }

  return e;
}


/* 
 *  Mappable
 */

oO.mappable = function(_,c) {
  var _data      = _,
      _callbacks = c || [];

  function e() {}

  e.at = function(_) {
    _callbacks.push(_);
    return e;
  };

  e.assign = function(k,v) {
    console.log(_callbacks[ k])
    _callbacks[ k].call(this,_data, v);
  };

  e.data = function() {
    return _data;
  };

  e.copy = function() {
    return oO.mappable(_data(), _callbacks);
  }

  return e;
}
