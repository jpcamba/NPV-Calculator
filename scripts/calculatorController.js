google.charts.load('current', {packages: ['corechart', 'bar']});

function CalculateNPV() {
    let isInputValid = ValidateInputs();
    if (!isInputValid) {
        $('#validation-modal').modal({show: true});
        return;
    }

    let initialValue = $('#input-initial-value').val();
    let cashFlowsInput = $('#input-cash-flows').val();
    let lowerDiscountRate = $('#input-lower-discount-rate').val();
    let upperDiscountRate = $('#input-upper-discount-rate').val();
    let discountRateIncrement = $('#input-discount-rate-increment').val();
    let cashFlows = cashFlowsInput.split(',');

    let npv = new NPV(cashFlows, initialValue, lowerDiscountRate, upperDiscountRate, discountRateIncrement);
    let discountRates = npv.GetDiscountRates();

    let chartNpvResults = [];
    let npvResults = [];
    for (let i = 0; i < discountRates.length; i++) {
        let discountRate = discountRates[i];
        let calculatedNPV = npv.Calculate(discountRate);
        let npvResult = {
            DiscountRate: discountRate,
            CalculatedNPV: calculatedNPV
        };

        chartNpvResults.push(npvResult);
        npvResults.push(npvResult);
    }

    let chartID = 'calculated-npv-chart';
    let tableID = 'calculated-npv-table';
    DisplayResultChartAndTable(chartNpvResults, chartID, tableID);

    SaveToDatabase(npv, npvResults);
}

function ValidateInputs() {
    let initialValue = $('#input-initial-value').val();
    let cashFlowsInput = $('#input-cash-flows').val();
    let lowerDiscountRate = $('#input-lower-discount-rate').val();
    let upperDiscountRate = $('#input-upper-discount-rate').val();
    let discountRateIncrement = $('#input-discount-rate-increment').val();
    let cashFlows = cashFlowsInput.split(',');

    if (initialValue === '' || cashFlowsInput === '' || lowerDiscountRate === '' || upperDiscountRate === '' || discountRateIncrement === '') {
        return false;
    }

    for (let i = 0; i < cashFlows.length; i++) {
        if (isNaN(parseInt(cashFlows[i]))) {
            return false;
        }
    }

    return true;
}

function SaveToDatabase(npv, npvResults) {
    let databaseObject = GetDatabaseObject(npv, npvResults);
    GetPreviousResults().then(function(previousResults) {
        previousResults.push(databaseObject);
        SaveResult(previousResults);
    });
}