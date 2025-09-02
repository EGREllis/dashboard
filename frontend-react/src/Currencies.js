import React from 'react';
import DynamicTable from './DynamicTable.js';

function Currencies() {
    var header = [{id: "name", header: "Name:"}];
    var validations = [];
    var details = [{name: "GBP"}];
    return (
        <DynamicTable headers={header} validations={validations} details={details}/>
    );
}

export default Currencies;