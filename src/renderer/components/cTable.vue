<template>

	<div>
		<Table border :columns="columns" :data="tableData" :no-data-text="'Empty'">

			<template slot-scope="{ row, index }" slot="url">
				<div style="display: flex;align-items: center;justify-content: center;">
					<span>{{ row.url }}</span>
					<Icon type="md-copy" color="#2d8cf0" size="20" style="margin-left: 10px;cursor: pointer;"
						@click="copy(row.url)" />
				</div>
			</template>

			<template slot-scope="{ row, index }" slot="isActivate">
				<span :style="{
			color: row.isActivate ? '#19be6b' : 'red'
		}">{{ row.isActivate ? 'Running' : 'None' }}</span>
			</template>

			<template slot-scope="{ row, index }" slot="action">
				<Button v-if="!row.isActivate" type="warning" size="small"
					@click="showDeleteModal(index);">Delete</Button>
				<Button v-if="row.isActivate" type="error" size="small" @click="shutDown(index)">Shutdown</Button>
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

var cmd = require("node-cmd");

import { kill, killer } from 'cross-port-killer';
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
			showDeleteApi_loading: false,
			cli_install_loading: false,
		}
	},
	created() {
		this.refreshPort();
	},
	mounted() {
		this.getData();
	},
	methods: {
		async refreshPort() {
			if (fn.localStorage.get('CURRENT_PORT')) {
				this.killPort(fn.localStorage.get('CURRENT_PORT'))
				const delay = (ms) => new Promise(res => setTimeout(res, ms));
				await delay(1000)
				fn.localStorage.remove("CURRENT_PORT");
			}
		},
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
		getPort(url) {
			try {
				const parsedUrl = new URL(url);
				// return parsedUrl.port || "default port for " + parsedUrl.protocol;
				return parsedUrl.port || null;
			} catch (error) {
				console.error("Invalid URL:", error);
				return null; // or handle the error differently
			}
		},
		killPort(port) {
			var self = this
			kill(port).then(pids => {
				console.log(pids)
				// self.$Message.warning({
				// 	content: 'Killed existing running port',
				// 	duration: 3
				// });
			})
		},
		parsePort(url) {
			let port = '';
			return port;
		},
		async activate(index) {
			if (!this.getPort(this.tableData[index].url)) {
				this.$Message.error('Error running, please check url.');
				return
			}

			let hasActive = this.tableData.find(item => item.isActivate);

			if (hasActive) {
				this.$Message.error('Please shutdown currently running API and try again.');
				return
			} else {
				this.tableData[index].isActivate = true;
			}

			await this.refreshPort();
			fn.localStorage.set("CURRENT_PORT", this.getPort(this.tableData[index].url))

			this.$emit('on-running', this.tableData[index])

			this.cli_install_loading = true;
			let cli_command = `node ${this.tableData[index].path}`;

			var self = this
			cmd.run(cli_command, function (err, data, stderr) {
				if (!err && data) {

					setTimeout(() => {
						self.$Message.success('Success');
						self.cli_install_loading = false;
					}, 500);

				} else {

					setTimeout(() => {
						// self.$Message.error('Error running');
						self.cli_install_loading = false;
						self.tableData[index].isActivate = false;
						self.$emit('on-stop-running', null)
					}, 500)
				}

				console.log("err", err);
				console.log("data", data);
				console.log("stderr", stderr);
			});
		},
		shutDown(index) {
			this.tableData[index].isActivate = false;
			this.$emit('on-stop-running', null);
			this.killPort(fn.localStorage.get('CURRENT_PORT'))
			fn.localStorage.remove("CURRENT_PORT");
		},
		copy(url) {
			fn.copyText(url, () => {
				this.$Message.success('Copied');
			})
		},
		showDeleteModal(index) {
			let hasActive = this.tableData.find(item => item.isActivate);

			if (hasActive) {
				this.$Message.error('Please shutdown currently running API before deleting an item.');
				return
			}

			this.api_index = index;
			this.showDeleteApi = true;
		},
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