import React from 'react';

function DataSource() {
/*
    <ul class="nav nav-tabs navbar-dark bg-dark align-items-center" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="jurisdiction-tab" data-bs-toggle="tab" data-bs-target="#jurisdiction-tab-pane" type="button" role="tab" aria-controls="jurisdiction-tab-pane" aria-selected="true">Jurisdiction</button>
                            </li>
                            */
    var manualDataTabs = [
        {id: "bonds", name: "Bonds"},
        {id: "currency", name: "Currency"},
        {id: "counterparty", name: "Counterparty"},
        {id: "discountCurves", name: "Discount curves"},
        {id: "creditRating", name: "Credit Rating"}
    ];

    return (
        <div>
            <div>
                <label for="dataSource">Data source: </label>
                <select name="dataSource" id="dataSource">
                    <option value="manual">Manual</option>
                    <option value="simulated">Simulated</option>
                    <option value="historic">Historic</option>
                </select>
            </div>
            <div>
                <ul class="nav nav-tabs navbar-light bg-light align-items-center" id="dataTab" role="tablist">
                    {manualDataTabs.map((ele, index) =>
                        React.createElement("li", {key: index, className: "nav-item", role: "presentation"},
                            React.createElement("button", {className: "nav-link"}, ele.name)
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}

export default DataSource;