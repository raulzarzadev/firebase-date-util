import { Timestamp } from 'firebase/firestore';
import { format as fnsFormat, formatDistanceToNowStrict } from 'date-fns';
import { es } from 'date-fns/locale';

type ToDate = Date | null;
type ToTimestamp = Timestamp | null;
type Target = 'timestamp' | 'number' | 'date' | 'fieldDate';

class Dates {
  static toTimestamp(date: unknown): ToTimestamp {
    const _date = this.toDate(date);

    if (_date) return Timestamp.fromDate(_date);

    console.error('invalid date');

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

    console.error('invalid date');
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
    console.error('invalid date');
    return null;
  }

  static format = (date: string | number | Date, stringFormat = 'dd/MM/yy'): string | null => {
    const _date = this.toDate(date);

    if (_date)
      return fnsFormat(new Date(_date.setMinutes(_date.getMinutes() + _date.getTimezoneOffset())), stringFormat, {
        locale: es,
      });

    console.error('invalid date');

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

    console.error('invalid date');

    return null;
  };

  static transformDateTo(date: string | number | Date, target: Target) {
    const _date = this.toDate(date);
    if (!_date) return null;
    const options = {
      fieldDate: () => this.format(_date, 'yyyy-MM-dd'),
      timestamp: () => Timestamp.fromDate(_date),
      date: () => _date,
      number: () => _date.getTime(),
    };
    return options[target];
  }

  static deepFormatObjectDates(object: object, target: Target = 'number', depth: number = 0) {
    const auxObj = { ...object };

    Object.keys(auxObj).forEach((key) => {
      const objProperty = object[key as keyof typeof object];
      if (this.DATE_FIELDS.includes(key)) {
        const _date = Dates.toDate(objProperty);
        /* console.log('target', target) */
        if (_date) return this.transformDateTo(_date, target);
      } else if (typeof objProperty === 'object') {
        this.deepFormatObjectDates(objProperty, target);
      } else if (Array.isArray(objProperty)) {
        console.log('array', Array.isArray(objProperty));
        // objProperty.map((item: object) => this.deepFormatObjectDates(item, target))
      }
    });

    return auxObj;
  }

  static DATE_FIELDS = [
    'birth',
    'date',
    'createdAt',
    'updatedAt',
    'finishAt',
    'startAt',
    'joinedAt',
    'registryDate',
    'publishEnds',
    'publishStart',
    'lastUpdate',
  ];
}

export { Dates };
