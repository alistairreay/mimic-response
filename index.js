'use strict';

// We define these manually to ensure they're always copied
// even if they would move up the prototype chain
// https://nodejs.org/api/http.html#http_class_http_incomingmessage

var knownProps = ['destroy', 'setTimeout', 'socket', 'headers', 'trailers', 'rawHeaders', 'statusCode', 'httpVersion', 'httpVersionMinor', 'httpVersionMajor', 'rawTrailers', 'statusMessage'];

module.exports = function (fromStream, toStream) {
	var toProps = Object.keys(toStream);
	var fromProps = new Set(Object.keys(fromStream).concat(knownProps));

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = fromProps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var prop = _step.value;

			// Don't overwrite existing properties
			if (toProps.indexOf(prop) !== -1) {
				continue;
			}

			toStream[prop] = typeof fromStream[prop] === 'function' ? fromStream[prop].bind(fromStream) : fromStream[prop];
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
};
