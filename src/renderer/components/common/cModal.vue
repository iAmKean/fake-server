<template>
	<Modal class="c-modal" v-model="isShow" :closable="closable" :title="title" :transfer="transfer" :width="width"
		:ok-text="okText" :mask-closable="false">
		<div slot="header" class="modal-header text-size-21">
			<span>{{ title }}</span>
			<div class="close-icon" @click="cancel()">
				<Icon type="md-close" color="#fff" size="22" />
			</div>
		</div>
		<slot name="bodycontent"></slot>
		<div slot="footer">
			<Button :type="type" v-if="showFooter" class="btn-style-2" style="width:200px;height:36px;" :loading="isClickOK"
				@click="ok"><span>{{ okText }}</span></Button>
		</div>
	</Modal>
</template>
<script>
export default {
	name: 'cModal',
	props: {
		transfer: {
			type: Boolean,
			default: false,
		},
		showFooter: {
			type: Boolean,
			default: true,
		},
		isClickOK: {
			type: Boolean,
			default: false,
		},
		closable: {
			type: Boolean,
			default: false,
		},
		showModal: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: '',
		},
		cancelText: {
			type: String,
			default: 'Cancel',
		},
		okText: {
			type: String,
			default: 'Save',
		},
		type: {
			type: String,
			default: 'success',
		},
		width: {
			type: Number,
			default: 520,
		},
	},
	computed: {
		isShow: {
			get() {
				return this.showModal;
			},
			set(newVal) {
				return newVal;
			},
		},
	},
	data() {
		return {
			btnType: {
				Save: 'success',
				Update: 'warning',
				Delete: 'error'
			}
		}
	},
	methods: {
		ok() {
			this.$emit("ok");
		},
		cancel() {
			this.$emit("close", false);
		}
	}
}
</script>
<style scoped>
.c-modal ::v-deep .ivu-alert-with-desc {
	text-align: center;
}

.c-modal ::v-deep .ivu-modal-header {
	border-bottom: 0;
	padding: 16px 0px;
}

.c-modal ::v-deep .ivu-modal-content {
	border-radius: 8px;
}

.c-modal ::v-deep .ivu-modal-footer {
	border-top: 0;
	text-align: center;
	padding-bottom: 30px;
}

.c-modal ::v-deep .ivu-modal-body {
	padding: 20px 20px 0px;
}

.modal-header {
	text-align: center;
	position: relative;
	color: #2B2B2B;
}

.close-icon {
	position: absolute;
	top: -16px;
	right: 0;
	background: #FF0000;
	height: 40px;
	width: 46px;
	mix-blend-mode: normal;
	border-radius: 0px 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0.5;
	cursor: pointer;
}
</style>