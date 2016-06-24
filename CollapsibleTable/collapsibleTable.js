/**
 * CollapsibleTable for displaying wide tables
 * domReference = reference to element
 * collapse = should the table display collapsed
 */
class CollapsibleTable {

    /**
     * constructor optional container and delay
     */
    constructor(tableRef = '.table', toggleRef = '.js-toggle-next-cells', indicator = 'cell__toggle-open', collapsed = false) {
        this.tableRef = tableRef;
        this.toggleRef = toggleRef;
        this.indicator = indicator;
        this.collapsed = collapsed;
        this.table = document.querySelector(this.tableRef);
        this.tableRows = Array.from(this.table.querySelectorAll('tr'));
        this.toggles = [];


        this.init();
    }

    init() {
        let toggleArray = Array.from(document.querySelectorAll(this.toggleRef));

        // fill array with toggle indexes
        toggleArray.forEach( (toggle) => { this.toggles.push(toggle.cellIndex); });

        // push index of last cell
        this.toggles.push(this.table.rows[0].cells.length);

        // set click handlers
        toggleArray.forEach( (toggleColumn) => {
            toggleColumn.addEventListener('click', (event) => {
                let toggle = event.currentTarget;
                let section = this.getColstartColEndAndCurrentToggle(toggle.cellIndex);

                if ( toggle.classList.contains(this.indicator)) {
                    this.hideTableColumns(section.colStart + 2, section.colEnd, section.current);
                    toggle.classList.remove(this.indicator);
                } else {
                    this.showTableColumns(section.colStart + 2, section.colEnd, section.current);
                    toggle.classList.add(this.indicator);
                }
            });

            //collapse all
            if(this.collapsed) {
                let section = this.getColstartColEndAndCurrentToggle(toggleColumn.cellIndex);

                this.hideTableColumns(section.colStart + 2, section.colEnd, section.current);
                toggleColumn.classList.remove(this.indicator);
            }
        });
    }

    // calculate the section begin and end
    getColstartColEndAndCurrentToggle( toggleIndex ) {
        let current = this.toggles.indexOf(toggleIndex)

        let section = {
                current: current,
                colStart: this.toggles[current],
                colEnd: (current === this.toggles.length) ? this.toggles[this.toggles.length - 1] : this.toggles[current + 1]
            };

        return section;
    }

    // helper function
    retrieveCells(start, end, rowSpans) {
        let cellsList = [];

        for (var i = start; i <= end; i++) {
            this.tableRows.forEach( (row) => {
                let offset = (i > 1) ?  rowSpans + 1 : 0;
                let cellH = row.querySelector(`th:nth-child(${i})`);
                if(cellH) {
                    cellsList.push(cellH);
                }

                let cell = row.querySelector(`td:nth-child(${i-offset})`);
                if(cell) {
                    cellsList.push(cell);
                }
            });
        }

        return cellsList;
    }

    //helper function
    showTableColumns(start, end, rowSpans) {
        this.retrieveCells(start, end, rowSpans).forEach( (cell) => {
            cell.style.display = 'table-cell';
        });
    }

    // helper function
    hideTableColumns(start, end, rowSpans) {
        this.retrieveCells(start, end, rowSpans).forEach( (cell) => {
            cell.style.display = 'none';
        });
    }
}