var parser = (function() {
    function parse(s) {
        s = s.replace(/\s/g, '');

        if (!isValid(s)) {
            return undefined;
        }

        while(isNaN(s)) {
            var expression;  

            if (containsBrackects(s)) {
                expression = getExpressionFromBrackects(s);
            } else {
                expression = getExpressionForOperation(s);
            }

            var sign = getSign(expression);
            s = s.replace(expression, operation(expression, sign));                    
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
        var fromBackets = s.match(/\(-*\d+.*\d*[\+\-\*\/]*\d+.*\d*\)/);
        return fromBackets[0];
    }

    //complicated function -__-
    function getExpressionForOperation(s) {

        // var indexOfSign = s.match(/-*\d+.*\d*[\*\/]-*\d+.*\d*/);
        // var indexOfPlus = s.match(/-*\d+.*\d*[\+]-*\d+.*\d*/);
        // var indexOfMinus = s.match(/-*\d+.*\d*[\-]-*\d+.*\d*/) || [];

        var indexOfSign = s.search(/[\*\/]/);
        var indexOfPlus = s.search(/[\+]/);
        var indexOfMinus = s.search(/[\-]/);

        if (indexOfSign === -1) {
            indexOfSign = indexOfPlus !== -1 ? indexOfPlus : indexOfMinus;
        }

        if (indexOfSign != -1) {
            var startIndex = 0, endIndex = s.length;
            
            for (var i = indexOfSign - 1; i >= 0; i--) {
                var letter = s.charAt(i);
                if (isNaN(letter) && letter !== ".") {
                    startIndex = i + 1;
                    break;
                }
            }

            for (var i = indexOfSign + 1; i < s.length; i++) {
                var letter = s.charAt(i);
                if (isNaN(letter) && letter !== ".") {
                    endIndex = i;
                    break;
                }
            }

            return s.substring(startIndex, endIndex);
        }
        return s;
    }

    function getSign(expression) {
        if (expression.search(/\+/) != -1) {
            return '+';
        }

        if (expression.search(/-/) != -1) {
            return '-';
        }

        if (expression.search(/\*/) != -1) {
            return '*';
        }

        if (expression.search(/\//) != -1) {
            return '/';
        }
    }

    function operation(expression, sign) {
        if (containsBrackects(expression)) {
            expression = expression.substring(1, expression.length - 1);
        }
        var numbers = expression.split(sign);
        switch (sign) {
            case '+':
            return +numbers[0] + +numbers[1];
            break;
            case '-':
            return +numbers[0] - +numbers[1];
            break;
            case '*':            
            return +numbers[0] * +numbers[1];
            break;
            case '/':            
            return +numbers[0] / +numbers[1];
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