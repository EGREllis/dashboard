import React from 'react';
import { useState } from 'react';
import ListTable from './ListTable.js';

function DataSource() {
    var dataTabs = [
        {id: "currencies", name: "Currencies"},
        {id: "discountCurves", name: "Discount curves"},
        {id: "counterparties", name: "Counterparties"},
        {id: "bonds", name: "Bonds"}
    ];

    var [currentTab, setCurrentTab] = useState(dataTabs[0].id);

    function closureChangeTab(id) {
        return function () {setCurrentTab(id)};
    }

    var [data, setData] = useState({
                            currencies: [{id: "gbp", name: "GBP"}],
                            counterparties: [{id: "rbs.g", ticker: "RBS.G", name: "Royal Bank of Scotland", currency: "gbp"}],
                            discountCurves: [{id: "gbp", values:[1, 0.9, 0.8, 0.7, 0.6, 0.5]}],
                            bonds: [{id: "rbs_5yr", counterparty: "rbs.g", principle: 1000000, coupon: 0.05, maturity: 5}],
                            cashFlows: []
                          });

    var callbacks = {
        addCurrency: function(newCurrency) {
            var currencyAdded = data.currencies;
            currencyAdded.push(newCurrency);
            setData({
                currencies: currencyAdded,
                counterparties: data.counterparties,
                discountCurves: data.discountCurves,
                bonds: data.bonds,
                cashFlows: data.cashFlows
            });
        },
        removeCurrency: function(currencyIndex) {
            var currencyRemoved = [];
            if (currencyIndex === 0) {
                currencyRemoved = data.currencies.slice(1, data.currencies.length);
            } else {
                currencyRemoved = data.currencies.slice(0, currencyIndex).concat(data.currencies.slice(currencyIndex+1, data.currencies.length))
            }
            setData({
                currencies: currencyRemoved,
                counterparties: data.counterparties,
                discountCurves: data.discountCurves,
                bonds: data.bonds,
                cashFlows: data.cashFlows
            });
        },
        addCounterparty(newCounterparty) {
            var newCounterparties = data.counterparties.concat([newCounterparty]);
            setData({
                currencies: data.currencies,
                counterparties: newCounterparties,
                discountCurves: data.discountCurves,
                bonds: data.bonds,
                cashFlows: data.cashFlows
            });
        },
        removeCounterparty(counterpartyIndex) {
            var newCounterparties = [];
            if (counterpartyIndex <= 0) {
                newCounterparties = data.counterparties.slice(1, data.counterparties.length);
            } else if (counterpartyIndex === (counterpartyIndex.length-1)) {
                newCounterparties = data.counterparties.slice(0, data.counterparties.length -1);
            } else {
                newCounterparties = newCounterparties.concat(
                    data.counterparties.slice(0, counterpartyIndex),
                    data.counterparties.slice(counterpartyIndex, data.counterparties.length)
                );
            }
            setData({
                currencies: data.currencies,
                counterparties: newCounterparties,
                discountCurves: data.discountCurves,
                bonds: data.bonds,
                cashFlows: data.cashFlows
            });
        },
        addBond(newBond) {
            alert("Adding Bond "+newBond);
            var newBonds = data.bonds.concat(newBond);
            alert("New Bonds: "+newBonds+": instanceof Array = "+(newBonds instanceof Array));
            setData({
                currencies: data.currencies,
                counterparties: data.counterparties,
                discountCurves: data.discountCurves,
                bonds: newBonds,
                cashFlows: data.cashFlows
            });
        },
        removeBond(bondIndex) {
            var newBonds = [];
            if (bondIndex <= 0) {
                newBonds.concat(data.bonds.slice(1, data.bonds.length));
            } else if (bondIndex === (data.bonds.length-1)) {
                newBonds.concat(data.bonds.slice(0, data.bonds.length-1));
            } else {
                newBonds = [].concat(
                    data.bonds.slice(0, bondIndex-1),
                    data.bonds.slice(bondIndex+1, data.bonds.length)
                );
            }
            setData({
                currencies: data.currencies,
                counterparties: data.counterparties,
                discountCurves: data.discountCurves,
                bonds: newBonds,
                cashFlows: data.cashFlows
            });
        }
    };

    var tabJsx = null;
    if (currentTab === "currencies") {
        tabJsx = (<ListTable
            idPrefix="currenciesTable"
            headers={[{"id": "name", "name": "Symbol"}]}
            data={data.currencies}
            createInputs={[
                function(idPrefix, colIndex) {
                    var id = idPrefix+"_input_cell_"+colIndex;
                    return React.createElement("input", {key: id, id: id, type: "text", placeholder: "Currency"}, null);
                }
            ]}
            addElementButton={function(idPrefix) {
                var buttonId = idPrefix+"_add_button";
                var id = idPrefix+"_input_cell_"+0;
                function addButtonClicked(idPrefix) {
                    return function() {
                        var ele = document.getElementById(id);
                        var newCurrency = {id: ele.value.toLowerCase(), name: ele.value.toUpperCase()};
                        callbacks.addCurrency(newCurrency);
                    }
                }
                return React.createElement("button", {key: buttonId, id: buttonId, onClick: addButtonClicked(idPrefix)}, "+");
            }}
            />);
    } else if (currentTab === "discountCurves") {
        tabJsx = currentTab;
    } else if (currentTab === "counterparties") {
        tabJsx = (<ListTable
                    idPrefix="counterpartiesTable"
                    headers={[
                        {"id": "ticker", "name": "Ticker"},
                        {"id": "name", "name": "Name"},
                        {"id": "currency", "name": "Currency"}
                    ]}
                    data={data.counterparties}
                    createInputs={[
                        function(idPrefix, colIndex) {
                            var id = idPrefix+"_input_cell_"+colIndex;
                            return React.createElement("input", {key: id, id: id, type: "text", placeholder: "Ticker"}, null);
                        },
                        function(idPrefix, colIndex) {
                            var id = idPrefix+"_input_cell_"+colIndex;
                            return React.createElement("input", {key: id, id: id, type: "text", placeholder: "Name"}, null);
                        },
                        function(idPrefix, colIndex) {
                            var values = [];
                            for (var offset = 0; offset < data.currencies.length; offset++) {
                                var currency = data.currencies[offset];
                                var optionId = idPrefix+"_input_cell_"+colIndex+"_option_value"+offset;
                                values.push(React.createElement("option", {key: optionId, id: optionId, value: currency.id}, currency.name));
                            }
                            var id = idPrefix+"_input_cell_"+colIndex;
                            return React.createElement("select", {key: id, id: id}, values);
                        }
                    ]}
                    addElementButton={function(idPrefix) {
                        var tickerId = idPrefix+"_input_cell_"+0;
                        var nameId = idPrefix+"_input_cell_"+1;
                        var currencyId = idPrefix+"_input_cell_"+2;
                        var buttonId = idPrefix+"_add_button";

                        function addCounterpartyButtonClicked(idPrefix) {
                            var tickerValue = document.getElementById(tickerId).value;
                            var nameValue = document.getElementById(nameId).value;
                            var currencySelectEle = document.getElementById(currencyId);
                            var currencyValue = currencySelectEle.options[currencySelectEle.selectedIndex].text;

                            var newCounterparty = {
                                id: tickerValue.toLowerCase(),
                                ticker: tickerValue.toUpperCase(),
                                name: nameValue,
                                currency: currencyValue.toLowerCase()
                            };

                            callbacks.addCounterparty(newCounterparty);
                        }

                        function addCounterpartyButtonClickedClosure(idPrefix) {
                            return function() {addCounterpartyButtonClicked(idPrefix)};
                        }

                        return React.createElement("button", {key: buttonId, id: buttonId, onClick: addCounterpartyButtonClickedClosure(idPrefix)}, "+");
                    }}
                />);
    } else if (currentTab === "bonds") {
        tabJsx = (<ListTable
                    idPrefix="bondsTable"
                    headers={[
                        {"id": "counterparty", "name": "Counterparty"},
                        {"id": "principle", "name": "Principle"},
                        {"id": "coupon", "name": "Coupon"},
                        {"id": "maturity", "name": "Maturity"}
                    ]}
                    data={data.bonds}
                    createInputs={[
                        function(idPrefix, colIndex) {
                            var partyValues = [];
                            for (var partyIndex = 0; partyIndex < data.counterparties.length; partyIndex++) {
                                var valueId = idPrefix+"_input_cell_"+colIndex+"_option_value_"+partyIndex;
                                var party = data.counterparties[partyIndex];
                                partyValues.push(React.createElement("option", {key: valueId, id: valueId, value: party.id}, party.name));
                            }
                            var selectId = idPrefix+"_input_cell_"+colIndex+"_select";
                            return React.createElement("select", {key: selectId, id: selectId}, partyValues);
                        },
                        function(idPrefix, colIndex) {
                            var id = idPrefix+"_input_cell_"+colIndex;
                            return React.createElement("input", {key: id, id: id, type: "text", placeholder: "Principle"}, null);
                        },
                        function(idPrefix, colIndex) {
                            var id = idPrefix+"_input_cell_"+colIndex;
                            return React.createElement("input", {key: id, id: id, type: "text", placeholder: "Coupon"}, null);
                        },
                        function(idPrefix, colIndex) {
                            var id = idPrefix+"_input_cell_"+colIndex;
                            return React.createElement("input", {key: id, id: id, type: "text", placeholder: "Maturity"}, null);
                        }
                    ]}
                    addElementButton={function(idPrefix) {
                        var buttonId = idPrefix+"_add_button";
                        var counterpartyId = idPrefix+"_input_cell_"+0+"_select";
                        var principleId = idPrefix+"_input_cell_"+1;
                        var couponId = idPrefix+"_input_cell_"+2;
                        var maturityId = idPrefix+"_input_cell_"+3;

                        function addBondButtonClicked(idPrefix) {
                            var counterpartySelectEle = document.getElementById(counterpartyId);
                            var counterpartyValue = counterpartySelectEle.options[counterpartySelectEle.selectedIndex].value;
                            var principleValue = document.getElementById(principleId).value;
                            var couponValue = document.getElementById(couponId).value;
                            var maturityValue = document.getElementById(maturityId).value;
                            var bondId = counterpartyValue+"_"+maturityValue+"yr";

                            var newBond = {id: bondId, counterparty: counterpartyValue, principle: principleValue, coupon: couponValue, maturity: maturityValue};

                            callbacks.addBond(newBond);
                        }

                        function addBondButtonClickedClosure(idPrefix) {
                            return function() {addBondButtonClicked(idPrefix)};
                        }

                        return React.createElement("button", {key: buttonId, id: buttonId, onClick: addBondButtonClickedClosure(idPrefix)}, "+");
                    }}
                />);
    } else {
        tabJsx = currentTab;
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
                        React.createElement("li", {key: "dataSource_list_item_"+index, className: "nav-item", role: "presentation"},
                            React.createElement("button", {key: "dataSource_button_"+index, className: "nav-link", id: ele.id, onClick: closureChangeTab(ele.id)}, ele.name)
                        )
                    )}
                </ul>
            </div>
            <div>
                <p>{currentTab}</p>
                {tabJsx}
            </div>
        </div>
    );
}

export default DataSource;