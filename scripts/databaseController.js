google.charts.load('current', {packages: ['corechart', 'bar']});

$('document').ready(function() {
    let tableHtml = GetTableHtml();
    $('#database-table').html(tableHtml);

    GetPreviousResults().then(function(npvResults) {
        for (let i = 0; i < npvResults.length; i++) {
            let npvResult = npvResults[i];
            let rowID = i;
            let rowHtml = GetTableRowHtml(rowID, npvResult.Timestamp, npvResult.Inputs);
            $('#database-table-body').append(rowHtml);

            $('.database-row').click(function(element) {
                let rowIndex = parseInt(element.currentTarget.id);
                let chartID = 'database-chart';
                let npvResultsArray = GetGoogleChartsArray(npvResults[rowIndex].Results);
                google.charts.setOnLoadCallback(DrawChart(npvResultsArray, chartID));
            });
        }
    });
});