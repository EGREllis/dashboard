import React from 'react';

function DynamicTable({headers, validations, details}) {
    return (
        <table>
            <tr>
                {
                    headers.map((header, index) =>
                        React.createElement("th", {}, header.header)
                    )
                }
            </tr>
            {
                details.map((detail, offset) =>
                    React.createElement("tr", {},
                        headers.map((header, index) =>
                            React.createElement("td", {}, detail[header.id])
                        )
                    )
                )
            }
        </table>
    );
}

export default DynamicTable;