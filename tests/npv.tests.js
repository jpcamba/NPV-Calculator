describe('NPV', function() {
    let getNegativeNpv, getPositiveNpv;

    beforeEach(function() {
        getNegativeNpv = function() {
            let cashFlows = [1000, 1500, 2000];
            let initialVaue = 10000;
            let lowerDiscountRate = 1;
            let upperDiscountRate = 1.5;
            let discountRateIncrement = 0.25;
            let npv = new NPV(cashFlows, initialVaue, lowerDiscountRate, upperDiscountRate, discountRateIncrement);

            return npv;
        }

        getPositiveNpv = function() {
            let cashFlows = [25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000];
            let initialVaue = 1000000;
            let lowerDiscountRate = 0.64;
            let upperDiscountRate = 0.64;
            let discountRateIncrement = 0;
            let npv = new NPV(cashFlows, initialVaue, lowerDiscountRate, upperDiscountRate, discountRateIncrement);

            return npv;
        }
    });

    describe('Calculate', function() {
        it('should return negative NPV', function() {
            let npv = getNegativeNpv();
            let discountRate = 0.0125;

            let expectedNpv = -5622.32;
            let actualNpv = npv.Calculate(discountRate);

            expect(actualNpv).toBe(expectedNpv);
        });

        it('should return positive NPV', function() {
            let npv = getPositiveNpv();
            let discountRate = 0.0064;

            let expectedNpv = 242322.82;
            let actualNpv = npv.Calculate(discountRate);

            expect(actualNpv).toBe(expectedNpv);
        });
    });

    describe('GetDiscountRates', function() {
        it('should return array of incrementing discount rates', function() {
            let npv = getNegativeNpv();

            let expectedDiscountRates = [0.01, 0.0125, 0.015];
            let actualDiscountRates = npv.GetDiscountRates();

            expect(actualDiscountRates).toEqual(expectedDiscountRates);
        });
    });
});