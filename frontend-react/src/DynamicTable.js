import React from 'react';

function DynamicTable({headers, validations, details}) {
    var tableHeader = headers.map((header, index) => React.createElement("th", {}, header.header));
    tableHeader.push(React.createElement("th", {}, "+/-"));
    var tableData = [];

    for (var i = 0; i < details.length; i++) {
        var detail = details[i];
        var rowData = [];
        for (var j = 0; j < headers.length; j++) {
            var header = headers[j];
            rowData.push(React.createElement("td", {}, detail[header.id]));
        }
        rowData.push(React.createElement("td", {}, React.createElement("button", {}, "-")));
        tableData.push(React.createElement("tr", {}, rowData));
    }

    var insertRowData = [];
    for (var k = 0; k < headers.length; k++) {
        var insertHeader = headers[k];
        insertRowData.push(
            React.createElement("td", {},
                React.createElement("input", {type: insertHeader.type, placeholder: insertHeader.header}, null)));
    }
    insertRowData.push(React.createElement("td", {}, React.createElement("button", {}, "+")));
    tableData.push(React.createElement("tr", {}, insertRowData));

    return (
        <table>
            <tr>
                {tableHeader}
            </tr>
            {tableData}
        </table>
    );
}

export default DynamicTable;