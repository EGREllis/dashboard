import React from 'react';
import { useState } from 'react';
import Currencies from './Currencies.js'

function DataSource() {
    var dataTabs = [
        {id: "currency", name: "Currency"},
        {id: "counterparty", name: "Counterparty"},
        {id: "discountCurves", name: "Discount curves"},
        {id: "bonds", name: "Bonds"}
    ];

    var [currentTab, setCurrentTab] = useState(dataTabs[0].id);

    function closureChangeTab(id) {
        return function () {setCurrentTab(id)};
    }

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
                    {dataTabs.map((ele, index) =>
                        React.createElement("li", {key: index, className: "nav-item", role: "presentation"},
                            React.createElement("button", {className: "nav-link", id: ele.id, onClick: closureChangeTab(ele.id)}, ele.name)
                        )
                    )}
                </ul>
            </div>
            <div>
                {currentTab === "currency" ? <Currencies /> : currentTab}
            </div>
        </div>
    );
}

export default DataSource;