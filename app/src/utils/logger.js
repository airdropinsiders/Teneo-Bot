  import { createLogger, format, transports } from 'winston';
  import a5_0x4b9f16 from 'fs';
  const {
    combine,
    timestamp,
    printf,
    colorize
  } = format;
  const customFormat = printf(({
    level: _0x4a9433,
    message: _0x4965ef,
    timestamp: _0x2bf42d
  }) => {
    return _0x2bf42d + " [" + _0x4a9433 + "]: " + _0x4965ef;
  });
  class Logger {
    constructor() {
      this.logger = createLogger({
        'level': "debug",
        'format': combine(timestamp({
          'format': "YYYY-MM-DD HH:mm:ss"
        }), colorize(), customFormat),
        'transports': [new transports.File({
          'filename': 'log/app.log'
        })],
        'exceptionHandlers': [new transports.File({
          'filename': 'log/app.log'
        })],
        'rejectionHandlers': [new transports.File({
          'filename': "log/app.log"
        })]
      });
    }
    ['info'](_0x12c4c0) {
      this.logger.info(_0x12c4c0);
    }
    ['warn'](_0xd8599d) {
      this.logger.warn(_0xd8599d);
    }
    ['error'](_0x2165ed) {
      this.logger.error(_0x2165ed);
    }
    ["debug"](_0x198c58) {
      this.logger.debug(_0x198c58);
    }
    ['setLevel'](_0x2bc1eb) {
      this.logger.level = _0x2bc1eb;
    }
    ['clear']() {
      a5_0x4b9f16.truncate('log/app.log', 0x0, _0x358e8f => {
        if (_0x358e8f) {
          this.logger.error("Failed to clear the log file: " + _0x358e8f.message);
        } else {
          this.logger.info("Log file cleared");
        }
      });
    }
  }
  export default new Logger();