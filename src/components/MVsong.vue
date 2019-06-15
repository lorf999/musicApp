<template>
	<div class="mv">
<!--這是一個MV頁面-->
		<div class="MVtop"><van-nav-bar title="MV"  left-text="返回"  @click-left="onClickLeft" left-arrow fixed/></div>
		<div></div>
		<van-badge-group :active-key="activeKey" >
			<van-badge title="HOT" />
			</van-badge-group>
		<div class="Mvbox" v-for="(item,index) in MVmsg" :key="index">
			
			<video width="100%" height="250px" controls  name="media" :poster='item.pic'>
				<source :src="item.url" type="video/mp4" width="100%" />
				当前浏览器不支持 video直接播放，点击这里下载视频： <a href="#">下载视频</a>
			</video>
			<div id="texs"><span>{{item.name}}</span></div>
		</div>
		
		<!--<button @click="getMV">獲取MV</button>-->
	</div>
</template>

<script>
		import { NavBar ,Badge, BadgeGroup } from 'vant';
	export default{
		name:'MVsong',
		components:{
			[NavBar.name]:NavBar,
			[Badge.name]:Badge,
			[BadgeGroup.name]:BadgeGroup,
		},
		data(){
			return{
				MVmsg:[],
				activeKey:0,
			}
		},
		methods:{
//			在這裡寫方法
			onClickLeft() {
//Toast('返回');
					this.$router.go(-1);
//					console.log('0.0')
			},
		},
		
		created(){
			//初始化方法

			//把獲取到的兩個mv數組添加成為一個
            let arr1=JSON.parse(window.localStorage.getItem('MVarr1'))
			let arr2=JSON.parse(window.localStorage.getItem('MVarr2'))
			this.MVmsg= [arr1,arr2]
//			console.log(this.MVmsg)
		}
	}
</script>

<style lang="less" scoped>
.mv{
		min-height: 667px;
	background: white;
}
#texs{
	margin-bottom: 20px;
	background: lightblue;
	height: 24px;
	line-height: 24px;
}
.Mvbox{
	width: 100%;
}
/*==============MVtop================*/
.MVtop{
	background:#1989FA;
	padding-bottom: 45px;
	.van-nav-bar{
		background: #1989FA;
		.van-nav-bar__title{
			color:white ;
		}
	}
}
.van-nav-bar__text,
.van-icon-arrow-left:before {
    color: white;
}
</style>