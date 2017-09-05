var should = require('should');
var parser = require('../source/parser');

describe ('parser spec', function() {
    it('should parser exists', function() {
        should(parser).be.ok;
    });

    describe('single operation', function() {
        describe('addition', function() {
            it('should parser return 3 for 1+2', function() {
                should(parser.parse('1+2')).equal(3);
            });
        
            it('should parser return 3 for (1+2)', function() {
                should(parser.parse('(1+2)')).equal(3);
            });
        
            it('should parser return 3.1 for 1.1+2', function() {
                should(parser.parse('1.1+2')).equal(3.1);
            });
         });

        describe('subtraction', function() {
            it('should parser return 2 for 3-1', function() {
                should(parser.parse('3-1')).equal(2);
            });
        
            it('should parser return 2 for (3-1)', function() {
                should(parser.parse('(3-1)')).equal(2);
            });
        
            it('should parser return 2 for 3.1-1', function() {
                should(parser.parse('3.1-1')).equal(2.1);
            });
        });

        describe('multiplication', function() {
            it('should parser return 4 for 2*2', function() {
                should(parser.parse('2*2')).equal(4);
            });
        
            it('should parser return 4 for (2*2)', function() {
                should(parser.parse('(2*2)')).equal(4);
            });
        
            it('should parser return 4.2 for (2.1*2)', function() {
                should(parser.parse('2.1*2')).equal(4.2);
            });
        });

        describe('division', function() {
            it('should parser return 0.5 for 1/2', function() {
                should(parser.parse('1/2')).equal(0.5);
            });
        
            it('should parser return 0.5 for (1/2)', function() {
                should(parser.parse('(1/2)')).equal(0.5);
            });
        
            it('should parser return 0.55 for 1.1/2', function() {
                should(parser.parse('1.1/2')).equal(0.55);
            });
        });
    });
});