import { format as fnsFormat, formatDistanceToNowStrict, isValid } from 'date-fns';
import { es, ta } from 'date-fns/locale';
import { Timestamp } from 'firebase/firestore';
import ARRAY_DATES from '../DEFAULT_FIELDS';

type ToDate = Date | null;
type ToTimestamp = Timestamp | null;
type Target = 'timestamp' | 'number' | 'date' | 'fieldDate';
interface TransformDateOptions {
  avoidUndefined?: boolean;
  includeFields?: string[];
  avoidFields?: string[];
  ignoreDefaultDateTypeField?: boolean;
  ignoreDefaultTimestampTypeField?: boolean;
}
class Dates {
  static errorLog(functionName: string, message: string, ...rest: unknown[]) {
    console.error({ message, functionName, ...rest });
  }

  static toTimestamp(date: unknown): ToTimestamp {
    const _date = this.toDate(date);

    if (_date) return Timestamp.fromDate(_date);

    this.errorLog('toTimestamp', 'invalid date', date);

    return null;
  }

  static toDate = (date: unknown) => {
    const typeOf = (element: any) => {
      const isLiteralObject = (a: any) => {
        return !!a && a.constructor === Object;
      };
      if (element === null) return 'null';
      if (element === undefined) return 'undefined';
      if (element?.toDate) return 'timestamp';
      if (element instanceof Timestamp) return 'timestamp';
      if (Array.isArray(element)) return 'array';
      if (isLiteralObject(element)) return 'literalObject';
      if (typeof element === 'number') return 'number';
      if (typeof element === 'string') return 'string';
      if (typeof element === 'function') return 'function';
      if (typeof element === 'symbol') return 'symbol';
      if (element instanceof Date) return 'date';
      if (typeof element === 'object') return 'object';
      return 'undefined';
    };

    const result = {
      date: () => date,
      // @ts-ignore
      timestamp: () => date?.toDate(),
      // @ts-ignore
      number: () => new Date(date),
      // @ts-ignore
      string: () => (new Date(date)?.getTime() ? new Date(date) : date),
      null: () => date,
      array: () => date,
      literalObject: () => date,
      function: () => date,
      symbol: () => date,
      object: () => date,
      undefined: () => date,
    };

    return result[typeOf(date)]();
  };

  static toMiliseconds(date: any) {
    const _date = this.toDate(date);
    if (_date) return _date.getTime();
    console.error('invalid date');
    return null;
  }

  static toFieldDate(date: any): string | null {
    const _date = this.toDate(date);
    if (_date) return this.format(_date, 'yyyy-MM-dd');
    this.errorLog('toFieldDate', 'invalid date', date);

    return null;
  }

  static format = (date: string | number | Date, stringFormat = 'dd/MM/yy'): string => {
    const _date = this.toDate(date);

    if (_date)
      return fnsFormat(new Date(_date.setMinutes(_date.getMinutes() + _date.getTimezoneOffset())), stringFormat, {
        locale: es,
      });

    this.errorLog('format', 'invalid date', date);
    return 'isNaD';
  };

  static fromNow = (date?: string | number | Date): string => {
    if (date && isValid(date))
      return formatDistanceToNowStrict(new Date(date), {
        locale: es,
        roundingMethod: 'floor',
        addSuffix: true,
      });

    return 'isNaD';
  };

  static transformDateTo(
    date: string | number | Date | Timestamp,
    target: Target,
    options: TransformDateOptions = { avoidUndefined: false },
  ) {
    const _date = this.toDate(date);

    if (_date) {
      const result = {
        fieldDate: (d: Date): string => this.format(d, 'yyyy-MM-dd'),
        timestamp: (d: Date): Timestamp => Timestamp.fromDate(d),
        date: (d: Date): Date => d,
        number: (d: Date): number => d.getTime(),
      };

      return result[target](_date);
    } else {
      return options.avoidUndefined ? null : _date;
    }
  }

  static formatObjectDates(object: object, target: Target, options?: TransformDateOptions) {
    const auxObj = { ...object };
    const customFields = options?.includeFields || [];
    const ignoreDefaultDateTypeField = !!options?.ignoreDefaultDateTypeField;
    const ignoreDefaultTimestampTypeField = !!options?.ignoreDefaultTimestampTypeField;
    /**
     * This function should return the same object , transforming the date fields specificated in FIELDS in the target format.
     * also will find and change the dates formats Date and Timestamp(firebase) and transform to the target format
     */
    Object.keys(auxObj).forEach((key) => {
      const objProperty: any = auxObj[key as keyof typeof object];
      const FIELDS = [...this.DATE_FIELDS, ...customFields].filter((field) => !options?.avoidFields?.includes(field));

      if (FIELDS.includes(key)) {
        // @ts-ignore
        auxObj[key] = this.transformDateTo(objProperty, target, options);
      } else if (objProperty instanceof Date && !ignoreDefaultDateTypeField) {
        // TODO configure allow or reject transform if instance of Date
        // @ts-ignore
        auxObj[key] = this.transformDateTo(objProperty, target, options);
      } else if (objProperty instanceof Timestamp && !ignoreDefaultTimestampTypeField) {
        // TODO configure allow or reject transform if instance of  Timestamp
        // @ts-ignore
        auxObj[key] = this.transformDateTo(objProperty, target, options);
      } else {
        // If field does´t match any below options return de original value
        // @ts-ignore
        auxObj[key] = object[key];
      }
    });

    return auxObj;
  }

  static isLiteralObject(a: any) {
    return !!a && a.constructor === Object;
  }

  static formatComplexObjectDates(object: object, target: Target, options?: TransformDateOptions) {
    return this.deepFormatObjectDates(object, target, options);
  }

  static deepFormatObjectDates(object: object, target: Target = 'number', options?: TransformDateOptions): object {
    const auxObj = { ...this.formatObjectDates(object, target, options) };

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        // @ts-ignore
        const element = object[key];
        if (Array.isArray(element)) {
          // @ts-ignore
          auxObj[key] = element.map((item) =>
            this.isLiteralObject(item) ? this.deepFormatObjectDates(item, target, options) : item,
          );
        } else if (this.isLiteralObject(element)) {
          // @ts-ignore
          auxObj[key] = this.deepFormatObjectDates(element, target, options);
        }
      }
    }
    // console.log(auxObj)
    return auxObj;
  }

  static DATE_FIELDS = ARRAY_DATES;
}

export { Dates };
