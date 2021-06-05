var exec = require('child_process').exec
  , path = require('path')
  , uuid = require('uuid-v4')
;

// デフォルトパラメタ
var DefaultOptions = {
	openjtalk_bin : 'c:\\open_jtalk\\bin\\jsay.exe',
	htsvoice      : 'mei_normal'
};

// OpenJTalk で wav ファイルを生成するクラス
var OpenJTalk = function(args) {
	var args = args || {};
	var options = DefaultOptions;
	for (var key in args) {
		options[key] = args[key];
	}
	for (var key in options) {
		this[key] = options[key];
	}
};

OpenJTalk.prototype = {
	// exec から open_jtalk を実行して wav ファイルを作る
	_makeWav : function (str, pitch, callback) {
		var wavFileName = uuid() + '.wav';

        var cmd = `${this.openjtalk_bin} -v ${this.htsvoice} -o ${wavFileName} ${str}`
		exec(cmd, function(err, stdout, stderr) {
			var result = {
				stdout : stdout,
				stderr : stderr,
				wav    : wavFileName
			};
			if (callback) callback(err, result);
		});
	}
};

module.exports = OpenJTalk;
