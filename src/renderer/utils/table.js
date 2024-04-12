const tableAPICols = [
	// {
	// 	title: 'ID',
	// 	key: 'id',
	// 	align: 'center',
	// 	width: 50
	// },
	{
		title: 'Name',
		key: 'name',
	},
	{
		title: 'Path',
		key: 'path',
		slot: 'path',
	},
	{
		title: 'URL',
		key: 'url',
		align: 'center',
		slot: 'url',
	},
	{
		title: 'Status',
		key: 'isActivate',
		align: 'center',
		slot: 'isActivate',
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