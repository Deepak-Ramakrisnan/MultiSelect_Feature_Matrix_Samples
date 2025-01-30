/**
 * MultiSelect Sample
 */
import { MultiSelect } from '../../src/multi-select/index';
import { L10n, setCulture} from '@syncfusion/ej2-base';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { FilteringEventArgs } from './../../src/drop-down-base/index';

// Sample data
const sportsData: { [key: string]: Object }[] = [
    { Id: 'game1', Game: 'Badminton' },
    { Id: 'game2', Game: 'Basketball' },
    { Id: 'game3', Game: 'Cricket' },
    { Id: 'game4', Game: 'Football' },
    { Id: 'game5', Game: 'Tennis' },
];

const groupedData: { [key: string]: Object }[] = [
    { Country: 'Australia', Sport: 'Cricket' },
    { Country: 'Australia', Sport: 'Tennis' },
    { Country: 'England', Sport: 'Cricket' },
    { Country: 'England', Sport: 'Football' },
    { Country: 'India', Sport: 'Cricket' },
    { Country: 'India', Sport: 'Badminton' },
];

// Default MultiSelect
const defaultMultiSelect = new MultiSelect({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    placeholder: 'Select games'
});
defaultMultiSelect.appendTo('#default');

// MultiSelect with Checkbox mode
const checkboxMultiSelect = new MultiSelect({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    mode: 'CheckBox',
    showSelectAll: true,
    placeholder: 'Select games'
});
checkboxMultiSelect.appendTo('#checkbox');

// MultiSelect with Delimiter mode
const delimiterMultiSelect = new MultiSelect({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    mode: 'Delimiter',
    delimiterChar: ' - ',
    placeholder: 'Select games'
});
delimiterMultiSelect.appendTo('#delimiter');

// MultiSelect with Custom Value
const customValueMultiSelect = new MultiSelect({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    allowCustomValue: true,
    placeholder: 'Select or enter games'
});
customValueMultiSelect.appendTo('#customValue');

// MultiSelect with Grouping
const groupingMultiSelect = new MultiSelect({
    dataSource: groupedData,
    fields: { text: 'Sport', value: 'Sport', groupBy: 'Country' },
    placeholder: 'Select sports'
});
groupingMultiSelect.appendTo('#grouping');

// MultiSelect with Filtering
const filteringMultiSelect = new MultiSelect({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    allowFiltering: true,
    filterBarPlaceholder: 'Search games',
    placeholder: 'Select games'
});
filteringMultiSelect.appendTo('#filtering');

// MultiSelect with Template
const templateMultiSelect = new MultiSelect({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    itemTemplate: '<span><i class="sports-icon ${Id}"></i>${Game}</span>',
    headerTemplate: '<h4>Select your favorite games</h4>',
    footerTemplate: '<h4>Total ${value.length} games selected</h4>',
    placeholder: 'Select games'
});
templateMultiSelect.appendTo('#template');

// MultiSelect with Virtualization
const virtualizationMultiSelect = new MultiSelect({
    dataSource: (new Array(5000) as any).fill(0).map((_, i) => ({ Id: `game${i}`, Game: `Game ${i}` })),
    fields: { text: 'Game', value: 'Id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Select games'
});
virtualizationMultiSelect.appendTo('#virtualization');

