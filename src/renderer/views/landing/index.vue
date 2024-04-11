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
	</div>
</template>

<script>
import cTable from "@/components/cTable"
export default {
	name: '',
	components: {
		cTable
	},
	data() {
		return {
			currentAPI: '',
		};
	},
	methods: {
		deleteAll() {
			// todo: opens modal to input  
			console.log("deleteAll")
		},
		newAPI() {
			// todo: opens modal to input  
			console.log("newAPI")
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