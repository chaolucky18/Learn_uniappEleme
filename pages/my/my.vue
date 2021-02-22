<template>
	<view>
		<view class="my-list">
			<view class="icon">
				<text class="iconuser iconfont iconchangyongtubiao-xianxingdaochu-zhuanqu-"></text>
			</view>
			<view class="text">{{ username == '' ? '暂未' : '欢迎' }}登陆</view>
			<view class="to-login" @tap="toLogin()">{{ username == '' ? '去登陆' : username }}</view>
		</view>
		<view class="my-list">
			<view class="icon">
				<text class="iconshopcart iconfont icongouwuche"></text>
			</view>
			<view class="text">购物车</view>
			<view class="icon-go">
				<text class="iconfont iconyou"></text>
			</view>
		</view>
		<view class="my-list" @tap="toOrder()">
			<view class="icon">
				<text class="iconhistory iconfont icondropbox"></text>
			</view>
			<view class="text">历史订单</view>
			<view class="icon-go">
				<text class="iconfont iconyou"></text>
			</view>
		</view>
		<view class="my-list" @tap="logOut()">
			<view class="icon">
				<text class="iconquit iconfont icontuichu"></text>
			</view>
			<view class="text">退出登陆</view>
			<view class="icon-go">
				<text class="iconfont iconyou"></text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: ""
			}
		},
		onShow() {
			// 在这个页面显示的时候，如果缓存中有值，则说明用户已经登陆
			// 如果没有值，则说明没有登陆
			let userInfo = uni.getStorageSync('userinfo')
			if(userInfo.name) {
				this.username = userInfo.name
			}
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			logOut() {
				if(!this.username) {
					uni.showToast({
						title: '暂未登陆！',
						icon: 'none'
					})
					return
				}
				uni.showModal({
					title: '请确定',
					content: '确定退出登陆？',
					cancelText: '我手滑',
					confirmText: '我确定',
					success: (e) => {
						if(e.confirm) {
							// 清除用户缓存
							uni.clearStorageSync('userinfo')
							// 用户名至空
							this.username = ''
							// 展示提示信息
							uni.showToast({
								title: '已退出',
								icon: 'none'
							})
						}
					}
				})
			},
			toOrder() {
				uni.switchTab({
					url: '../order/order'
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-list {
		height: 80rpx;
		display: flex;
		flex-direction: row;
		position: relative;
		background-color: white;
		
		&:first-child {
			margin-bottom: 20rpx;
		}

		.icon {
			height: 100%;
			width: 120rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.iconuser {
				font-size: 50rpx;
				color: #ffd800;
			}

			.iconshopcart {
				font-size: 50rpx;
				color: #008de1;
			}
			
			.iconhistory {
				font-size: 50rpx;
				color: #5acc86;
			}
			
			.iconquit {
				font-size: 50rpx;
				color: #6c76eb;
			}
		}

		.text {
			flex: 1;
			border-bottom: 1px solid #ececec;
			display: flex;
			flex-direction: row;
			font-size: 26rpx;
			align-items: center;
		}
		
		.icon-go {
			position: absolute;
			width: 40rpx;
			height: 40rpx;
			right: 20rpx;
			bottom: 20rpx;
			font-weight: 100;
		}
		
		.to-login {
			position: absolute;
			width: auto;
			height: 40rpx;
			right: 20rpx;
			bottom: 20rpx;
			font-size: 26rpx;
			color: #797979;
		}
}
</style>
