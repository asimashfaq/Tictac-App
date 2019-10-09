/* istanbul ignore next */
export const waitFor = (ms: any) => new Promise(r => setTimeout(r, ms))
/* istanbul ignore next */
export const asyncForEach = async (array: any, callback: any) => {
  // tslint:disable-next-line: no-increment-decrement
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
