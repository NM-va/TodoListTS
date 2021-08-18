// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum( ...nums: Array<any>): number {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    const sum = nums.reduce((acc, el) => acc + el);
    return sum
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number,b: number,c: number): string {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    if (a  === b && a === c) {
        return "10"
    } else if ((a === b && a !== c) ||( b === c && b !== a) || (a === c && a !== b)) {
        return "01"
    } else if (a !== b && a !== c && b !== c) {
        return "11"
    } else {
        return "00"
    }
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number{
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    // let str = number + '';
    // let arr = str.split('');
    let arr = number.String().split();
    
    return arr.reduce((acc, item) => acc + item);
}


// 4. Функция принимает isEvenIndexSumGreater параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    
    let sumEven = 0;
    let sumOdd = 0;
    arr.forEach((item, index) => {
        if (index % 2 === 0) {
            sumEven += item
        } else {
            sumOdd += item;
        }
    })
    
    return sumEven > sumOdd;
}


// 5. Функция isSquareGreater принимает два параметра: площадь круга и
// площадь квадрата. Функция должна возвращать true если круг не будет выступать за пределы
// квадрата и false в противном случае. Центры фигур совпадают.

export function isSquareGreater(areaCr: number, areaSq: number): boolean {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let rad = Math.sqrt(areaCr/Math.PI);
    let sqr = Math.sqrt(areaSq)/2;
    return rad >= sqr;
}


// 6. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

// Д.З.:
export function getBanknoteList(amountOfMoney: number): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return [1]
}