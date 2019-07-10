google.charts.load('current', {packages: ['corechart', 'bar']});

function CalculateNPV() {
    let initialValue = $('#input-initial-value').val();
    let cashFlowsInput = $('#input-cash-flows').val();
    let lowerDiscountRate = $('#input-lower-discount-rate').val();
    let upperDiscountRate = $('#input-upper-discount-rate').val();
    let discountRateIncrement = $('#input-discount-rate-increment').val();
    let cashFlows = cashFlowsInput.split(',');

    let npv = new NPV(cashFlows, initialValue, lowerDiscountRate, upperDiscountRate, discountRateIncrement);
    let discountRates = npv.GetDiscountRates();

    let npvResults = [];
    for (let i = 0; i < discountRates.length; i++) {
        let discountRate = discountRates[i];
        let calculatedNPV = npv.Calculate(discountRate);
        npvResults.push({
            DiscountRate: discountRate,
            CalculatedNPV: calculatedNPV
        });
    }

    let chartID = 'calculated-npv-chart';
    let npvResultsArray = GetGoogleChartsArray(npvResults);
    google.charts.setOnLoadCallback(DrawChart(npvResultsArray, chartID));
}