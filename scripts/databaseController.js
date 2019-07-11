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

            $('.database-row').click(function(element) {
                let rowIndex = parseInt(element.currentTarget.id);
                let chartID = 'database-chart';
                let npvResultsArray = GetGoogleChartsArray(npvResults[rowIndex].Results);
                google.charts.setOnLoadCallback(DrawChart(npvResultsArray, chartID));
                $('#database-chart').append('<div id="database-info"> Chart may be inaccurate for very small or very large values </div>');

                $('#database-result-table').html('');
                let resultTableHtml = GetResultTableHtml();
                $('#database-result-table').html(resultTableHtml);

                for (let j = 0; j < npvResults[rowIndex].Results.length; j++) {
                    let npvRowResult = npvResults[rowIndex].Results[j];
                    let resultRowHtml = GetResultTableRowHtml(npvRowResult);
                    $('#database-result-table-body').append(resultRowHtml);
                }
            });
        }
    });
}