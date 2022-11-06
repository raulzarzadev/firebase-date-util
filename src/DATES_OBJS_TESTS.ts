import { Timestamp } from 'firebase/firestore';

const timestampDate = Timestamp.fromDate(new Date());

export const SIMPLE_OBJ = {
  obj: {
    nombre: 'Prueba ',
    date: new Date(),
    createdAt: 12312324432,
    startAt: '2022-06-12',
    format: new Date(),
  },
  expecting: (TIPO: any) => {
    return {
      nombre: expect.any(String),
      date: expect.any(TIPO),
      createdAt: expect.any(TIPO),
      startAt: expect.any(TIPO),
      format: expect.any(TIPO),
    };
  },
};

export const OBJ_ARRAYS = {
  obj: {
    name: 'Pedro',
    date: new Date(),
    fieldDate: '2022-06-12',
    birth: timestampDate,
    createdAt: null,
    posts: [
      {
        id: 1,
        updatedAt: undefined,
        createdBy: 'Jow Dea',
        createdAt: new Date(),
        startAt: 23423523423,
        finishAt: '2022-06-12',
      },
    ],
    memebers: ['234233', 34234, new Date()],
  },
  expecting: (TIPO: any) => {
    return {
      name: expect.any(String),
      date: expect.any(TIPO),
      fieldDate: expect.any(TIPO),
      birth: expect.any(TIPO),
      createdAt: null,
      posts: [
        {
          id: expect.any(Number),
          updatedAt: undefined,
          createdBy: expect.any(String),
          createdAt: expect.any(TIPO),
          startAt: expect.any(TIPO),
          finishAt: expect.any(TIPO),
        },
      ],
      memebers: [expect.any(String), expect.any(Number), expect.any(Date)],
    };
  },
};

export const OBJ_OBJECTS = {
  obj: {
    name: 'Pedro',
    date: new Date(),
    fieldDate: '2022-06-12',
    birth: timestampDate,
    dates: {
      createdBy: 'Lula',
      createdAt: new Date(),
      startAt: 23423523423,
      finishAt: '2022-06-12',
    },
  },
  expecting: (TIPO: any) => {
    return {
      name: expect.any(String),
      date: expect.any(TIPO),
      fieldDate: expect.any(TIPO),
      birth: expect.any(TIPO),
      dates: {
        createdBy: expect.any(String),
        createdAt: expect.any(TIPO),
        startAt: expect.any(TIPO),
        finishAt: expect.any(TIPO),
      },
    };
  },
};

const newDate = new Date();
const firebaseTimestamp = (date: Date = new Date()) => Timestamp.fromDate(date);

export const DEEP_OBJECT = {
  obj: {
    name: 'Pedro',
    date: newDate,
    fieldDate: '2022-06-12',
    visible: false,
    updatedAt: undefined,
    createdAt: null,
    birth: firebaseTimestamp(),
    custom_field: '23435',
    custom_field_2: '2022-06-12',
    defaultDateType: newDate, // should change to target always since option ignoreDefaultDateTypeField marked as false or undefined
    defaultTimestampType: firebaseTimestamp(), // should change to target always since option ignoreDefaultTimestampTypeField marked as false or undefined
    dates: {
      createdBy: 'Lula',
      createdAt: newDate,
      startAt: 23423523423,
      finishAt: '2022-06-12',
      fechas: {
        createdBy: 'Lula',
        createdAt: newDate,
        startAt: 23423523423,
        finishAt: '2022-06-12',
        posts: [
          {
            id: 1,
            createdBy: 'Jow Dea',
            createdAt: newDate,
            startAt: 23423523423,
            finishAt: '2022-06-12',
          },
        ],
      },
    },
  },
  expecting: (TIPO: any) => {
    return {
      name: expect.any(String),
      date: expect.any(TIPO),
      fieldDate: expect.any(TIPO),
      visible: false,
      updatedAt: undefined,
      createdAt: null,
      birth: expect.any(TIPO),
      custom_field: '23435',
      custom_field_2: '2022-06-12',
      defaultDateType: expect.any(TIPO),
      defaultTimestampType: expect.any(TIPO),
      dates: {
        createdBy: expect.any(String),
        createdAt: expect.any(TIPO),
        startAt: expect.any(TIPO),
        finishAt: expect.any(TIPO),
        fechas: {
          createdBy: expect.any(String),
          createdAt: expect.any(TIPO),
          startAt: expect.any(TIPO),
          finishAt: expect.any(TIPO),
          posts: [
            {
              id: expect.any(Number),
              createdBy: expect.any(String),
              createdAt: expect.any(TIPO),
              startAt: expect.any(TIPO),
              finishAt: expect.any(TIPO),
            },
          ],
        },
      },
    };
  },
  expectingNull: (TIPO: any) => {
    return {
      name: expect.any(String),
      date: expect.any(TIPO),
      fieldDate: expect.any(TIPO),
      visible: false,
      updatedAt: null,
      createdAt: null,
      birth: expect.any(TIPO),
      custom_field: '23435',
      custom_field_2: '2022-06-12',
      defaultDateType: expect.any(TIPO),
      defaultTimestampType: expect.any(TIPO),
      dates: {
        createdBy: expect.any(String),
        createdAt: expect.any(TIPO),
        startAt: expect.any(TIPO),
        finishAt: expect.any(TIPO),
        fechas: {
          createdBy: expect.any(String),
          createdAt: expect.any(TIPO),
          startAt: expect.any(TIPO),
          finishAt: expect.any(TIPO),
          posts: [
            {
              id: expect.any(Number),
              createdBy: expect.any(String),
              createdAt: expect.any(TIPO),
              startAt: expect.any(TIPO),
              finishAt: expect.any(TIPO),
            },
          ],
        },
      },
    };
  },
  expectingCustomFields: (TIPO: any) => {
    return {
      name: expect.any(String),
      date: expect.any(TIPO),
      fieldDate: expect.any(TIPO),
      visible: false,
      updatedAt: undefined,
      createdAt: null,
      birth: expect.any(TIPO),
      custom_field: expect.any(TIPO),
      custom_field_2: '2022-06-12',
      defaultDateType: expect.any(TIPO),
      defaultTimestampType: expect.any(TIPO),
      dates: {
        createdBy: expect.any(String),
        createdAt: expect.any(TIPO),
        startAt: expect.any(TIPO),
        finishAt: expect.any(TIPO),
        fechas: {
          createdBy: expect.any(String),
          createdAt: expect.any(TIPO),
          startAt: expect.any(TIPO),
          finishAt: expect.any(TIPO),
          posts: [
            {
              id: expect.any(Number),
              createdBy: expect.any(String),
              createdAt: expect.any(TIPO),
              startAt: expect.any(TIPO),
              finishAt: expect.any(TIPO),
            },
          ],
        },
      },
    };
  },
  expectingAvoidCustomFields: (TIPO: any) => {
    return {
      name: expect.any(String),
      date: expect.any(TIPO),
      fieldDate: '2022-06-12',
      visible: false,
      updatedAt: undefined,
      createdAt: null,
      birth: expect.any(TIPO),
      custom_field: '23435',
      custom_field_2: '2022-06-12',
      defaultDateType: expect.any(TIPO),
      defaultTimestampType: expect.any(TIPO),
      dates: {
        createdBy: expect.any(String),
        createdAt: expect.any(TIPO),
        startAt: expect.any(TIPO),
        finishAt: expect.any(TIPO),
        fechas: {
          createdBy: expect.any(String),
          createdAt: expect.any(TIPO),
          startAt: expect.any(TIPO),
          finishAt: expect.any(TIPO),
          posts: [
            {
              id: expect.any(Number),
              createdBy: expect.any(String),
              createdAt: expect.any(TIPO),
              startAt: expect.any(TIPO),
              finishAt: expect.any(TIPO),
            },
          ],
        },
      },
    };
  },
  expectingIgnoreDateTypes: (TIPO: any) => {
    return {
      name: expect.any(String),
      date: expect.any(TIPO),
      fieldDate: expect.any(TIPO),
      visible: false,
      updatedAt: undefined,
      createdAt: null,
      birth: expect.any(TIPO),
      custom_field: '23435',
      custom_field_2: '2022-06-12',
      defaultDateType: expect.any(Date),
      defaultTimestampType: expect.any(TIPO),
      dates: {
        createdBy: expect.any(String),
        createdAt: expect.any(TIPO),
        startAt: expect.any(TIPO),
        finishAt: expect.any(TIPO),
        fechas: {
          createdBy: expect.any(String),
          createdAt: expect.any(TIPO),
          startAt: expect.any(TIPO),
          finishAt: expect.any(TIPO),
          posts: [
            {
              id: expect.any(Number),
              createdBy: expect.any(String),
              createdAt: expect.any(TIPO),
              startAt: expect.any(TIPO),
              finishAt: expect.any(TIPO),
            },
          ],
        },
      },
    };
  },
  expectingIgnoreTimestampTypes: (TIPO: any) => {
    return {
      name: expect.any(String),
      date: expect.any(TIPO),
      fieldDate: expect.any(TIPO),
      visible: false,
      updatedAt: undefined,
      createdAt: null,
      birth: expect.any(TIPO),
      custom_field: '23435',
      custom_field_2: '2022-06-12',
      defaultDateType: expect.any(TIPO),
      defaultTimestampType: expect.any(Timestamp),
      dates: {
        createdBy: expect.any(String),
        createdAt: expect.any(TIPO),
        startAt: expect.any(TIPO),
        finishAt: expect.any(TIPO),
        fechas: {
          createdBy: expect.any(String),
          createdAt: expect.any(TIPO),
          startAt: expect.any(TIPO),
          finishAt: expect.any(TIPO),
          posts: [
            {
              id: expect.any(Number),
              createdBy: expect.any(String),
              createdAt: expect.any(TIPO),
              startAt: expect.any(TIPO),
              finishAt: expect.any(TIPO),
            },
          ],
        },
      },
    };
  },
};
