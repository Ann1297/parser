var parser = (function () {
    function parse(s) {
        s = s.replace(/\s/g, '');

        if (!isValid(s)) {
            return undefined;
        }

        while (isNaN(s)) {
            var expression;

            if (containsBrackects(s)) {
                expression = getExpressionFromBrackects(s);
            } else {
                expression = getExpressionForOperation(s);
            }
            var signIndex = getSignIndex(expression);
            s = s.replace(expression, operation(expression, signIndex));
        }

        return +(+s).toFixed(2);
    }

    function containsBrackects(s) {
        if (s.search(/(\(|\))/) != -1) {
            return true;
        }

        return false;
    }

    function isValid(s) {
        var isValid = true;

        if (s.search(/[^\+\-\*\/\(\).0-9]/) !== -1) {
            isValid = false;
        } else if (s.search(/[\+\-\*\/]{2,}/) !== -1) {
            isValid = false;
        } else if (containsBrackects(s)) {
            var openBrackects = s.match(/\(/) || [];
            var closeBrackects = s.match(/\)/) || [];
            if (openBrackects.length != closeBrackects.length) {
                isValid = false;
            }
        }

        return isValid;
    }

    function getExpressionFromBrackects(s) {
        var fromBackets = s.match(/\(-*\d+\.*\d*[\+\-\*\/]*\d+\.*\d*\)/);
        return fromBackets[0];
    }

    //complicated function -__-
    function getExpressionForOperation(s) {

        var indexOfSign = s.match(/\-?\d+\.?\d*[\*\/]\-?\d+\.?\d*/) || [];
        var indexOfPlus = s.match(/\-?\d+\.?\d*[\+]\-?\d+\.?\d*/) || [];
        var indexOfMinus = s.match(/\-?\d+\.?\d*[\-]\-?\d+\.?\d*/) || [];

        if (indexOfSign.length !== 0) {
            return indexOfSign[0];
        } else if (indexOfPlus.length !== 0) {
            return indexOfPlus[0];
        } else if (indexOfMinus !== 0) {
            return indexOfMinus[0];
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

    function operation(expression, signIndex) { 
        var sign = expression[signIndex];
        if (containsBrackects(expression)) {
            expression = expression.substring(1, expression.length - 1);
            signIndex = expression.lastIndexOf(sign);
        }
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