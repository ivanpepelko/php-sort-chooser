const sorts = [
    {
        name: 'array_multisort()',
        sortBy: 'value',
        maintainKey: true,
        order: 'first_array_or_sort_options',
        url: 'https://php.net/manual/en/function.array-multisort.php',
        signature: `bool array_multisort ( 
            array &$array1 
            [, mixed $array1_sort_order = SORT_ASC 
            [, mixed $array1_sort_flags = SORT_REGULAR 
            [, mixed $... ]]] 
        )`,
    },
    {
        name: 'asort()',
        sortBy: 'value',
        maintainKey: true,
        order: 'asc',
        url: 'https://php.net/manual/en/function.asort.php',
        signature: 'bool asort ( array &$array [, int $sort_flags = SORT_REGULAR ] )',
    },
    {
        name: 'arsort()',
        sortBy: 'value',
        maintainKey: true,
        order: 'desc',
        url: 'https://php.net/manual/en/function.arsort.php',
        signature: 'bool arsort ( array &$array [, int $sort_flags = SORT_REGULAR ] )',
    },
    {
        name: 'krsort()',
        sortBy: 'key',
        maintainKey: true,
        order: 'desc',
        url: 'https://php.net/manual/en/function.krsort.php',
        signature: 'bool krsort ( array &$array [, int $sort_flags = SORT_REGULAR ] )',
    },
    {
        name: 'ksort()',
        sortBy: 'key',
        maintainKey: true,
        order: 'asc',
        url: 'https://php.net/manual/en/function.ksort.php',
        signature: 'bool ksort ( array &$array [, int $sort_flags = SORT_REGULAR ] )',
    },
    {
        name: 'natcasesort()',
        sortBy: 'value',
        maintainKey: true,
        order: 'natural_case_insensitive',
        url: 'https://php.net/manual/en/function.natcasesort.php',
        signature: 'bool natcasesort ( array &$array )',
    },
    {
        name: 'natsort()',
        sortBy: 'value',
        maintainKey: true,
        order: 'natural',
        url: 'https://php.net/manual/en/function.natsort.php',
        signature: 'bool natsort ( array &$array )',
    },
    {
        name: 'rsort()',
        sortBy: 'value',
        maintainKey: false,
        order: 'desc',
        url: 'https://php.net/manual/en/function.rsort.php',
        signature: 'bool rsort ( array &$array [, int $sort_flags = SORT_REGULAR ] )',
    },
    {
        name: 'shuffle()',
        sortBy: 'value',
        maintainKey: false,
        order: 'random',
        url: 'https://php.net/manual/en/function.shuffle.php',
        signature: 'bool shuffle ( array &$array )',
    },
    {
        name: 'sort()',
        sortBy: 'value',
        maintainKey: false,
        order: 'asc',
        url: 'https://php.net/manual/en/function.sort.php',
        signature: 'bool sort ( array &$array [, int $sort_flags = SORT_REGULAR ] )',
    },
    {
        name: 'uasort()',
        sortBy: 'value',
        maintainKey: true,
        order: 'user_defined',
        url: 'https://php.net/manual/en/function.uasort.php',
        signature: 'bool uasort ( array &$array , callable $value_compare_func )',
    },
    {
        name: 'uksort()',
        sortBy: 'key',
        maintainKey: true,
        order: 'user_defined',
        url: 'https://php.net/manual/en/function.uksort.php',
        signature: 'bool uksort ( array &$array , callable $key_compare_func )',
    },
    {
        name: 'usort()',
        sortBy: 'value',
        maintainKey: false,
        order: 'user_defined',
        url: 'https://php.net/manual/en/function.uksort.php',
        signature: 'bool uksort ( array &$array , callable $key_compare_func )',
    },
];

const orderTypes = {};
for (const type of [...new Set(sorts.map(s => s.order))].sort()) {
    orderTypes[type] = true;
}

const columns = [
    { name: 'name', label: 'Name', field: 'name', align: 'center' },
    { name: 'sortBy', label: 'Sort by', field: 'sortBy', align: 'center' },
    { name: 'maintainKey', label: 'Maintain key association', field: 'maintainKey', align: 'center' },
    { name: 'order', label: 'Order', field: 'order', align: 'center' },
    { name: 'signature', label: 'Signature', field: 'signature', align: 'center' },
];

const app = Vue.createApp({
    data() {
        return {
            sortBy: 'any',
            keysAssociation: 'both',
            sorts,
            orderTypes,
            columns,
        };
    },
    methods: {
        filter() {
            this.sorts = sorts.filter(sort => {
                if (orderTypes[sort.order]) {
                    if (this.sortBy !== 'any') {
                        return sort.sortBy === this.sortBy;
                    }

                    if (this.keysAssociation !== 'both') {
                        const maintain = this.keysAssociation === 'yes';
                        return sort.maintainKey === maintain;
                    }
                }

                return false;
            });
        },
        allOrders(value) {
            for (const type in this.orderTypes) {
                this.orderTypes[type] = value;
            }
        },
    },
});

app.use(Quasar, { config: { dark: true } });
app.mount('#app');