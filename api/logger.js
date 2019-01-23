import debug from 'debug';

const logger = debug('coordinators');

const ConsoleLogger = {
	log: (message) => {
		logger(message);
	}
};
export default ConsoleLogger;
