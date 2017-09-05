var parser = (function() {
    function parse(s) {
        var expression = handleBrackects(s);
        var sign = getSign(expression)
        return operation(expression, sign);
    }

    function handleBrackects(s) {
        var firstBracketIndex = s.indexOf('(');
        var secondBracketIndex = s.indexOf(')');
        if (firstBracketIndex != -1 && secondBracketIndex != -1) {
            return s.substring(firstBracketIndex + 1, secondBracketIndex);
        }
        else {
            return s;
        }
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
        }
    }

    return {
        parse: parse
    }
})();


module.exports = parser;