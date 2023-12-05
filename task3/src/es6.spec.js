const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(
                core.fioToName('Иванов Иван Иванович'),
                'Иван Иванов'
            );
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();

            // TODO
            assert.strictEqual(!!dic, true);

            assert.strictEqual(dic.addWord('AAA', 'aaa'), undefined);
            assert.strictEqual(dic.addWord('BBB', 'bbb'), undefined);
            assert.strictEqual(dic.addWord('AAA', NaN), undefined);
            assert.strictEqual(dic.addWord(true, 'bbb'), undefined);
            assert.deepStrictEqual(dic.getAllWords(), ['AAA', 'BBB']);
            assert.deepStrictEqual(dic.getAllDescribes(), ['aaa', 'bbb']);

            dic.removeWord('BBB');
            dic.removeWord('100');
            dic.removeWord(100);
            assert.deepStrictEqual(dic.getAllWords(), ['AAA']);
            assert.deepStrictEqual(dic.getAllDescribes(), ['aaa']);

            dic.clear();
            assert.deepStrictEqual(dic.getAllWords(), []);
            assert.deepStrictEqual(dic.getAllDescribes(), []);

            dic.addWord();
            assert.deepStrictEqual(dic.getAllWords(), ['']);
            assert.deepStrictEqual(dic.getAllDescribes(), ['']);
        });
    });
});
