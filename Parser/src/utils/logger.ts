export enum LogLevel {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export class Logger {
  private static getIcon(level: LogLevel): string {
    const icons = {
      [LogLevel.INFO]: '📄',
      [LogLevel.SUCCESS]: '✅',
      [LogLevel.WARNING]: '⚠️',
      [LogLevel.ERROR]: '❌'
    };
    return icons[level];
  }

  static log(message: string, level: LogLevel = LogLevel.INFO): void {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`${this.getIcon(level)} ${timestamp} - ${message}`);
  }

  static info(message: string): void {
    this.log(message, LogLevel.INFO);
  }

  static success(message: string): void {
    this.log(message, LogLevel.SUCCESS);
  }

  static warning(message: string): void {
    this.log(message, LogLevel.WARNING);
  }

  static error(message: string): void {
    this.log(message, LogLevel.ERROR);
  }

  static section(title: string): void {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`  ${title}`);
    console.log(`${'='.repeat(50)}`);
  }
}