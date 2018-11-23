import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';


describe('The javascript parser', () => {

    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            "[{\"Line\":\"\",\"Type\":\"\",\"Name\":\"\",\"Condition\":\"\",\"Value\":\"\"}]"
        );

    });

    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;')),
            "[{\"Line\":1,\"Type\":\"variable declaration\",\"Name\":\"a\",\"Condition\":\"\",\"Value\":\"1\"}]"
        );
    });

    it('is empty function without varibles correctly ', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(){}')),
            "[{\"Line\":1,\"Type\":\"function declaration\",\"Name\":\"binarySearch\",\"Condition\":\"\",\"Value\":\"\"}]"
        );
    });


    it('is empty function with variables correctly ', () => {
            assert.equal(
                JSON.stringify(parseCode('function binarySearch(X, V){}')),
                "[{\"Line\":1,\"Type\":\"function declaration\",\"Name\":\"binarySearch\",\"Condition\":\"\",\"Value\":\"\"}," +
                "{\"Line\":1,\"Type\":\"variable declaration\",\"Name\":\"X\",\"Condition\":\"\",\"Value\":\"\"}," +
                "{\"Line\":1,\"Type\":\"variable declaration\",\"Name\":\"V\",\"Condition\":\"\",\"Value\":\"\"}]"
            );
        });

        it('is parsing a simple variable declaration with no value correctly', () => {
            assert.equal(
                JSON.stringify(parseCode('let a;')),
                "[{\"Line\":1,\"Type\":\"variable declaration\",\"Name\":\"a\",\"Condition\":\"\",\"Value\":null}]"
            );
        });

            it('is parsing a simple assigment expression correctly', () => {
                assert.equal(
                    JSON.stringify(parseCode('let low;' +
                        'low=0;')),
                    "[{\"Line\":1,\"Type\":\"variable declaration\",\"Name\":\"low\",\"Condition\":\"\",\"Value\":null}," +
                    "{\"Line\":1,\"Type\":\"assignment expression\",\"Name\":\"low\",\"Condition\":\"\",\"Value\":\"0\"}]"
                );
            });

            it('is parsing a simple while statement with no value correctly', () => {
                assert.equal(
                    JSON.stringify(parseCode('while(true){}')),
                    "[{\"Line\":1,\"Type\":\"while statement\",\"Name\":\"\",\"Condition\":\"true\",\"Value\":\"\"}]"
                );
            });

            it('is parsing a simple while statement with binary expression in the condition and block statment with two lines correctly', () => {
                assert.equal(
                    JSON.stringify(parseCode('while(x<5){\n' +
                        'let low;\n' +
                        'low=0;\n' +
                        '}')),
                    "[{\"Line\":1,\"Type\":\"while statement\",\"Name\":\"\",\"Condition\":\"x < 5\",\"Value\":\"\"},"+
                    "{\"Line\":2,\"Type\":\"variable declaration\",\"Name\":\"low\",\"Condition\":\"\",\"Value\":null},"+
                    "{\"Line\":3,\"Type\":\"assignment expression\",\"Name\":\"low\",\"Condition\":\"\",\"Value\":\"0\"}]"
                );
            });

            it('is parsing a simple binary expression correctly', () => {
                assert.equal(
                    JSON.stringify(parseCode('low=i+5')),
                    "[{\"Line\":1,\"Type\":\"assignment expression\",\"Name\":\"low\",\"Condition\":\"\",\"Value\":\"i + 5\"}]"
                );
            });

            it('is parsing a complicated binary expression correctly', () => {
                assert.equal(
                    JSON.stringify(parseCode('low=(i + 5) * (i + 2)')),
                    "[{\"Line\":1,\"Type\":\"assignment expression\",\"Name\":\"low\",\"Condition\":\"\",\"Value\":\"(i + 5) * (i + 2)\"}]"
                );
            });

    it('is parsing a simple Computed Member Expression correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('low=V[5]+1;')),
            "[{\"Line\":1,\"Type\":\"assignment expression\",\"Name\":\"low\",\"Condition\":\"\",\"Value\":\"V[5] + 1\"}]"
        );
    });

    it('is parsing a complicate Computed Member Expression correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('low=V[i+2]+1;')),
            "[{\"Line\":1,\"Type\":\"assignment expression\",\"Name\":\"low\",\"Condition\":\"\",\"Value\":\"V[i + 2] + 1\"}]"
        );
    });

    it('is parsing a simple if statment correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('if(i==2){}')),
            "[{\"Line\":1,\"Type\":\"if statement\",\"Name\":\"\",\"Condition\":\"i == 2\",\"Value\":\"\"}]"
        );
    });

    it('is parsing a simple if statment with simple alternate correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('if(i==2){\n' +
                'let a=mid[5]+1;}\n' +
                'else\n' +
                'i=0;')),
            "[{\"Line\":1,\"Type\":\"if statement\",\"Name\":\"\",\"Condition\":\"i == 2\",\"Value\":\"\"}," +
            "{\"Line\":2,\"Type\":\"variable declaration\",\"Name\":\"a\",\"Condition\":\"\",\"Value\":\"mid[5] + 1\"}," +
            "{\"Line\":4,\"Type\":\"assignment expression\",\"Name\":\"i\",\"Condition\":\"\",\"Value\":\"0\"}]"
        );
    });



    it('is parsing a else if statment correctly', () => {
            assert.equal(
                JSON.stringify(parseCode('if(i==2){\n'+
                                             'let a=mid[5]+1;}\n'+
                                         'else if(i<5){\n'+
                                                    'i=0;}')),
                "[{\"Line\":1,\"Type\":\"if statement\",\"Name\":\"\",\"Condition\":\"i == 2\",\"Value\":\"\"},"+
                "{\"Line\":2,\"Type\":\"variable declaration\",\"Name\":\"a\",\"Condition\":\"\",\"Value\":\"mid[5] + 1\"},"+
                "{\"Line\":3,\"Type\":\"else if statement\",\"Name\":\"\",\"Condition\":\"i < 5\",\"Value\":\"\"}," +
                "{\"Line\":4,\"Type\":\"assignment expression\",\"Name\":\"i\",\"Condition\":\"\",\"Value\":\"0\"}]"
            );
    });

     it('is parsing a return statment correctly', () => {
                 assert.equal(
                     JSON.stringify(parseCode('function binarySearch(){\n' +
                         'if (X > V[mid])\n' +
                         '            low = mid + 1;\n' +
                         '        else\n' +
                         '            return mid;\n' +
                         '   }')),
                     "[{\"Line\":1,\"Type\":\"function declaration\",\"Name\":\"binarySearch\",\"Condition\":\"\",\"Value\":\"\"}," +
                     "{\"Line\":2,\"Type\":\"if statement\",\"Name\":\"\",\"Condition\":\"X > V[mid]\",\"Value\":\"\"}," +
                     "{\"Line\":3,\"Type\":\"assignment expression\",\"Name\":\"low\",\"Condition\":\"\",\"Value\":\"mid + 1\"}," +
                     "{\"Line\":5,\"Type\":\"return statement\",\"Name\":\"\",\"Condition\":\"\",\"Value\":\"mid\"}]"
                 );
             });

     it('is parsing a simple else if statment correctly', () => {
                     assert.equal(
                         JSON.stringify(parseCode('if(i==2){}\n'+
                             'else if(i<5){}')),
                         "[{\"Line\":1,\"Type\":\"if statement\",\"Name\":\"\",\"Condition\":\"i == 2\",\"Value\":\"\"},"+
                         "{\"Line\":2,\"Type\":\"else if statement\",\"Name\":\"\",\"Condition\":\"i < 5\",\"Value\":\"\"}]"
                     );
                 });
     it('is parsing a simple assignment correctly', () => {
                     assert.equal(
                         JSON.stringify(parseCode('let a=mid[5]+1;')),
                         "[{\"Line\":1,\"Type\":\"variable declaration\",\"Name\":\"a\",\"Condition\":\"\",\"Value\":\"mid[5] + 1\"}]"
                     );
                 });

    it('is parsing a simple assignment correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('i=0;')),
            "[{\"Line\":1,\"Type\":\"assignment expression\",\"Name\":\"i\",\"Condition\":\"\",\"Value\":\"0\"}]"
        );
    });

    it('is parsing a simple for correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('for(i=0; i<7;i++){}')),
            "[{\"Line\":1,\"Type\":\"for statement\",\"Name\":\"\",\"Condition\":\"i < 7\",\"Value\":\"\"}," +
            "{\"Line\":1,\"Type\":\"assignment expression\",\"Name\":\"i\",\"Condition\":\"\",\"Value\":\"0\"}," +
            "{\"Line\":1,\"Type\":\"update expression\",\"Name\":\"i\",\"Condition\":\"\",\"Value\":\"i++\"}]"
        );
    });

    it('is parsing a simple assignment correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('i=(5+4)*2;')),
            "[{\"Line\":1,\"Type\":\"assignment expression\",\"Name\":\"i\",\"Condition\":\"\",\"Value\":\"(5 + 4) * 2\"}]"
        );
    });
    it('is parsing a simple assignment correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('i=5+(4*2);')),
            "[{\"Line\":1,\"Type\":\"assignment expression\",\"Name\":\"i\",\"Condition\":\"\",\"Value\":\"5 + (4 * 2)\"}]"
        );
    });
    it('is parsing a simple for statment with body correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('for(i=0; i<7;i++){\n'+
    'i=(5+4)*2;}')),
            "[{\"Line\":1,\"Type\":\"for statement\",\"Name\":\"\",\"Condition\":\"i < 7\",\"Value\":\"\"}," +
            "{\"Line\":1,\"Type\":\"assignment expression\",\"Name\":\"i\",\"Condition\":\"\",\"Value\":\"0\"}," +
            "{\"Line\":1,\"Type\":\"update expression\",\"Name\":\"i\",\"Condition\":\"\",\"Value\":\"i++\"}," +
            "{\"Line\":2,\"Type\":\"assignment expression\",\"Name\":\"i\",\"Condition\":\"\",\"Value\":\"(5 + 4) * 2\"}]"
        );
    });
    it('is parsing a complicated assignment correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('i=(mid[4]+4)*mid[i+1];')),
            "[{\"Line\":1,\"Type\":\"assignment expression\",\"Name\":\"i\",\"Condition\":\"\",\"Value\":\"(mid[4] + 4) * mid[i + 1]\"}]"
        );
    });

    it('is parsing a expression statement correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let low;\n' +
                'low=0;')),
            "[{\"Line\":1,\"Type\":\"variable declaration\",\"Name\":\"low\",\"Condition\":\"\",\"Value\":null},"+
            "{\"Line\":2,\"Type\":\"assignment expression\",\"Name\":\"low\",\"Condition\":\"\",\"Value\":\"0\"}]"
        );
    });
    it('is parsing a expression statement correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let i=-1;')),
            "[{\"Line\":1,\"Type\":\"variable declaration\",\"Name\":\"i\",\"Condition\":\"\",\"Value\":\"-1\"}]"
        );
    });

    it('is parsing a if statement with logical expression correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('if(a>b && b<c){}')),
            "[{\"Line\":1,\"Type\":\"if statement\",\"Name\":\"\",\"Condition\":\"a > b and b < c\",\"Value\":\"\"}]"
        );
    });
    it('is parsing a if statement with logical expression correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('if(a>b || b<c){}')),
            "[{\"Line\":1,\"Type\":\"if statement\",\"Name\":\"\",\"Condition\":\"a > b or b < c\",\"Value\":\"\"}]"
        );
    });

    it('is parsing a do-while statement with logical expression correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('do{let i=-1}while(x<5)')),
            "[{\"Line\":1,\"Type\":\"Do-while statement\",\"Name\":\"\",\"Condition\":\"x < 5\",\"Value\":\"\"}," +
            "{\"Line\":1,\"Type\":\"variable declaration\",\"Name\":\"i\",\"Condition\":\"\",\"Value\":\"-1\"}]"
        );
    });



});
