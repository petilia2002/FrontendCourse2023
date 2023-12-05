// Напишите функцию, которая проверяет, является ли число целым, используя побитовые операторы
function isInteger(n) {
    return (n | 0) === n;
}

// Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    const evenNumbers = [];
    for (let i = 2; i <= 20; i += 2) {
        evenNumbers.push(i);
    }
    return evenNumbers;
}

// Напишите функцию, считающую сумму чисел до заданного, используя цикл
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Напишите функцию, считающую сумму чисел до заданного, используя рекурсию
function recSumTo(n) {
    if (n === 1) {
        return n;
    }
    return n + recSumTo(n - 1);
}

// Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    if (n < 1) {
        return false;
    }

    while (n % 2 === 0) {
        n /= 2;
    }
    return n === 1;
}

// Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    if (n <= 2) {
        return 1;
    }
    let prev = 1,
        cur = 1,
        next = 0;
    while (n > 2) {
        next = prev + cur;
        prev = cur;
        cur = next;
        n -= 1;
    }
    return next;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    return (operand) => {
        if (operatorFn) {
            initialValue = operatorFn(initialValue, operand);
        }
        return initialValue;
    };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    let current = start;
    return () => {
        current = start;
        start += step;
        return current;
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if (
        typeof firstObject === 'object' &&
        typeof secondObject === 'object' &&
        firstObject !== null &&
        secondObject !== null
    ) {
        const keysOfFirstObject = Object.keys(firstObject);
        const keysOfSecondObject = Object.keys(secondObject);

        if (keysOfFirstObject.length !== keysOfSecondObject.length) {
            return false;
        }

        for (let key of keysOfFirstObject) {
            if (key in secondObject) {
                if (!deepEqual(firstObject[key], secondObject[key])) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    } else {
        if (firstObject === secondObject) {
            return true;
        } else {
            if (
                typeof firstObject === 'number' &&
                typeof secondObject === 'number'
            ) {
                if (isNaN(firstObject) && isNaN(secondObject)) {
                    return true;
                }
            }
            return false;
        }
    }
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
