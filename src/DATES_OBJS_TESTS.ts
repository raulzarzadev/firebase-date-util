import { Timestamp } from 'firebase/firestore';

const timestampDate = Timestamp.fromDate(new Date());

export const SIMPLE_OBJ = {
  obj: {
    nombre: 'Prueba ',
    date: new Date(),
    createdAt: 12312324432,
    startAt: '2022-06-12',
  },
  expecting: (TIPO: any) => {
    return {
      nombre: expect.any(String),
      date: expect.any(TIPO),
      createdAt: expect.any(TIPO),
      startAt: expect.any(TIPO),
    };
  },
};

export const OBJ_ARRAYS = {
  obj: {
    name: 'Pedro',
    date: new Date(),
    fieldDate: '2022-06-12',
    birth: timestampDate,

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
  expecting: (TIPO: any) => {
    return {
      name: expect.any(String),
      date: expect.any(TIPO),
      fieldDate: expect.any(TIPO),
      birth: expect.any(TIPO),
      posts: [
        {
          id: expect.any(Number),
          createdBy: expect.any(String),
          createdAt: expect.any(TIPO),
          startAt: expect.any(TIPO),
          finishAt: expect.any(TIPO),
        },
      ],
    };
  },
};

export const OBJ_OBJECTS = {
  obj: {
    name: 'Pedro',
    date: new Date(),
    fieldDate: '2022-06-12',
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
