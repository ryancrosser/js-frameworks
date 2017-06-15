<template>
  <div>

    <ag-grid-vue style="height:calc(30vh - 25px)"
                 class="ag-fresh"
                 :gridOptions="gridOptions"
                 :columnDefs="columnDefs"
                 :rowData="rowData">
    </ag-grid-vue>

  </div>
</template>

<script>
/* eslint-disable max-len */
import { AgGridVue } from 'ag-grid-vue';
// import { mapGetters } from 'vuex';

export default {
  name: 'grid',
  components: {
    'ag-grid-vue': AgGridVue
  },
  data() {
    return {
      gridOptions: null,
      columnDefs: null
      // rowData: null
    };
  },
  beforeMount() {
    this.gridOptions = {
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
      }
    };
    // this.rowData = this.gridData;
    this.columnDefs = this.createColumnDefs();
  },

  // beforeMount() {
  //   this.gridOptions = {};
  //   this.createColumnDefs();
  //   this.rowData = [
  //     {
  //       _id: '563af7d8-4e74-569e-9409-fb25c0b76d26',
  //       activityType: 'C',
  //       date: '2017-05-01T00:03:55.573Z',
  //       seed: '5376462406',
  //       contact: [
  //         '4772775348',
  //         '7137508637',
  //         '6404354735',
  //         '7267656920',
  //         '9229302302',
  //         '6489525157',
  //         '4473959797',
  //         '4732422478',
  //         '7278033761'
  //       ],
  //       tower: '444-444-44444-44444',
  //       latitude: 38.94895,
  //       longitude: -77.36413,
  //       context: 'Wari ocifa anidoc bakufi vokapuudo zuvahte divufkef usupi fe om fezof ji lakka rak tu hanentet mi vuwefo 5376462406 cil wuw rod ebfalob bisa louzalu cohma suhwazfoj sapusfut pocwuz mi po budok.'
  //     },
  //     {
  //       _id: 'de1ad947-4b73-52d7-be3f-058ff7857f7c',
  //       activityType: 'C',
  //       date: '2017-05-01T00:08:29.919Z',
  //       seed: '5387467238',
  //       contact: [
  //         '2625735719',
  //         '7267656920',
  //         '6404354735',
  //         '2303159102',
  //         '9567718725',
  //         '9229302302',
  //         '2604154787',
  //         '4473959797',
  //         '8475002105',
  //         '7137508637',
  //         '9819265620',
  //         '7278033761',
  //         '6489525157'
  //       ],
  //       tower: '222-222-22222-22222',
  //       latitude: 38.96099,
  //       longitude: -77.39892,

  //       context: 'Er elecosog kibivne ofpanuju eprudi wi ma pi go gov hot fenulren ufiamihe puz okjiwfi tadmafo 5387467238 sohzelo gabu fiek duwolho ridhenam ehu gowdirpam zufda ne ca iz hutobakan jof mekgihjof ig ofogemep tejiwenim ikmefzed.'
  //     }
  //   ];
  // },
  mounted() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  },
  computed: {
    rowData() {
      return this.$store.getters.data;
    }
  },
  methods: {
    // createRowData() {
    //   return [
    //     { name: 'Bob', age: 10 },
    //     { name: 'Harry', age: 3 },
    //     { name: 'Sally', age: 20 },
    //     { name: 'Mary', age: 5 },
    //     { name: 'John', age: 15 },
    //     { name: 'Bob', age: 10 },
    //     { name: 'Harry', age: 3 },
    //     { name: 'Sally', age: 20 },
    //     { name: 'Mary', age: 5 },
    //     { name: 'John', age: 15 },
    //     { name: 'Jack', age: 25 },
    //     { name: 'Sue', age: 43 },
    //     { name: 'Sean', age: 44 },
    //     { name: 'Niall', age: 2 },
    //     { name: 'Alberto', age: 32 },
    //     { name: 'Fred', age: 53 },
    //     { name: 'Jenny', age: 34 },
    //     { name: 'Larry', age: 13 }
    //   ];
    // },
    // createColumnDefs() {
    //   return [
    //     {
    //       headerName: 'Name',
    //       field: 'name',
    //       width: 400
    //     },
    //     {
    //       headerName: 'Age',
    //       field: 'age',
    //       width: 399
    //     }
    //   ];
    // },
    createColumnDefs() {
      return [
        { headerName: '#', cellRenderer: params => params.rowIndex + 1, width: 50, cellStyle: { 'text-align': 'right' } },
        { headerName: 'Date', field: 'date', filter: 'date' },
        { headerName: 'Seed', field: 'seed', filter: 'number' },
        { headerName: 'Activity Type', field: 'activityType' },
        { headerName: 'Tower', field: 'tower', filter: 'number' },
        { headerName: 'Contacts', field: 'contact', filter: 'number' },
        { headerName: 'Location', cellRenderer(params) { return params.data.latitude && params.data.longitude ? `${params.data.latitude}, ${params.data.longitude}` : ''; } }
      ];
    },

    // calculateRowCount() {
    //   if (this.gridOptions.api && this.rowData) {
    //     const model = this.gridOptions.api.getModel();
    //     const totalRows = this.rowData.length;
    //     const processedRows = model.getRowCount();
    //     this.rowCount = `${processedRows.toLocaleString()} / ${totalRows.toLocaleString()}`;
    //   }
    // },

    onWindowResize() {
      // console.log('resize');
      if (this.gridOptions) {
        this.gridOptions.api.sizeColumnsToFit();
      }
    },

    onModelUpdated() {
      // console.log('onModelUpdated');
      // this.calculateRowCount();
    },

    onReady() {
      // console.log('onReady');
      // this.calculateRowCount();
    },

    onCellClicked(__event) {
      // console.log(`onCellClicked: ${event.rowIndex} ${event.colDef.field}`);
    },

    onCellValueChanged(__event) {
      // console.log(`onCellValueChanged: ${event.oldValue} to ${event.newValue}`);
    },

    onCellDoubleClicked(__event) {
      // console.log(`onCellDoubleClicked: ${event.rowIndex} ${event.colDef.field}`);
    },

    onCellContextMenu(__event) {
      // console.log(`onCellContextMenu: ${event.rowIndex} ${event.colDef.field}`);
    },

    onCellFocused(__event) {
      // console.log(`onCellFocused: (${event.rowIndex},${event.colIndex})`);
    },

    // taking out, as when we 'select all', it prints to much to the console!!
    onRowSelected(__event) { // eslint-disable-line no-unused-vars
      // console.log(`onRowSelected: ${event.node.data.name}`);
    },

    onSelectionChanged() {
      // console.log('selectionChanged');
    },

    onBeforeFilterChanged() {
      // console.log('beforeFilterChanged');
    },

    onAfterFilterChanged() {
      // console.log('afterFilterChanged');
    },

    onFilterModified() {
      // console.log('onFilterModified');
    },

    onBeforeSortChanged() {
      // console.log('onBeforeSortChanged');
    },

    onAfterSortChanged() {
      // console.log('onAfterSortChanged');
    },

    onVirtualRowRemoved(__event) {
      // because this event gets fired LOTS of times, we don't print it to the
      // console. if you want to see it, just uncomment out this line
      // console.log('onVirtualRowRemoved: ' + event.rowIndex);
    },

    onRowClicked(__event) {
      // console.log(`onRowClicked: ${event.node.data.name}`);
    },

    onQuickFilterChanged(event) {
      this.gridOptions.api.setQuickFilter(event.target.value);
    },

    // here we use one generic event to handle all the column type events.
    // the method just prints the event name
    onColumnEvent(__event) {
      // console.log(`onColumnEvent: ${event}`);
    }
  }
};
</script>

<style lang="scss">
@import "../../node_modules/ag-grid/dist/styles/ag-grid.css";
@import "../../node_modules/ag-grid/dist/styles/theme-fresh.css";
</style>
