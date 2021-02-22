<template>
	<view class="login-page">
		<view class="login-box">

			<view class="login-item">
				<input v-model="sno" type="text" class="txt" placeholder="请输入学号" />
			</view>
			<view class="login-item">
				<input v-model="passwd" type="text" class="txt" placeholder="请输入密码" />
			</view>
			<view class="login-item">
				<input type="text" class="txt" placeholder="请确认密码" />
			</view>
			<view class="login-item">
				<input v-model="realname" type="text" class="txt" placeholder="请输入真实姓名" />
			</view>
			<view class="login-item">
				<input v-model="nickname" type="text" class="txt" placeholder="请输入昵称" />
			</view>
			<view class="login-item">
				<input v-model="email" type="text" class="txt" placeholder="请输入邮箱" />
			</view>
			<view class="login-item">
				<input v-model="zhuanye" type="text" class="txt" placeholder="请输入专业" />
			</view>
			<view class="login-item">
				<select v-model="gender" @change="selectGender" placeholder="选择性别">
					<option value="男">男</option>
					<option value="女">女</option>
				</select>
			</view>
			<view class="login-item">
				<button @tap="register" type="primary" class="btn-login">注册</button>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sno: '',
				passwd: '',
				realname: '',
				nickname: '',
				email: '',
				zhuanye: '',
				gender: '男'
			}
		},
		methods: {
			selectGender(e) {
				console.log(this.gender)
			},
			register() {
				uni.showLoading({
					title: '正在提交表单...'
				})
				uni.request({
					url: this.$url + 'user?method=reg',
					method: 'POST',
					data: {},
					success: (res) => {
						uni.hideLoading()
						console.log(res)
						if(!res.data) {
							uni.showToast({
								title: '未成功',
								icon: 'none'
							})
							return
						}
						uni.showToast({
							title: '完成',
							icon: 'none'
						})
					},
					fail: () => {
						uni.hideLoading()
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
			padding: 10rpx 20rpx 20rpx;
			// box-shadow: 0 0 18rpx lightgray;
			border: 1px solid #ececec;

			.login-item {
				display: flex;
				flex-direction: row;
				border-bottom: 1px solid #ececec;
				font-size: 30rpx;
				height: 80rpx;
				padding: 10rpx 0;
				justify-content: flex-start;
				align-items: center;
				
				&:last-child {
					border: none;
				}
				
				input {
					height: 100%;
					width: 100%;
				}
				
				select {
					width: 100%;
					height: 100%;
					border: none;
				}

				.txt {
					font-size: 27rpx;
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
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
