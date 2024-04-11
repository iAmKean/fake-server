<template>

	<div>
		<Table border :columns="columns" :data="tableData" :no-data-text="'Empty'">

			<template slot-scope="{ row, index }" slot="url">
				<div style="display: flex;align-items: center;justify-content: center;">
					<span>{{ row.url }}</span>
					<Icon type="md-copy" color="#2d8cf0" size="20" style="margin-left: 10px;cursor: pointer;"
						@click="copy(row)" />
				</div>
			</template>

			<template slot-scope="{ row, index }" slot="status">
				<span :style="{
			color: row.status ? '#19be6b' : 'red'
		}">{{ row.status ? 'Running' : 'None' }}</span>
			</template>

			<template slot-scope="{ row, index }" slot="action">
				<Button v-if="!row.status" type="warning" size="small"
					@click="api_index = index; showDeleteApi = true;">Delete</Button>
				<Button v-if="row.status" type="error" size="small" @click="shutDown(index)">Shutdown</Button>
				<Button v-else type="success" size="small" @click="activate(index)">Activate</Button>
			</template>

		</Table>


		<cModal :width="350" :title="'Delete'" :okText="'Confirm'" :showModal="showDeleteApi" :type="'error'"
			:isClickOK="showDeleteApi_loading" @ok="deleteData(api_index)" @close="showDeleteApi = false;">
			<template slot="bodycontent">
				<div style="text-align: center">
					Are you sure you want to delete this item?
				</div>
			</template>
		</cModal>
	</div>

</template>
<script>

import { tableAPICols } from "@/utils/table";
import { fn } from "@/utils/fn";
import cModal from "@/components/common/cModal"

export default {
	components: {
		cModal
	},
	data() {
		return {
			columns: tableAPICols,
			tableData: [],
			api_index: -1,
			showDeleteApi: false,
			showDeleteApi_loading: false
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
					this.tableData = [];
				}
				this.showDeleteApi = false;
				this.showDeleteApi_loading = false;

				this.$emit("get-table-data", this.tableData)
			}, 1000);
		},
		activate() { },
		shutDown() { },
		copy() { },
		deleteData(index) {
			var temp = fn.localStorage.get('API_DATA');
			temp = fn.serilizer.deserialize(temp);
			temp.splice(index, 1);
			this.showDeleteApi_loading = true;
			fn.localStorage.set('API_DATA', fn.serilizer.serialize(temp));
			this.getData();
		}
	}
}
</script>

<style></style>