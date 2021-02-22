<template>
	<view class="index-page">
		<swiper circular="true" indicator-dots="true" autoplay="true" interval="5000" class="index-swiper">
			<swiper-item v-for="(item,index) in bannerList" :key="index">
				<image @tap="showImg($url + item.img)" mode="aspectFill" :src="$url + item.img"></image>
			</swiper-item>
		</swiper>

		<view class="food-list">
			<view class="food-item" v-for="(item, index) in foodList" :key="index">
				<view class="left">
					<image @tap="showImg($url + item.img)" mode="aspectFill" :src="$url + item.img"></image>
				</view>
				<view class="right" @tap="toDetail(item.fid)">
					<view class="food-name">{{ item.fname }}</view>
					<view class="sale-count">月售： {{ item.salecount }}</view>
					<view class="price">
						<view>价格：{{ item.price }}</view>
						<view>
							<text class="iconfont iconlocation location"></text>
							{{ item.windos.wname }}
						</view>
					</view>
				</view>
				<text class="iconfont iconxinaixin xin"></text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				foodList: [],
				bannerList: []
			}
		},
		onLoad() {
			this.getFoodList()
		},
		methods:{
			getFoodList() {
				uni.showLoading({
					title: '拼命加载中...'
				})
				uni.request({
					url: this.$url + 'food?method=list',
					method: 'GET',
					success: (res) => {
						uni.hideLoading()
						this.foodList = res.data.data
						let temp = parseInt(Math.random() * (this.foodList.length - 4))
						this.bannerList = this.foodList.slice(0, temp)
						console.log(this.foodList)
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			showImg(imgsrc) {
				uni.previewImage({
					urls: [imgsrc, 'http://47.103.144.215:2020/today?id=4']
				})
			},
			toDetail(fid) {
				uni.navigateTo({
					url: '../detail/detail?fid=' + fid,
					animationType: 'slide-in-right',
					animationDuration: 400
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-page {
		.index-swiper {
			height: 400rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.food-list {

			.food-item {
				height: 170rpx;
				display: flex;
				flex-direction: row;
				padding: 8rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #ECECEC;
				position: relative;

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
					box-sizing:  border-box;
					padding: 4rpx 16rpx;

					.food-name {
						font-weight: bold;
						font-size: 32rpx;
						position: relative;
						
					}

					.sale-count {
						color: red;
					}

					.price {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						
						.location {
							font-size: 26rpx;
							margin-right: 4rpx;
						}
					}
				}
				
				.xin {
					position: absolute;
					width: 24px;
					height: 24px;
					top: 26rpx;
					right: 20rpx;
					font-size: 40rpx;
					font-weight: 100;
					color: red;
					// border: 1px solid red;
					box-shadow: 0 0 10px #d3d3d3;
					border-radius: 50%;
					padding: 6rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>
