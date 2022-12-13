// console.log('a'.charCodeAt(0)-96)

function high(x) {
    const wordArr = x.split(' ')
    let numArr = wordArr.map((elem) => {

        let letterSum = 0
        for (let v of elem) {
            letterSum += (v.charCodeAt(0) - 96)
        }
        return letterSum

    })
    const maxValue = Math.max(...numArr)
    const wordIndex = numArr.findIndex((elem) => elem === maxValue)
    return wordArr[wordIndex]
}

console.log(high('take me to semynak'))



// const createNumber = (a) => {
//     return function(b) {
//         return 2*b
//     }
// }
// const multTwo = createNumber(2)
// console.log(multTwo(5))
