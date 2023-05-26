import {createLogger, Logger} from 'vite';

// export const MyTest = () => {

export const logger: Logger = createLogger();
const loggerWarn = logger.warn;
    logger.clearScreen('info')

logger.warn = (msg, options) => {
  // Ignore empty CSS files warning

  if (msg.includes('vite:css') && msg.includes(' is empty')) return;
  loggerWarn(msg, options);
};

// }
