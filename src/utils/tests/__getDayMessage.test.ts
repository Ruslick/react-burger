import { getDayMessage } from ".."

describe('get day message', () => {
  test('yestedey', () => {
    let dateNow = new Date("2022-10-20T16:45:47.989Z")
    let pastDate = new Date("2022-10-20T16:46:39.371Z" )
    expect(getDayMessage(pastDate, dateNow)).toBe("Сегодня, 19:46")
  }) 
  test('2 day old', () => {
    let dateNow = new Date("2022-10-20T16:45:47.989Z")
    let pastDate = new Date("2022-10-19T16:46:39.371Z" )
    expect(getDayMessage(pastDate, dateNow)).toBe("Вчера, 19:46")
  }) 
  test('3 day ago', () => {
    let dateNow = new Date("2022-10-20T16:45:47.989Z")
    let pastDate = new Date("2022-10-18T16:46:39.371Z" )
    expect(getDayMessage(pastDate, dateNow)).toBe("2 дня назад, 19:46")
  }) 
  test('6 day ago', () => {
    let dateNow = new Date("2022-10-20T16:45:47.989Z")
    let pastDate = new Date("2022-10-14T16:46:39.371Z" )
    expect(getDayMessage(pastDate, dateNow)).toBe("6 дней назад, 19:46")
  }) 
  test('21 day ago', () => {
    let dateNow = new Date("2022-10-20T16:45:47.989Z")
    let pastDate = new Date("2022-09-29T16:46:39.371Z" )
    expect(getDayMessage(pastDate, dateNow)).toBe("21 день назад, 19:46")
  }) 
  test('math round call', () => {
    let dateNow = new Date("2022-10-20T16:45:47.989Z")
    let pastDate = new Date("2022-09-29T16:46:39.371Z" )
    const spyMathRound = jest.spyOn(Math, 'round')
    getDayMessage(pastDate, dateNow)
    expect(spyMathRound).toBeCalledTimes(1)
  }) 

})