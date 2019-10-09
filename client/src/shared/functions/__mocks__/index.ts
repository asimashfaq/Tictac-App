// export const waitFor = (ms: any) =>  console.log('000')
export const waitFor = (ms: any) =>
  new Promise<any>(r => {
    r()
  })
export const asyncForEach = async (array: any, callback: any) => {
  // tslint:disable-next-line: no-increment-decrement
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
