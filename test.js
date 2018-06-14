'use strict';

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _createTestServer = require('create-test-server');

var _createTestServer2 = _interopRequireDefault(_createTestServer);

var _pify = require('pify');

var _pify2 = _interopRequireDefault(_pify);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var server = void 0;

_ava2.default.before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	return regeneratorRuntime.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return (0, _createTestServer2.default)();

				case 2:
					server = _context.sent;


					server.get('/', function (req, res) {
						res.send('');
					});

				case 4:
				case 'end':
					return _context.stop();
			}
		}
	}, _callee, undefined);
})));

(0, _ava2.default)(function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(t) {
		var response, toStream;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return (0, _pify2.default)(_http2.default.get, { errorFirst: false })(server.url);

					case 2:
						response = _context2.sent;

						response.unicorn = '🦄';
						response.getContext = function () {
							return this;
						};

						toStream = new _stream2.default.PassThrough();

						(0, _2.default)(response, toStream);

						t.is(toStream.statusCode, 200);
						t.is(toStream.unicorn, '🦄');
						t.is(toStream.getContext(), response.getContext());

					case 10:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function (_x) {
		return _ref2.apply(this, arguments);
	};
}());
