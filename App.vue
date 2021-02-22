<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	@import url("https://at.alicdn.com/t/font_2212221_je16j1uzhl8.css");

	@font-face {
		font-family:'SF Pro SC';
		font-style:normal;
		font-weight:300;
		src:local('☺︎'), url("./static/font/PingFangSC-Regular.woff2") format("woff2");
		/* (C) 2015 Apple Inc. All rights reserved. */
	}

	* {
		/* font-family: 'SF Pro SC','等线'; */
	}

	page {
		width: 100%;
		height: 100%;
		overflow: auto;
		font-weight: 100;
		background-color: #f7f7f7;
	}

</style>
