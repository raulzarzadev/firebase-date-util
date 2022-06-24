import { Timestamp } from 'firebase/firestore';
import { format as fnsFormat, formatDistanceToNowStrict } from 'date-fns';
import { es, ta } from 'date-fns/locale';

type ToDate = Date | null;
type ToTimestamp = Timestamp | null;
type Target = 'timestamp' | 'number' | 'date' | 'fieldDate';

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

  static toDate = (date: unknown): any => {
    if (date instanceof Date) {
      return date;
      // @ts-ignore
    } else if (date?.toDate) {
      // @ts-ignore
      return date.toDate();
    } else if (typeof date === 'number') {
      return new Date(date);
    } else if (typeof date === 'string') {
      const aux = new Date(date);
      if (isNaN(aux.getTime())) {
        return date;
      } else {
        return aux;
      }
    }
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

  static fromNow = (date: string | number | Date): string | null => {
    const _date = this.toDate(date);

    if (_date)
      return formatDistanceToNowStrict(_date, {
        locale: es,
        roundingMethod: 'floor',
        addSuffix: true,
      });

    this.errorLog('fromNow', 'invalid date', date);

    return null;
  };

  static transformDateTo(date: string | number | Date | Timestamp, target: Target): string | Date | number | Timestamp {
    const _date = this.toDate(date);

    const options = {
      fieldDate: (): string => this.format(_date, 'yyyy-MM-dd'),
      timestamp: (): Timestamp => Timestamp.fromDate(_date),
      date: (): Date => _date,
      number: (): number => _date.getTime(),
    };

    return options[target]();
  }

  static formatObjectDates(object: object, target: Target) {
    const auxObj = { ...object };
    Object.keys(auxObj).forEach((key) => {
      const objProperty: any = auxObj[key as keyof typeof object];
      if (this.DATE_FIELDS.includes(key)) {
        // @ts-ignore
        auxObj[key] = this.transformDateTo(objProperty, target);
      } else if (objProperty instanceof Date) {
        // @ts-ignore
        auxObj[key] = this.transformDateTo(objProperty, target);
      } else if (objProperty instanceof Timestamp) {
        // @ts-ignore
        auxObj[key] = this.transformDateTo(objProperty, target);
      } else {
        // @ts-ignore
        auxObj[key] = object[key];
      }
    });
    return auxObj;
  }

  static isLiteralObject(a: any) {
    return !!a && a.constructor === Object;
  }

  static formatComplexObjectDates(object: object, target: Target) {
    const auxObj = { ...this.formatObjectDates(object, target) };

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        // @ts-ignore
        const element = object[key];
        if (Array.isArray(element)) {
          // @ts-ignore
          auxObj[key] = element.map((item) => this.formatComplexObjectDates(item, target));
        } else if (this.isLiteralObject(element)) {
          // @ts-ignore
          auxObj[key] = this.formatComplexObjectDates(element, target);
        }
      }
    }
    return auxObj;
  }

  static deepFormatObjectDates(object: object, target: Target = 'number', depth: number = 0): object {
    const auxObj = { ...this.formatObjectDates(object, target) };
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        // @ts-ignore
        const element = object[key];
        if (Array.isArray(element)) {
          // @ts-ignore
          auxObj[key] = element.map((item) => this.formatComplexObjectDates(item, target));
        } else if (this.isLiteralObject(element)) {
          // @ts-ignore
          auxObj[key] = this.formatComplexObjectDates(element, target);
        }
      }
    }
    return auxObj;
  }

  static DATE_FIELDS = [
    'birth',
    'date',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'finishAt',
    'startAt',
    'joinedAt',
    'registryDate',
    'publishEnds',
    'publishStart',
    'lastUpdate',
    'fieldDate',
  ];
}

export { Dates };
