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

    static transformDateTo(date: string | number | Date | unknown, target: Target): string | Date | number | Timestamp | null {

        const _date = this.toDate(date);

        if (!_date) return null;
        const options = {
            fieldDate: (): string | null => this.format(_date, 'yyyy-MM-dd'),
            timestamp: (): Timestamp => Timestamp.fromDate(_date),
            date: (): Date => _date,
            number: (): number => _date.getTime(),
        };

        return options[target]();

    }


    static formatObjectDates(object: object, target: Target) {
        let auxObj = { ...object }
        Object.keys(auxObj).forEach(key => {
            let objProperty: any = auxObj[key as keyof typeof object]
            if (this.DATE_FIELDS.includes(key)) {
                // @ts-ignore
                auxObj[key] = this.transformDateTo(objProperty, target)
            }
        })
        return auxObj
    }


    static deepFormatObjectDates(object: object, target: Target = 'number', depth: number = 0): object {
        let auxObj = { ...object }

      
         Object.keys(auxObj).forEach(key => {
             let objProperty: any = auxObj[key as keyof typeof object]
             // console.log(objProperty)
             if (this.DATE_FIELDS.includes(key)) {
                 // @ts-ignore
                 auxObj[key] = this.transformDateTo(objProperty, target)
             } else if (Array.isArray(objProperty)) {
                 // @ts-ignore
                 auxObj[key] = objProperty.map(item => this.deepFormatObjectDates(item, target))
             } 
         })
         console.log(auxObj)
        return auxObj
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
        'fieldDate'
    ];
}

export { Dates };
