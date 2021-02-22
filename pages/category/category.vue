<template>
	<view class="category-page">
		<view class="left">
			<view v-for="(item,index) in categoryList" :key="index" :class="{ selected: categoryIndex == index}" @tap="choose(index, item.cid)">{{ item.cname }}</view>
		</view>
		<view class="right" v-if="categoryList.length > 0">
			<view class="food-item" v-for="(item, index) in categoryList[categoryIndex].foods" :key="index">
				<navigator :url="'../detail/detail?fid=' + item.fid">
					<view class="left">
						<image mode="aspectFill" :src="$url + item.img"></image>
					</view>
					<view class="right">
						<view class="food-name">{{ item.fname }}</view>
						<view class="sale-count">月售： {{ item.salecount }}</view>
						<view class="price">
							<view>价格：{{ item.price }}</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryIndex: 0,
				categoryList: []
			}
		},
		onLoad() {
			this.getCategoryList()
		},
		methods: {
			// 获取菜单类型
			getCategoryList() {
				uni.showLoading({
					title: '拼命加载中...',
				})
				uni.request({
					url: this.$url + 'category?method=list',
					method: 'GET',
					success: (res) => {
						this.categoryList = res.data.data
					},
					fail: () => {
						uni.showToast({
							title: '加载失败.'
						})
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			// 点击类型事件处理
			choose(index, cid) {
				this.categoryIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category-page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;

		.left {
			background-color: #ECECEC;
			width: 200rpx;

			view {
				height: 70rpx;
				font-size: 28rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
			}

			.selected {
				background-color: white;
				color: #007AFF;
			}
		}

		.right {
			flex: 1;
			background-color: white;

			.food-item {
				height: 170rpx;
				display: flex;
				flex-direction: row;
				padding: 8rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #ECECEC;
				
				navigator {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: row;
				}

				.left {
					width: 210rpx;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.right {
					height: 100%;
					flex: 1;
					font-size: 24rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 4rpx 16rpx;

					.food-name {
						font-weight: bold;
						font-size: 32rpx;
					}

					.sale-count {
						color: red;
					}

					.price {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
					}
				}
			}
		}
	}
</style>
