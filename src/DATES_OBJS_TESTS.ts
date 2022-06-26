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



export const DEEP_OBJECT = {
  obj: {
    name: 'Pedro',
    date: new Date(),
    fieldDate: '2022-06-12',
    visible: false,
    updatedAt: undefined,
    createdAt: null,
    fecha: Timestamp.now(),
    birth: Timestamp.fromDate(new Date()),
    dates: {
      createdBy: 'Lula',
      createdAt: new Date(),
      startAt: 23423523423,
      finishAt: '2022-06-12',
      fechas: {
        createdBy: 'Lula',
        createdAt: new Date(),
        startAt: 23423523423,
        finishAt: '2022-06-12',
        posts: [
          {
            id: 1,
            createdBy: 'Jow Dea',
            createdAt: new Date(),
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
      fecha: expect.any(TIPO),
      birth: expect.any(TIPO),
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
  expectingNull: function (TIPO: any) {

    return {
      name: expect.any(String),
      date: expect.any(TIPO),
      fieldDate: expect.any(TIPO),
      visible: false,
      updatedAt: null,
      createdAt: null,
      fecha: expect.any(TIPO),
      birth: expect.any(TIPO),
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
  }
};
