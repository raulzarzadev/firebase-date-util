import { TimestampUtil } from '../index'

test('online test', () => {
    expect(TimestampUtil.onlineTest()).toBe('is online')
})