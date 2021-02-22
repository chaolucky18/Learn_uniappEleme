<template>
	<view v-if="isComplete">
		<view class="img">
			<view class="add-to-shopcart">
				<text class="iconfont iconadd"></text>
				 购物车
			</view>
			<image @tap="showImg($url + detail.img)" mode="aspectFill" :src="$url + detail.img"></image>
		</view>
		<view class="detail">
			<view class="detail-text">
				<text>菜品名称：</text>{{ detail.fname }}
			</view>
			<view class="detail-text">
				<text>菜品价格：</text>￥{{ detail.price}}
			</view>
			<view class="detail-text">
				<text>售卖份数：</text>{{ detail.salecount }}
			</view>
			<view class="detail-text">
				<text>窗口名称：</text>{{ detail.windos.wname }}
			</view>
			<view class="detail-intro">{{ detail.intro }}</view>
		</view>
		<view class="comment">
			<h3>最新评论</h3>
			<view class="none" v-if="commentListLength <= 0">
				暂无评论
			</view>
			<view class="comment-detail">
				<text v-for="(item,index) in commentList" :key="index">{{ item.cont }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isComplete: false,
				detail: {},
				commentList: [],
				commentListLength: 0,
				fid: 1
			};
		},
		onLoad(option) {
			this.fid = option.fid
			uni.setNavigationBarTitle({
				title: '菜品详情'
			})
			this.getDetail()
			this.getComment()
		},
		onPullDownRefresh() {
			this.getDetail()
			this.getComment()
		},
		methods:{
			getDetail() {
				uni.showLoading({
					title: '疯狂加载中...'
				})
				uni.request({
					url: this.$url + 'food?method=foodDetails',
					method: 'GET',
					data: { fid: this.fid },
					success: (res) => {
						// console.log(res)
						this.detail = res.data.data
						this.isComplete = true
					},
					complete: () => {
						uni.hideLoading()
						uni.stopPullDownRefresh()
					}
				})
			},
			getComment() {
				uni.request({
					url: this.$url + 'comment?method=foodComment',
					method: 'GET',
					data: { fid: this.fid },
					success: (res) => {
						console.log(res)
						this.commentList = res.data.data
						this.commentListLength = res.data.code
					},
					fail: () => {
						uni.showToast({
							title: '加载失败'
						})
					}
				})
			},
			showImg(imgsrc) {
				uni.previewImage({
					urls: [imgsrc]
				})
			}
		}
	}
</script>

<style lang="scss">
	$size-20: 20px;
	
	.img {
		width: 100%;
		height: 500rpx;
		position: relative;
		
		.add-to-shopcart {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			z-index: 999;
			font-size: 24rpx;
			background-color: hsla(0,0%,100%,.6);
			border-radius: 28rpx;
			color: #008de1;
			padding: 5rpx 15rpx;
			font-weight: 700;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.detail {
		width: 100%;
		height: auto;
		border-bottom: 1px solid #ECECEC;
		padding-bottom: 14rpx;
		
		&-text {
			padding: 8rpx;
			font-size: 28rpx;
			
			text {
				font-weight: bold;
			}
		}
		
		&-intro {
			text-indent: 2em;
			font-size: 28rpx;
			padding: 8rpx 10rpx 0;
		}
	}
	
	.comment {
		h3 {
			padding: 8rpx;
		}
		
		&-detail {
			display: flex;
			flex-direction: column;
			padding: 4rpx 10rpx;
			height: 40rpx;
		}
		
		.none {
			font-size: 20rpx;
			color: #b1b1b1;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 30rpx;
		}
	}
	
</style>