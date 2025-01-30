/**
 * MultiSelect Sample
 */
import { MultiSelect,CustomValueEventArgs } from '../../src/multi-select/index';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { FilteringEventArgs,SelectEventArgs } from './../../src/drop-down-base/index';


// Generate a large dataset
const generateLargeDataset = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `item${i}`,
        text: `Item ${i}`,
        group: `Group ${Math.floor(i / 100)}`,
    }));
};

const largeDataset = generateLargeDataset(10000);

// Helper function to log messages
const log = (message: string) => {
    const logElement = document.getElementById('log');
    logElement.innerHTML += `<p>${message}</p>`;
};

// 1. Default mode with custom value
const defaultCustomValue = new MultiSelect({
    dataSource: largeDataset.slice(0, 100),
    fields: { text: 'text', value: 'id' },
    placeholder: 'Select or add items',
    allowCustomValue: true,
    mode: 'Default',
    select: (e: SelectEventArgs) => {
        log(`Selected: ${e.itemData.text}`);
    },
    customValueSelection: (e: CustomValueEventArgs) => {
       // log(`Custom value added: ${e.newData}`);
    }
});
defaultCustomValue.appendTo('#defaultCustomValue');

// 2. Default mode with filtering
const defaultFiltering = new MultiSelect({
    dataSource: largeDataset.slice(0, 1000),
    fields: { text: 'text', value: 'id' },
    placeholder: 'Filter and select items',
    allowFiltering: true,
    mode: 'Default',
    filtering: (e: FilteringEventArgs) => {
        let query = new Query();
        query = (e.text !== '') ? query.where('text', 'startswith', e.text, true) : query;
        e.updateData(largeDataset.slice(0, 1000), query);
      //  log(`Filtering with: ${e.text}`);
    }
});
defaultFiltering.appendTo('#defaultFiltering');

// 3. Default mode with virtualization
const defaultVirtualization = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    placeholder: 'Select from virtualized list',
    enableVirtualization: true,
    popupHeight: '300px',
    mode: 'Default',
    actionComplete: () => {
        log(`Virtualized items rendered: ${defaultVirtualization.list.querySelectorAll('li').length}`);
    }
});
defaultVirtualization.appendTo('#defaultVirtualization');

// 4. Default mode with selection order
const defaultSelectionOrder = new MultiSelect({
    dataSource: largeDataset.slice(0, 100),
    fields: { text: 'text', value: 'id' },
    placeholder: 'Select items (order matters)',
    mode: 'Default',
    enableSelectionOrder: true,
    select: (e: SelectEventArgs) => {
      //  log(`Selected in order: ${defaultSelectionOrder.value.join(', ')}`);
    }
});
defaultSelectionOrder.appendTo('#defaultSelectionOrder');

// 5. Default mode with combined features
const defaultCombined = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    placeholder: 'Combined features',
    mode: 'Default',
    allowCustomValue: true,
    allowFiltering: true,
    enableVirtualization: true,
    enableSelectionOrder: true,
    popupHeight: '300px',
    select: (e: SelectEventArgs) => {
        log(`Combined - Selected: ${e.itemData.text}`);
    },
    customValueSelection: (e: CustomValueEventArgs) => {
        //log(`Combined - Custom value added: ${e.text}`);
    },
    filtering: (e: FilteringEventArgs) => {
        let query = new Query();
        query = (e.text !== '') ? query.where('text', 'startswith', e.text, true) : query;
        e.updateData(largeDataset, query);
        log(`Combined - Filtering with: ${e.text}`);
    }
});
defaultCombined.appendTo('#defaultCombined');

// Button event handlers
document.getElementById('addCustomValue').addEventListener('click', () => {
    const customValue = `Custom_${Date.now()}`;
    defaultCustomValue.addItem({ id: customValue, text: customValue });
    defaultCombined.addItem({ id: customValue, text: customValue });
    log(`Custom value added to both instances: ${customValue}`);
});

document.getElementById('selectAll').addEventListener('click', () => {
    defaultVirtualization.selectAll(true);
    log(`Selected all items in virtualized list`);
});

document.getElementById('clearSelection').addEventListener('click', () => {
    defaultVirtualization.selectAll(false);
    log(`Cleared all selections in virtualized list`);
});

// Keyboard navigation test
document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.target && (e.target as HTMLElement).id === 'defaultCombined') {
        switch(e.key) {
            case 'ArrowDown':
                log('Keyboard: ArrowDown');
                break;
            case 'ArrowUp':
                log('Keyboard: ArrowUp');
                break;
            case 'Enter':
                log('Keyboard: Enter');
                break;
            case 'Escape':
                log('Keyboard: Escape');
                break;
        }
    }
});

// Performance test
console.time('Initialization');
const perfTest = new MultiSelect({
    dataSource: largeDataset,
    fields: { text: 'text', value: 'id' },
    enableVirtualization: true,
    mode: 'Default',
    allowFiltering: true,
    enableSelectionOrder: true,
    popupHeight: '300px',
});
perfTest.appendTo(document.createElement('div'));
console.timeEnd('Initialization');


