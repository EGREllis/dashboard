import React from 'react';

function Data() {
    return (
        <div>
            <label for="dataSource">Data source: </label>
            <select name="dataSource" id="dataSource">
                <option value="manual">Manual</option>
                <option value="simulated">Simulated</option>
                <option value="historic">Historic</option>
            </select>
        </div>
    );
}

export default Data;