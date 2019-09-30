export const waitFor = (ms: any) => new Promise(r => setTimeout(r, ms))
export const asyncForEach = async (array: any, callback: any) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
