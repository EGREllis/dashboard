import React from 'react';

function DynamicTable({headers, validations, details}) {
    var tableHeader = headers.map((header, index) => React.createElement("th", {}, header.header));
    var tableData = details.map((detail, offset) =>
                                        React.createElement("tr", {},
                                            headers.map((header, index) =>
                                                React.createElement("td", {}, detail[header.id])
                                            )
                                        )
                                    )

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