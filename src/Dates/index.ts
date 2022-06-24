import { Timestamp } from 'firebase/firestore';
import { format as fnsFormat, formatDistanceToNowStrict } from 'date-fns';
import { es } from 'date-fns/locale';

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

  static toDate = (date: unknown): ToDate => {
    if (!date) return null;

    if (date instanceof Date) return date;

    if (date instanceof Timestamp) return date.toDate();

    if (typeof date === 'number') return new Date(date);

    if (typeof date === 'string') {
      const aux = new Date(date);
      if (isNaN(aux.getTime())) {
        return null;
      } else {
        return aux;
      }
    }

    this.errorLog('toDate', 'invalid date', date);

    return null;
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

  static format = (date: string | number | Date, stringFormat = 'dd/MM/yy'): string | null => {
    const _date = this.toDate(date);

    if (_date)
      return fnsFormat(new Date(_date.setMinutes(_date.getMinutes() + _date.getTimezoneOffset())), stringFormat, {
        locale: es,
      });

    this.errorLog('format', 'invalid date', date);
    return null;
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

  static transformDateTo(
    date: string | number | Date | unknown,
    target: Target,
  ): string | Date | number | Timestamp | null {
    
    const _date = this.toDate(date);
    
    if (_date) {
      const options = {
        fieldDate: (): string | null => this.format(_date, 'yyyy-MM-dd'),
        timestamp: (): Timestamp => Timestamp.fromDate(_date),
        date: (): Date => _date,
        number: (): number => _date.getTime(),
      };

      return options[target]();
    } else {
      this.errorLog('tranformDateTo', 'invalid date', date);
      return null;
    }
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
        auxObj[key] = this.transformDateTo(objProperty, target)
      } else if (objProperty instanceof Timestamp) {
        // @ts-ignore
        auxObj[key] = this.transformDateTo(objProperty, target)

      }
    });
    return auxObj;
  }
  
  static formatComplexObjectDates(object: object, target: Target) {
    
    const auxObj = this.formatObjectDates(object, target) 
    console.log(auxObj)

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(auxObj, key)) {
        // @ts-ignore
        const element = auxObj[key];
        if (Array.isArray(element)) {
          // @ts-ignore
          auxObj[key] = element.map((item) => this.formatComplexObjectDates(item, target));
        } else if (typeof element === 'object') {
          // @ts-ignore
          auxObj[key]= this.formatObjectDates(element, target)
          // @ts-ignore
         //  auxObj[key] = this.formatComplexObjectDates(element, target)
         
        }

      }
    }
   //  console.log(auxObj)
    return auxObj
  }

  static deepFormatObjectDates(object: object, target: Target = 'number', depth: number = 0): object {
    const auxObj = { ...object };

    Object.keys(auxObj).forEach((key) => {
      const objProperty: any = auxObj[key as keyof typeof object];
      // console.log(objProperty)
      // @ts-ignore
      if (objProperty instanceof Date) auxObj[key] = this.transformDateTo(objProperty, target)
      if (this.DATE_FIELDS.includes(key)) {
        // @ts-ignore
        auxObj[key] = this.transformDateTo(objProperty, target);
      } else if (Array.isArray(objProperty)) {
        // @ts-ignore
        auxObj[key] = objProperty.map((item) => this.deepFormatObjectDates(item, target));
      } else if (typeof objProperty === 'object') {
        // @ts-ignore
        auxObj[key] = this.deepFormatObjectDates(objProperty, target);
      }
      // this.errorLog('deepFormatObject', 'invalid date', key, objProperty)
    });
    // console.log(auxObj)
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
