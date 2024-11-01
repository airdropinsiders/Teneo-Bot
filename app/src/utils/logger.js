  import { createLogger, format, transports } from 'winston';
  import a5_0x2888cd from 'fs';
  const {
    combine,
    timestamp,
    printf,
    colorize
  } = format;
  const customFormat = printf(({
    level: _0x3cb676,
    message: _0x46ebcf,
    timestamp: _0xc0d056
  }) => {
    return _0xc0d056 + " [" + _0x3cb676 + "]: " + _0x46ebcf;
  });
  class Logger {
    constructor() {
      this.logger = createLogger({
        'level': 'debug',
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
          'filename': 'log/app.log'
        })]
      });
    }
    ['info'](_0x5d3b34) {
      this.logger.info(_0x5d3b34);
    }
    ['warn'](_0x5bf208) {
      this.logger.warn(_0x5bf208);
    }
    ['error'](_0xb148dd) {
      this.logger.error(_0xb148dd);
    }
    ['debug'](_0x307e17) {
      this.logger.debug(_0x307e17);
    }
    ['setLevel'](_0x66f619) {
      this.logger.level = _0x66f619;
    }
    ['clear']() {
      a5_0x2888cd.truncate('log/app.log', 0x0, _0x5d0980 => {
        if (_0x5d0980) {
          this.logger.error("Failed to clear the log file: " + _0x5d0980.message);
        } else {
          this.logger.info("Log file cleared");
        }
      });
    }
  }
  export default new Logger();