<template>
	<div class="body-wrapper landing">

		<Card dis-hover>
			<p slot="title">
				<Icon type="ios-flash" :color="currentRunningAPI ? '#19be6b' : 'red'" size="28" />
				<span>Running: <span style="font-weight: bold;font-size: 16px;text-transform: uppercase;">{{
					currentRunningAPI
						? currentRunningAPI.name + '::' + currentRunningAPI.url : 'None' }}</span></span>
				<Icon v-if="currentRunningAPI" type="md-copy" color="#2d8cf0" size="20"
					style="margin-left: 10px;cursor: pointer;" @click="copy()" />
			</p>
			<a href="#" slot="extra">
				<Button @click.prevent="downloadTemplate()" type="primary">Get Template
					<Icon type="md-code-download" size="20" />
				</Button>

				<Button :disabled="tableData.length == 0" @click.prevent="showDeleteApi = true;" type="error">Delete All
					<Icon class="trash-icon" type="md-trash" size="20" />
				</Button>

				<Button @click.prevent="newAPI" type="success">New API
					<Icon type="md-add" size="20" />
				</Button>
			</a>

			<div>
				<cTable ref="cTable" @on-running="onRunning($event)" @on-stop-running="onOnStopRunning($event)"
					@get-table-data="getTableData($event)"></cTable>
			</div>
		</Card>

		<cModal :width="520" :title="'Create New API'" :okText="'Save'" :showModal="showModalNewAPI"
			:isClickOK="showModalNewAPI_loading" @ok="handleSubmit('formValidate')" @close="showModalNewAPI = false;">
			<template slot="bodycontent">
				<div>
					<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
						<FormItem label="Name" prop="name">
							<Input v-model="formValidate.name" placeholder="Enter name"></Input>
						</FormItem>

						<FormItem label="Path" prop="path">
							<div style="display: flex;">
								<Input v-model="formValidate.path"
									placeholder="Enter path ex: C:\code\node-server\index.js"></Input>
								<span style="margin:0px 5px;font-size: 14px;">or</span>
								<Icon @click="selectFilePath()" type="md-folder" size="32" style="cursor: pointer;" />
							</div>

						</FormItem>

						<FormItem label="URL" prop="url">
							<Input v-model="formValidate.url"
								placeholder="Enter URL ex: http://localhost:3000/"></Input>
						</FormItem>

					</Form>
				</div>
			</template>
		</cModal>

		<cModal :width="350" :title="'Delete All'" :okText="'Confirm'" :showModal="showDeleteApi" :type="'error'"
			:isClickOK="showDeleteApi_loading" @ok="deleteAll()" @close="showDeleteApi = false;">
			<template slot="bodycontent">
				<div style="text-align: center">
					Are you sure you want to delete all items?
				</div>
			</template>
		</cModal>

		<cModal :width="350" :title="'Success Download'" :okText="'Install Now'" :showModal="showInstall"
			:type="'warning'" :isClickOK="showInstall_loading" @ok="confirmInstall()" @close="showInstall = false;">
			<template slot="bodycontent">
				<div style="text-align: center">
					Want to run <span style="font-weight: bold;">npm install</span>?
				</div>
			</template>
		</cModal>

	</div>
</template>

<script>
import cTable from "@/components/cTable"
import cModal from "@/components/common/cModal"
import { remote } from "electron";
import { ipcRenderer } from "electron";
const fs = require("fs");
const path = require("path");
var cmd = require("node-cmd");

import { fn } from "@/utils/fn";
export default {
	name: '',
	components: {
		cTable,
		cModal
	},
	data() {
		return {
			selected_path: '',
			currentRunningAPI: null,
			currentAPI: '',
			showModalNewAPI: false,
			showModalNewAPI_loading: false,
			showDeleteApi: false,
			showDeleteApi_loading: false,
			showInstall: false,
			showInstall_loading: false,
			tableData: [],
			formValidate: {
				// name: 'test',
				// url: 'https://jsdoc.app/about-getting-started',
				// path: 'D:\\ThinkbitSolutionsProjects\\projects\\local-test-server\\index.js',
				name: '',
				url: 'http://127.0.0.1:7001/', //default
				path: '',

				id: null,
				isActivate: false
			},
			ruleValidate: {
				name: [
					{ required: true, message: 'The name cannot be empty', trigger: 'blur' }
				],
				url: [
					{ required: true, message: 'The url cannot be empty', trigger: 'blur' }
				],
				path: [
					{ required: true, message: 'The path cannot be empty', trigger: 'blur' }
				],
			}
		};
	},
	watch: {
		showModalNewAPI(nv, ov) {
			if (!this.showModalNewAPI) {
				this.formValidate.name = '';
				this.formValidate.url = '';
				this.formValidate.path = '';
				this.formValidate.id = null;
				this.formValidate.isActivate = false;
			}
		}
	},
	mounted() {
		var self = this
		ipcRenderer.on('download-software-success', (event, args) => {
			// console.log("download-software-success");
			// self.$Notice.success({
			// 	title: '',
			// 	desc: 'download complete'
			// });

			try {
				let config = {
					"dependencies": {
						"body-parser": "^1.20.2",
						"express": "^4.19.2",
						"nodemon": "^3.1.0"
					}
				}

				fs.writeFileSync(`${self.selected_path}\\package.json`, JSON.stringify(config, null, 4), "utf8", (err) => {
					if (err) {
						return console.log(err);
					}
					console.log('File was saved');
				});

				setTimeout(() => {
					self.$Notice.success({
						title: '',
						desc: 'Download completed!'
					});
				}, 1000);
			} catch (error) {
				console.log('File failed to create.');
				self.$Notice.success({
					title: '',
					desc: 'Download failed!'
				});
			}

		})
	},
	methods: {
		confirmInstall() {
			let cli_command = `npm install --prefix ${this.selected_path}`;
			var self = this
			this.showInstall_loading = true;
			cmd.run(cli_command, function (err, data, stderr) {
				if (!err && data) {

					setTimeout(() => {
						self.$Message.success('Npm Install success!');
						self.showInstall_loading = false;
						self.showInstall = false;
					}, 500);

				} else {

					setTimeout(() => {
						self.$Message.error('Failed to install');
						self.showInstall_loading = false;
						self.showInstall = false;
					}, 500)
				}

				console.log("err", err);
				console.log("data", data);
				console.log("stderr", stderr);
			});
		},
		downloadTemplate() {
			var dialog = this.$electron.remote.dialog;
			var selectedPath = dialog.showOpenDialog(remote.getCurrentWindow(), {
				title: "Select download path",
				defaultPath: "",
				properties: ["openDirectory"],
				buttonLabel: "Select",
			});

			if (selectedPath) {
				var path = selectedPath[0];
				this.selected_path = path;

				ipcRenderer.send('download-software-start', {
					url: 'https://iamkean.github.io/fake-server-tempate/index.js',
					properties: {
						directory: path
					}
				});
			}
		},
		copy() {
			fn.copyText(this.currentRunningAPI.url, () => {
				this.$Message.success('Copied');
			})
		},
		onRunning(e) {
			this.currentRunningAPI = e;
			console.log("this.currentRunningAPI", this.currentRunningAPI)
		},
		onOnStopRunning(e) {
			this.currentRunningAPI = null;
		},
		hasPort(url) {
			try {
				const parsedUrl = new URL(url);
				return parsedUrl.port !== "";
			} catch (error) {
				console.error("Invalid URL:", error);
				return false; // or handle the error differently
			}
		},
		isValidUrl(string) {
			try {
				new URL(string);
				return true;
			} catch (e) {
				return false;
			}
		},
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {

					if (!this.isValidUrl(this.formValidate.url)) {
						this.$Message.error({
							content: 'Please enter correct URL.',
							duration: 3
						});
						return
					}

					if (fs.existsSync(this.formValidate.path)) {
						// console.log('exists')
					} else {
						this.$Message.error({
							content: 'Please enter correct path or file not exist.',
							duration: 3
						});
						return
					}

					if (path.extname(this.formValidate.path) != '.js') {
						this.$Message.error({
							content: 'Please enter correct file. File extension must be *.js',
							duration: 3
						});
						return
					}

					if (!this.hasPort(this.formValidate.url)) {
						this.$Message.error({
							content: 'Please enter correct URL and URL should have port.',
							duration: 3
						});
						return
					}

					this.saveNewAPI()
				} else {
					this.$Message.error('Please fill all required fields!');
				}
			})
		},
		selectFilePath() {
			const win = new this.$electron.remote.BrowserWindow({
				width: 800,
				height: 600,
				alwaysOnTop: true,
				show: false,
				modal: true,
				acceptFirstMouse: true,
			});

			// var defaultPath = path.dirname(remote.process.cwd());
			// console.log("defaultPath", defaultPath)
			var dialog = this.$electron.remote.dialog;

			var selectedFilePath = dialog.showOpenDialog(win, {
				title: "Select File - *.js only",
				// defaultPath: defaultPath,
				filters: [
					{ name: "All Files", extensions: ["*"] },
					{ name: "Custom File Type", extensions: ["js"] },
				],
				buttonLabel: "Select",
			});

			if (selectedFilePath) {
				let select_path = selectedFilePath[0];
				this.formValidate.path = select_path
			} else {

			}
		},
		saveNewAPI() {
			try {
				this.showModalNewAPI_loading = true;

				var api_data = [];
				if (fn.localStorage.get('API_DATA')) {
					var temp = fn.localStorage.get('API_DATA');
					temp = fn.serilizer.deserialize(temp);
					api_data = temp;
					this.formValidate.id = api_data.length + 1;
					api_data.unshift(this.formValidate)
				} else {
					this.formValidate.id = api_data.length + 1;
					api_data.unshift(this.formValidate)
				}

				fn.localStorage.set('API_DATA', fn.serilizer.serialize(api_data));
				setTimeout(() => {
					this.$Message.success('Success!');
					this.showModalNewAPI_loading = false;
					this.showModalNewAPI = false;
					this.refreshTableData();
				}, 2000);
			} catch (error) {
				this.showModalNewAPI_loading = false;
				this.$Message.error('Error!');
			}
		},
		async refreshTableData() {
			const { cTable } = this.$refs;
			if (cTable) {
				await cTable.refreshPort();
				cTable.getData();
			}
		},
		deleteAll() {
			this.showDeleteApi_loading = true;

			fn.localStorage.remove('API_DATA');
			setTimeout(() => {
				this.showDeleteApi_loading = false;
				this.showDeleteApi = false;
			}, 1000);


			this.refreshTableData();
		},
		newAPI() {
			this.showModalNewAPI = true;
		},
		getTableData(e) {
			this.tableData = e;
		},
	}
}
</script>

<style>
.ivu-card-head p,
.ivu-card-head-inner {
	min-height: 30px;
	align-items: center;
}
</style>