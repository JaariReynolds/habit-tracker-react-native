export class MidnightDate extends Date {
  constructor(...args: any[]) {
    super();
    if (args.length === 1) {
      if (args[0] instanceof Date) {
        super(args[0].getTime());
      } else {
        super(args[0]);
      }
    }
    if (args.length === 3) {
      (Date.prototype as any).setUTCFullYear.apply(this, args);
    }
    this.setHours(0, 0, 0, 0);
  }
}
