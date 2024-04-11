const tableAPICols = [
	{
		title: 'Name',
		key: 'name',
	},
	{
		title: 'Path',
		key: 'path',
	},
	{
		title: 'URL',
		key: 'url',
		align: 'center',
		slot: 'url',
	},
	{
		title: 'Status',
		key: 'status',
		align: 'center',
		slot: 'status',
		width: 100
	},
	{
		title: 'Action',
		key: 'action',
		fixed: 'right',
		align: 'center',
		slot: 'action',
		width: 180,
	}
];

export {
	tableAPICols
}