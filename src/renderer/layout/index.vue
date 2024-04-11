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