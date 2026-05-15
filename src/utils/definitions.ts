// todo: use in index file...
export class DatabaseConfiguration {
    getLogLevel(): string {
        return Level.Error;
    }

    getLogCollection(): string {
        return Collections.Log;
    }
}

// ApplicationConfiguration //

const enum Collections { Log = 'logs'};
const enum Level { Info = 'info', Warn = 'warn', Error = 'error'};