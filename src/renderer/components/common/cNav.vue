<template>
	<div class="c-nav">
		<div>
			<div class="title">Fake Server API</div>
			<div class="btn-options">
				<Button :disabled="loadingClose" type="error" @click="close()">Close
					<Icon type="ios-undo" size="20" />
				</Button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'cNav',
	data() {
		return {
			loadingClose: false
		};
	},
	mounted() { },
	methods: {
		close() {
			// todo: add warning modal

			this.loadingClose = true;
			this.$emit("on-close", true)
			setTimeout(() => {
				this.loadingClose = false;
				this.$emit("on-closed", false)
			}, 500);
		}
	}
}
</script>

<style>
.c-nav {
	padding: 0px 10px;
	border-bottom: 1px solid #eee;
	-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .3), 0 1px 3px 1px rgba(0, 0, 0, .15);
	box-shadow: 0 1px 1px rgba(0, 0, 0, .3), 0 1px 3px 1px rgba(0, 0, 0, .15);
}

.c-nav>div {
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 50px;
}

.title {
	font-weight: bold;
	font-size: 16px;

}
</style>