<template>
	<div class="body-wrapper landing">

		<Card dis-hover>
			<p slot="title">
				<Icon type="ios-flash" :color="currentAPI ? '#19be6b' : 'red'" size="28" />
				<span>Running: <span style="font-weight: bold;font-size: 16px;text-transform: uppercase;">{{ currentAPI
					? currentAPI : 'None' }}</span></span>
			</p>
			<a href="#" slot="extra">
				<Button @click.prevent="deleteAll" type="error">Delete All
					<Icon class="trash-icon" type="md-trash" size="20" />
				</Button>

				<Button @click.prevent="newAPI" type="success">New API
					<Icon type="md-add" size="20" />
				</Button>
			</a>

			<div>
				<cTable></cTable>
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
								<Icon type="md-folder" size="32" style="cursor: pointer;" />
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

	</div>
</template>

<script>
import cTable from "@/components/cTable"
import cModal from "@/components/common/cModal"
const fs = require("fs");
const path = require("path");

console.log("fs", fs)
console.log("path", path)

export default {
	name: '',
	components: {
		cTable,
		cModal
	},
	data() {
		return {
			currentAPI: '',
			showModalNewAPI: false,
			showModalNewAPI_loading: false,

			formValidate: {
				name: 'test',
				url: 'https://jsdoc.app/about-getting-started',
				path: 'D:\\ThinkbitSolutionsProjects\\projects\\local-test-server\\index.js',
				// path: 'D:\\ThinkbitSolutionsProjects\\projects\\local-test-server\\README.md',
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
			}
		}
	},
	methods: {
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

					this.saveNewAPI()
				} else {
					this.$Message.error('Please fill all required fields!');
				}
			})
		},
		saveNewAPI() {
			this.$Message.success('Success!');

			this.showModalNewAPI = false
			console.log("saveNewAPI")
		},
		deleteAll() {
			// todo: opens modal to input  
			console.log("deleteAll")
		},
		newAPI() {
			// todo: opens modal to input  
			// console.log("newAPI")
			this.showModalNewAPI = true;
		}
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