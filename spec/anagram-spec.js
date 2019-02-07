var isAnagram = require('../anagram');

//criando Matchers personalizados 
// verifica se o numero e 2.
var myMatchers = {
    toBe2: function (util, custonEqualityTesters) {
        return {
            compare: function (actual,expected) {
                var result = {};
                result.pass = actual === 2;
                if (!result.pass) {
                    result.message = "Expected " + actual + "to be exactly 2";
                }
               return result; 
            }
        }
    }
}

// Apos criar o Matchers tem que ser declarado no beforeEach para o Jasmine reconheça o teste.
// temos o before EachAll sendo que este executa apenas uma unica vez Antes de  rodar todos os testes
beforeEach(function () {
    jasmine.addMatchers(myMatchers);
})

it('is 2', function () {
    expect(2).toBe2();
})
describe('Anagram', function(){
    var result = 2;
    //função afterEach executa apos o teste de cada 'IT' neste caso fazendo a variavel retornar o valor inicial.
    // temos o after Each All sendo que este executa apenas uma unica vez apos rodar todos os testes
    afterEach(function(){
        result = 2;
    })
    it('has to result in 5', function(){
        result += 3;
        expect(result).toEqual(5);
    })
    it('has to result in 9', function(){
        result += 7;
        expect(result).toEqual(9);
    })
})
describe('Anagram', function(){
    describe('Letters', function(){
        it('is true when "abc" and "cba"', function(){
            // Podemos, por exemplo, usar essa função para assegurar que determinada função
            // só está retornando um único tipo de dado. Podemos testar que um cálculo sempre retorne números,
            // e nunca uma String, NaN, etc.
            // expect(new MyObject).toEqual(jasmine.any(MyObject));
            expect(isAnagram('abc','cba')).toEqual(jasmine.any(Boolean));
           
        })
        it('is true when "Amor" and "Roma"', function(){
            expect(isAnagram('Amor','Roma')).toEqual(true);
        })
        it('is true when two empty strings', function(){
            expect(isAnagram('', '')).toEqual(true);
        })
    })
    


    describe('Numbers', function(){
        it('is true when "132" and 312', function(){
            expect(isAnagram('132', 312)).toEqual(true);
        })
        it('is true when "0.12" and "102"', function(){
            expect(isAnagram('0.12', '102')).toEqual(true);
        })
        it('is true when 0.12 and "102"', function(){
            expect(isAnagram(0.12, '102')).toEqual(true);
        })
        it('is false when 012 and 102', function(){
            expect(isAnagram(012, 102)).toEqual(false);
        })
    })
})
// Para ignorar uma suíte inteira, basta colocar um “x” na frente do nome da função “describe()”:
xdescribe('letters', function(){
    it('is true when "abc" and "cba"', function(){
        expect(isAnagram('abc','cba')).toEqual(true);
    })
})
// Para ignorar uma spec, basta colocar um “x” na frente do nome da função “it()”, chamando-a agora de “xit()”.
describe('letters', function(){
    xit('is true when "abc" and "cba"', function(){
        expect(isAnagram('abc','cba')).toEqual(true);
    })
})
// Caso queira ignorar specs de uma certa linha para baixo,
// podemos parar sua execução executando o comando “return”,
// evitando a continuação da execução da função.
describe('letters', function(){
    it('is true when "abc" and "cba"', function(){
        expect(isAnagram('abc','cba')).toEqual(true);
    })
    return; // A funcao "describe()" sera interrompida aqui.

    it('is true when "Amor" and "Roma"', function(){
        expect(isAnagram('Amor','Roma')).toEqual(true);
    })
    it('is true when two empty strings', function(){
        expect(isAnagram('', '')).toEqual(true);
    })
})

// Ao contrário da exclusão xit() e xdescribe(), que evitam a execução, 
//também há o foco (fit() e fdescribe() ). Quando presentes, apenas essas funções serão executadas,
// ignorando qualquer it() e describe() presentes.
describe('letters', function(){
    // fdescribe('letters', function(){   // rodaria apenas esse describe do arquivo. 
    it('is true when "abc" and "cba"', function(){
        expect(isAnagram('abc','cba')).toEqual(true);
    })
    it('is true when "Amor" and "Roma"', function(){
        expect(isAnagram('Amor','Roma')).toEqual(true);
    })
    it('is true when two empty strings', function(){
        // fit('is true when two empty strings', function(){
        // rodaria apenas esse IT do arquivo.
        expect(isAnagram('', '')).toEqual(true);
    })
})

//SPY

class Calculator{
    sum(n1, n2){
        return n1 + n2;
    }
}

class Person{
    randomCalc(calculator){
        var n1 = parseInt(Math.random()*10),
            n2 = parseInt(Math.random()*10);
        return `${n1} + ${n2} = ${calculator.sum(n1,n2)}`;
    }
}

// substituirmos a função “sum()” por um Spy, e ele nos dirá se a função foi chamada ou não
describe('Person', function(){
    it('uses the Calculator to sum', function(){
        var calculator = new Calculator();
        var person = new Person();

        spyOn(calculator, 'sum');
        person.randomCalc(calculator);
        expect(calculator.sum).toHaveBeenCalled();
    })
})
/* Agora nós colocamos um Spy no lugar da função “randomCalc()” da classe Person.
Executamos a função normalmente, passando o Calculator para ela.
No teste, verificamos se a função “randomCalc()” foi chamada com “calculator” como seu parâmetro.*/

describe('Person', function(){
    it('uses the Calculator to sum', function(){
        var calculator = new Calculator();
        var person = new Person();

        spyOn(calculator, 'sum');
        person.randomCalc(calculator);
        expect(calculator.sum).toHaveBeenCalled();
    })
})
/* Para ter certeza de que o Spy, quando executado, mantenha o retorno da função original,
 basta executar a função “callThrough()”.   */

describe('Person', function(){
    it('uses the Calculator to sum', function(){
        var calculator = new Calculator();
        var person = new Person();

        spyOn(person, 'randomCalc').and.callThrough();
        var result = person.randomCalc(calculator);
        expect(person.randomCalc).toHaveBeenCalledWith(calculator);
    })
})
/*  Além do valor original de uma função, 
também podemos fazer com que um Spy retorne um valor de nossa escolha. */

describe('Person', function(){
    it('uses the Calculator to sum', function(){
        var calculator = new Calculator();
        var person = new Person();

        spyOn(person, 'randomCalc').and.returnValue(53184);
        var result = person.randomCalc(calculator);
        console.log(result);
        expect(person.randomCalc).toHaveBeenCalledWith(calculator);
    })
})
/* Além de valores retornados, nós podemos até mesmo alterar o código a ser executado por uma função.
 Basta criarmos uma nova função e chamar com “callFake()”.  */

describe('Person', function(){
    it('uses the Calculator to sum', function(){
        var calculator = new Calculator();
        var person = new Person();

        var fakeFunction = function(){
            return 'my fake function!';
        }

        spyOn(person, 'randomCalc').and.callFake(fakeFunction);
        var result = person.randomCalc(calculator);
        console.log(result);
        expect(person.randomCalc).toHaveBeenCalledWith(calculator);
    })
})

//Criando Spies para funções que não existem

// Há também a possibilidade de criarmos Spies para funções que ainda não foram criadas.
describe('Person', function(){
    it('uses the Calculator to divide', function(){
        var calculator = new Calculator();
        var person = new Person();

        person.randomDiv = jasmine.createSpy('div spy');
        person.randomDiv();

        expect(person.randomDiv).toHaveBeenCalled();
    })
})

// Assim como os Spies criados anteriormente, esse também possui os mesmos métodos, 
// como o que força um valor como retorno.
describe('Person', function(){
    it('uses the Calculator to divide', function(){
        var calculator = new Calculator();
        var person = new Person();

        person.randomDiv = jasmine.createSpy('div spy').and.returnValue(5);

        expect(person.randomDiv()).toEqual(5);
    })
})
// Assim como podemos criar funções Spy, podemos também criar objetos.
/*   Outras propriedades dos Spies
.calls.any()  ==  retorna “false” se o Spy não foi chamado e “true” se alguma chamada já foi realizada
.calls.count() ==  retorna o número de vezes que o Spy foi chamado
.calls.argsFor(index) ==  retorna os parâmetros passados para a função de acordo com o índice indicado. Ex:
setValues(5, 37);
setValues.calls.argsFor(1) // retorna 37

.calls.allArgs() == retorna todos os parâmetros passados para a função
.calls.all() == retorna o contexto (this) e parâmetros passados pelas chamadas
.calls.mostRecent() ===  retorna o contexto (this) e parâmetros passados pela chamada mais recente
.calls.first() == retorna o contexto (this) e parâmetros passados pela primeira chamada
.calls.reset() == limpa todos os dados armazenados pelo Spy
*/
var tape;
beforeEach(function() {
    tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

    tape.play();
    tape.pause();
    tape.rewind(0);
});


//  Como testar códigos assíncronos?

// O teste vai falhar, pois ele é executado antes que o "setTimeout()" seja finalizado.

var myValuefaill = 0;
function myAsyncFunc(){
    setTimeout(function(){
        myValue = 10;
    }, 2000)
}

describe('Async Function', function(){
    it('should be 10 ', function(){
        expect(myValuefaill).toEqual(10);
    })
})

/*
Para testes assíncronos com o Jasmine, precisamos chamar o código assíncrono antes que o spec seja executado. 
Para garantir isso vamos ter que colocar nosso código assíncrono dentro do “beforeEach()”.
Também temos que avisar ao Jasmine quando a função assíncrona for finalizada. 
Fazemos isso chamando uma função especial chamada “done()”.
*/ 
var myValue = 0;
function myAsyncFunc(done){
    setTimeout(function(){
        myValue = 10;
        done();
    }, 2000)
}

describe('Async Function', function(){
    beforeEach(function(done){
        myAsyncFunc(done);
    })

    it('should be 10', function(){
        expect(myValue).toEqual(10);
    })
})
/**
 Uma ideia seria o uso de algo como callbacks ou Promises. 
 Assim nós podemos chamar a função e garantir que o código da função foi executado,
  e então executar o “done()” no próprio escopo do Jasmine.
 */
var myValue1 = 0;
function myAsyncFunc1(){
    var promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
            myValue1 = 10;
            resolve(myValue1);
        }, 2000)
    })
    return promise1;
}

describe('Async Function', function(){
    beforeEach(function(done){
        myAsyncFunc1().then(done);
    })

    it('should be 10', function(){
        expect(myValue1).toEqual(10);
    })
    
})