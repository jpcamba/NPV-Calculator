function GetTableHtml() {
    let html = '<table class="table table-striped" style="text-align:center">'
    html += '<thead>';
    html +=     '<tr>';
    html +=         '<th> Timestamp </th>';
    html +=         '<th> Initial Value </th>';
    html +=         '<th> Cash Flows </th>';
    html +=         '<th> Lower Bound Discount Rate (in %) </th>';
    html +=         '<th> Upper Discount Rate (in %) </th>';
    html +=         '<th> Discount Rate Increment (in %) </th>';
    html +=     '</tr>';
    html += '</thead>';
    html += '<tbody id="database-table-body">';
    html += '</tbody>';
    html += '</table>';
    return html;
}

function GetTableRowHtml(rowID, timestamp, npvInputs) {
    let html = '<tr class="database-row" id="' + rowID + '">';
    html += '<th scope="row">' + timestamp + '</th>';
    html += '<td>' + npvInputs.InitialValue + '</td>';
    html += '<td>' + npvInputs.CashFlows + '</td>';
    html += '<td>' + npvInputs.LowerDiscountRate + '</td>';
    html += '<td>' + npvInputs.UpperDiscountRate + '</td>';
    html += '<td>' + npvInputs.DiscountRateIncrement + '</td>';
    html += '</tr>';
    return html;
}

function GetGoogleChartsArray(npvResults) {
    var gcArray = [];
    gcArray.push(['Discount Rate', 'Calculated NPV']);
    for (let i = 0; i < npvResults.length; i++) {
        let npvResult = npvResults[i];
        gcArray.push([npvResult.DiscountRate, npvResult.CalculatedNPV]);
    }
    return gcArray;
}

function DrawChart(npvResultsArray, chartID) {
    let chart = new google.visualization.BarChart(document.getElementById(chartID));
    let data = google.visualization.arrayToDataTable(npvResultsArray);
    let options = {
        title: 'Calculated NPVs by Discount Rate Increments',
        hAxis: { title: 'NPV' },
        vAxis: { title: 'Discount Rate' }
    };

    chart.draw(data, options);
}

function GetCurrentTimestamp() {
    return moment().format('YYYY-MM-DD HH:mm:SS.ss');
}

function GetDatabaseObject(npv, npvResults) {
    let timestamp = GetCurrentTimestamp();
    let dbObject = {
        Inputs: {
            CashFlows: npv.CashFlows,
            DiscountRateIncrement: npv.DiscountRateIncrement,
            InitialValue: npv.InitialValue,
            LowerDiscountRate: npv.LowerDiscountRate,
            UpperDiscountRate: npv.UpperDiscountRate
        },
        Results: [],
        Timestamp: timestamp
    };

    for (let i = 0; i < npvResults.length; i++) {
        dbObject.Results.push(npvResults[i]);
    }

    return dbObject;
}