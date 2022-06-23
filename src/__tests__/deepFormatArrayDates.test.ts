import { Timestamp } from "firebase/firestore"
import { Dates } from "../Dates"

const obj = {
    name: 'Pedro',
    date: new Date(),
    fieldDate: '2022-06-12',

    posts: [
        {
            id: 1,
            createdBy: 'Jow Dea',
            createdAt: new Date(),
            startAt: 23423523423,
            finishAt: '2022-06-12',

        }
    ]
}

const expecting = (TIPO: any) => {
    return {
        name: expect.any(String),
        date: expect.any(TIPO),
        fieldDate: expect.any(TIPO),


        posts: [
            {
                id: expect.any(Number),
                createdBy: expect.any(String),
                createdAt: expect.any(TIPO),
                startAt: expect.any(TIPO),
                finishAt: expect.any(TIPO),


            }
        ]
    }
}

test('deep  format array dates to number', () => {

    expect(Dates.deepFormatObjectDates(obj, 'number')).toStrictEqual(expecting(Number))
})

test('deep format dates array to timestamp', () => {
    expect(Dates.deepFormatObjectDates(obj, 'timestamp')).toStrictEqual(expecting(Timestamp))
})

/*  dates: {
             startAt: new Date(),
             modified: {
                 updateAt: new Date(),
                 deletedAt: 'junio 1999'
             },
             posts: [
                 {
                     id: 1,
                     createdAt: new Date()
                 },
                 {
                     id: 2,
                     updatedAt: new Date()
                 }
             ]
 
         } */

/* 
 dates: {
            startAt: expect.any(Number),
          /*  
           modified: {
                updateAt: expect.any(Number),
                deletedAt: expect.any(String)
            },
            posts: [
                {
                    id: 1,
                    createdAt: expect.any(Number)
                },
                {
                    id: 2,
                    updatedAt: expect.any(Number)
                }
            ] 
            
        }
        */