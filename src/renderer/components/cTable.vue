<template>
	<Table border :columns="columns" :data="tableData" :no-data-text="'Empty'">

		<template slot-scope="{ row, index }" slot="url">
			<span>{{ row.url }}</span>
			<Icon type="md-copy" color="#2d8cf0" size="20" style="margin-left: 10px;cursor: pointer;"
				@click="copy(row)" />
		</template>

		<template slot-scope="{ row, index }" slot="status">
			<span :style="{
		color: row.status ? '#19be6b' : 'red'
	}">{{ row.status ? 'Running' : 'None' }}</span>
		</template>

		<template slot-scope="{ row, index }" slot="action">
			<Button v-if="!row.status" type="warning" size="small" @click="activate(index)">Delete</Button>
			<Button v-if="row.status" type="error" size="small" @click="shutDown(index)">Shutdown</Button>
			<Button v-else type="success" size="small" @click="activate(index)">Activate</Button>
		</template>

	</Table>
</template>
<script>

import { tableAPICols } from "@/utils/table";
import { fn } from "@/utils/fn";

export default {
	data() {
		return {
			columns: tableAPICols,
			tableData: [],
		}
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			setTimeout(() => {
				if (fn.localStorage.get('API_DATA')) {
					var temp = fn.localStorage.get('API_DATA');
					temp = fn.serilizer.deserialize(temp);
					this.tableData = temp;
				} else {

				}
			}, 1000);
		},
		activate() { },
		shutDown() { },
		copy() { },
	}
}
</script>

<style></style>