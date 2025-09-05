import React from 'react';

function ListTable({idPrefix, headers, data, createInputs}) {
    var tableHeader = [];
    var tableBody = [];
    var tableInputs = [];

    for (var i = 0; i < headers.length; i++) {
        var header = headers[i];
        tableHeader.push(React.createElement("th", {key: idPrefix+"_header_"+i}, header.name));
    }

    for (var rowIndex = 0; rowIndex < data.length; rowIndex++) {
        var row = data[rowIndex];
        var cell = [];
        for (var colIndex = 0; colIndex < headers.length; colIndex++) {
            var colId = headers[colIndex].id;
            cell.push(React.createElement("td", {key: idPrefix+"_data_row_"+rowIndex+"_col_"+colIndex+"_value"}, row[colId]));
        }
        tableBody.push(React.createElement("tr", {key: idPrefix+"_data_row_"+rowIndex}, cell));
    }

    for (var colIndex = 0; colIndex < headers.length; colIndex++) {
        tableInputs[colIndex] = React.createElement("td", {key: idPrefix+"_input_row_table_cell_"+colIndex}, createInputs[colIndex](idPrefix, colIndex));
    }
    var inputsJsx = React.createElement("tr", {key: idPrefix+"_input_row"}, tableInputs);

    return (
        <table>
            <thead>
                <tr>{tableHeader}</tr>
            </thead>
            <tbody>
                {tableBody}
                {inputsJsx}
            </tbody>
        </table>
    );
}

export default ListTable;