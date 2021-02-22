<template>
	<view class="login-page">
		<view class="login-box">

			<view class="login-item">
				<view class="left">
					<text class="iconfont iconwo"></text>
				</view>
				<view class="right">
					<input v-model="sno" type="text" class="txt" placeholder="请输入用户名" />
				</view>
			</view>

			<view class="login-item">
				<view class="left">
					<text class="iconfont iconmima"></text>
				</view>
				<view class="right">
					<input v-model="password" type="text" class="txt" placeholder="请输入密码" />
				</view>
			</view>
			
			<view class="login-item register-item">
				<navigator url="../register/register" open-type="navigate">
					我要注册
				</navigator>
			</view>
			
			<view class="login-item btn">
				<button @tap="checkLogin" type="primary" class="btn-login">登陆</button>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sno: '',
				password: ''
			}
		},
		methods: {
			checkLogin() {
				uni.showLoading({
					title: '正在登陆...'
				})
				uni.request({
					url: this.$url + 'user?method=login',
					method: 'GET',
					data: {sno: this.sno, password: this.password},
					success: (res) => {
						uni.hideLoading()
						let info = res.data
						console.log(info)
						if(!info.code) {
							uni.showToast({
								title: info.msg,
								icon: 'none'
							})
							return
						}
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						})
						uni.setStorageSync('userinfo', info.data)
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 900)
						
					},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}
	.login-page {

		.login-box {
			border: 1px solid #ececec;
			min-height: 200rpx;
			margin: 70rpx 30rpx 0;
			box-sizing: border-box;
			padding: 20rpx 20rpx;
			box-shadow: 0 0 18rpx lightgray;

			.login-item {
				display: flex;
				flex-direction: row;
				border-bottom: 1px solid #ececec;
				font-size: 28rpx;
				height: 80rpx;

				.left {
					width: 80rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
				}

				.right {
					flex: 1;
					display: flex;
					flex-direction: row;
					align-items: center;
					
					.txt {
						font-size: 24rpx;
					}
				}
				
				.btn-login {
					font-size: 24rpx;
					height: 70rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #008DE1;
					width: 100%;
					border-radius: 0;
				}
			}
			
			.register-item {
				color: blue;
				font-size: 24rpx;
				align-items: center;
				justify-content: flex-end;
				border: none;
			}
			
			.btn {
				border: none;
			}
		}
	}
</style>
