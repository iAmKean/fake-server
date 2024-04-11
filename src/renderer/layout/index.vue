<template>
	<div class="layout">
		<router-view name="cNav" @on-close="onClosing($event)" @on-closed="onClosed($event)" />
		<router-view></router-view>
	</div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
	methods: {
		onClosing(e) { },
		onClosed(e) {
			ipcRenderer.send('on-closed')
		}
	}
}
</script>

<style>
/* CSS */
.body-wrapper {
	height: calc(100vh - 51px);
	overflow-y: auto;
	padding: 10px;
}

.body-wrapper::-webkit-scrollbar {
	width: 10px;
}

.body-wrapper::-webkit-scrollbar-track {
	box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.body-wrapper::-webkit-scrollbar-thumb {
	background-color: darkgrey;
	outline: 1px solid slategrey;
}
</style>