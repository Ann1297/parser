var parser = (function () {
    function parse(s) {
        s = s.replace(/\s/g, '');

        if (!isValid(s)) {
            return undefined;
        }

        while (isNaN(s)) {
            var expression = getExpressionWithSingleOperation(s);
            var resultOfOperaion = operation(expression);
            
            s = s.replace(expression, resultOfOperaion);
        }

        return +(+s).toFixed(2);
    }

    function getExpressionWithSingleOperation(s) {
        var expression;

        if (containsBrackects(s)) {
            expression = getExpressionFromBrackects(s);
        } else {
            expression = getExpressionForOperation(s);
        }

        return expression;
    }


    function containsBrackects(s) {
        var containBrackets =  s.search(/(\(|\))/) != -1;

        return containBrackets;
    }

    function isValid(s) {
        var isValid = true;
        var containUnpermittedSymbols = s.search(/[^\+\-\*\/\(\)\.\d]/) !== -1;
        var containMultipleOperationsSymbolsTogether = s.search(/[\+\-\*\/]{2,}/) !== -1;

        if (containUnpermittedSymbols) {
            isValid = false;
        } else if (containMultipleOperationsSymbolsTogether) {
            isValid = false;
        } else if (containsBrackects(s)) {
            var openBrackects = s.match(/\(/g) || [];
            var closeBrackects = s.match(/\)/g) || [];
            if (openBrackects.length != closeBrackects.length) {
                isValid = false;
            }
        }

        return isValid;
    }

    function getExpressionFromBrackects(s) {
        var expressionsInBrackets = s.match(/\(-?\d+(\.\d+)?([\+\-\*\/]*\d+(\.\d+)?)*\)/) || [0];
        var fromBackets = expressionsInBrackets[0];

        var containMultipleOperations = 
            fromBackets.search(/\(-?\d+(\.\d+)?([\+\-\*\/]*\d+(\.\d+)?)?\)/) === -1;

        //if expression have multiple opearions return only expression with single opearion
        if (containMultipleOperations) {
            return getExpressionForOperation(fromBackets);
        }

        return fromBackets;
    }

    function removeBrackets(s) {
        if (containsBrackects(s)) {
            var start = s.lastIndexOf('(') + 1;
            var end = s.indexOf(')');
            return s.substring(start, end);
        }
        
        return s;
    }

    function getExpressionForOperation(s) {
        //expressions with specific operaion sign
        var multiplicationOrDivision = s.match(/\-?\d+\.?\d*[\*\/]\-?\d+\.?\d*/) || [];
        var addition = s.match(/\-?\d+\.?\d*[\+]\-?\d+\.?\d*/) || [];
        var subtraction = s.match(/\-?\d+\.?\d*[\-]\-?\d+\.?\d*/) || [];

        if (multiplicationOrDivision.length !== 0) {
            return multiplicationOrDivision[0];
        } else if (addition.length !== 0) {
            return addition[0];
        } else if (subtraction.length !== 0) {
            return subtraction[0];
        }

        return s;
    }

    function getSignIndex(expression) {        
        var signs = ['*', '/', '+', '-'];
        for (var i = 0; i < signs.length; i++) {
            var signIndex = expression.lastIndexOf(signs[i]);
            if (signIndex !== -1) {
                return signIndex;
            }
        }
    }

    function operation(expression) {
        expression = removeBrackets(expression);
        var signIndex = getSignIndex(expression);
        var sign = expression[signIndex];

        var x = +(expression.substring(0, signIndex));
        var y = +(expression.substring(signIndex + 1, expression.length));
        
        switch (sign) {
            case '+':
                return x + y;
                break;
            case '-':
                return x - y;
                break;
            case '*':
                return x * y;
                break;
            case '/':
                return x / y;
                break;
            default:
                return expression;
                break;
        }
    }

    return {
        parse: parse
    }
})();

module.exports = parser;