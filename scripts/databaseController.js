google.charts.load('current', {packages: ['corechart', 'bar']});

$('document').ready(function() {
    let tableHtml = GetDatabaseTableHtml();
    $('#database-table').html(tableHtml);

    DisplayPreviousResults();
});

function DisplayPreviousResults() {
    $('#database-table-body').html('');
    GetPreviousResults().then(function(npvResults) {
        for (let i = 0; i < npvResults.length; i++) {
            let npvResult = npvResults[i];
            let rowID = i;
            let rowHtml = GetDatabaseTableRowHtml(rowID, npvResult.Timestamp, npvResult.Inputs);
            $('#database-table-body').append(rowHtml);

            $('.database-row').unbind().click(function(element) {
                let rowIndex = parseInt(element.currentTarget.id);
                let chartID = 'database-chart';
                let tableID = 'database-result-table';
                DisplayResultChartAndTable(npvResults[rowIndex].Results, chartID, tableID);
            });
        }
    });
}