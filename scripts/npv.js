/*
* NPV Class
*
* @constructor
* @param Array of Cash Flows
* @param Initial Value
* @param Lower Bound Discount Rate (In Percent)
* @param Upper Bound Discount Rate (In Percent)
* @param Increment (In Percent)
*/
class NPV {
    constructor(cashFlows, initialValue, lowerDiscountRate, upperDiscountRate, discountRateIncrement) {
        this.CashFlows = cashFlows;
        this.InitialValue = initialValue;
        this.LowerDiscountRate = lowerDiscountRate / 100;
        this.UpperDiscountRate = upperDiscountRate / 100;
        this.DiscountRateIncrement = discountRateIncrement / 100;
    }

    // Public functions
    Calculate(discountRate) {
        let npv = this.InitialValue * -1;
        for (let i = 0; i < this.CashFlows.length; i++) {
            let timePeriod = i + 1;
            npv += this.CashFlows[i] / Math.pow(1 + discountRate, timePeriod);
        }

        npv = parseFloat(parseFloat(npv).toFixed(2));
        return npv;
    }

    GetDiscountRates() {
        let discountRates = [this.LowerDiscountRate];

        let nextDiscountRate = this.LowerDiscountRate;
        while (nextDiscountRate < this.UpperDiscountRate) {
            discountRates.push(nextDiscountRate);
            nextDiscountRate += this.DiscountRateIncrement;
        }

        discountRates.push(this.UpperDiscountRate);
        return discountRates;
    }
}