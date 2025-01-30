/**
 * MultiSelect Sample
 */
import { MultiSelect,SelectEventArgs, FilteringEventArgs  } from '../../src/multi-select/index';

// Generate a large dataset
const generateLargeDataset = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `item${i}`,
        text: `Item ${i}`,
        group: `Group ${Math.floor(i / 100)}`,
        description: `This is a long description for Item ${i} to test varying item heights`,
        number: i,
        boolean: i % 2 === 0
    }));
};

const largeDataset = generateLargeDataset(10000);

// Basic Virtualization
const basicVirtualization = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Select items',
   // actionComplete: () => console.log("Items rendered:", basicVirtualization.list.querySelectorAll('li').length)
});
basicVirtualization.appendTo('#basicVirtualization');

// Different Data Types
const dataTypes = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Select items of different types',
    itemTemplate: '${text} - ${number} - ${boolean}'
});
dataTypes.appendTo('#dataTypes');

// Selection Test
const selectionTest = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Test selection',
    mode: 'CheckBox',
    showSelectAll: true,
    select: (e: SelectEventArgs) => {
        console.log("Selected item:", e.itemData);
    }
});
selectionTest.appendTo('#selectionTest');

// Filtering Test
const filteringTest = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Filter and select',
    allowFiltering: true,
    filtering: (e: FilteringEventArgs) => {
        let query = new Query();
        query = (e.text !== '') ? query.where('text', 'startswith', e.text, true) : query;
        e.updateData(largeDataset, query);
    }
});
filteringTest.appendTo('#filteringTest');

// Grouping Test
const groupingTest = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id', groupBy: 'group' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Select grouped items',
    mode: 'CheckBox',
    showSelectAll: true,
    enableGroupCheckBox: true
});
groupingTest.appendTo('#groupingTest');

// Hide Selected Test
const hideSelectedTest = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Hide selected items',
    hideSelectedItem: true
});
hideSelectedTest.appendTo('#hideSelectedTest');

// Close on Select Test
const closeOnSelectTest = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Close on select',
    closePopupOnSelect: true
});
closeOnSelectTest.appendTo('#closeOnSelectTest');

// Scroll Restoration Test
const scrollRestoration = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Test scroll restoration',
    closePopupOnSelect: false
});
scrollRestoration.appendTo('#scrollRestoration');

// Different List Heights Test
const heightTest = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Test different heights',
    itemTemplate: '<div style="height: ${number % 3 === 0 ? "60px" : "30px"}">${text}</div>'
});
heightTest.appendTo('#heightTest');

// Accessibility Test
const accessibilityTest = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Test accessibility',
    mode: 'CheckBox'
});
accessibilityTest.appendTo('#accessibilityTest');

// Keyboard Navigation Test
const keyboardTest = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Test keyboard navigation'
});
keyboardTest.appendTo('#keyboardTest');

// Combined Features Test
const combinedFeaturesTest = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id', groupBy: 'group' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Test combined features',
    mode: 'CheckBox',
    showSelectAll: true,
    enableGroupCheckBox: true,
    allowFiltering: true,
    hideSelectedItem: true,
    closePopupOnSelect: false
});
combinedFeaturesTest.appendTo('#combinedFeaturesTest');

// Custom Template Test
const customTemplateTest = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Test custom templates',
    itemTemplate: '<div><strong>${text}</strong><p>${description}</p></div>',
    headerTemplate: '<h4>Select from ${items.length} items</h4>',
    footerTemplate: '<h4>${value.length} item(s) selected</h4>'
});
customTemplateTest.appendTo('#customTemplateTest');

// Data Update Test
const dataUpdateTest = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Test data updates'
});
dataUpdateTest.appendTo('#dataUpdateTest');

// Dynamic data updates
document.getElementById('addItems').addEventListener('click', () => {
    const newItems = generateLargeDataset(1000);
    largeDataset.push(...newItems);
    dataUpdateTest.dataSource = largeDataset;
});

document.getElementById('removeItems').addEventListener('click', () => {
    largeDataset.splice(largeDataset.length - 1000, 1000);
    dataUpdateTest.dataSource = largeDataset;
});

document.getElementById('sortItems').addEventListener('click', () => {
    largeDataset.sort((a, b) => a.text.localeCompare(b.text));
    dataUpdateTest.dataSource = largeDataset;
});

document.getElementById('toggleVirtualization').addEventListener('click', () => {
    dataUpdateTest.enableVirtualization = !dataUpdateTest.enableVirtualization;
});

// Performance measurements
console.time('Initialization');
const perfTest = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    popupHeight: '300px',
    placeholder: 'Performance test'
});
perfTest.appendTo('#performance');
console.timeEnd('Initialization');

// Scroll performance test
perfTest.addEventListener('open', () => {
    console.time('Scroll Test');
    const scrollElement = perfTest.list.parentElement;
    let scrollTop = 0;
    const scrollInterval = setInterval(() => {
        scrollElement.scrollTop = scrollTop;
        scrollTop += 100;
        if (scrollTop >= scrollElement.scrollHeight) {
            clearInterval(scrollInterval);
            console.timeEnd('Scroll Test');
        }
    }, 20);
});

// Stress test
const stressTest = () => {
    console.time('Stress Test');
    for (let i = 0; i < 100; i++) {
        perfTest.value = [largeDataset[i].id];
        perfTest.dataBind();
        perfTest.value = null;
        perfTest.dataBind();
    }
    console.timeEnd('Stress Test');
};

setTimeout(stressTest, 5000);  // Run stress test after 5 seconds


