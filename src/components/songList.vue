<template>
	<div class="songlist">
		<!--這是一個歌單頁面-->
		<div class="songtop"><van-nav-bar title="歌單"  left-text="返回"  @click-left="onClickLeft" left-arrow fixed/></div>
		
		<div class="songnav">
			<van-row>
				<van-col align="center" span="12"><span class="songnav-span" @click="hots">推薦 <van-icon name="arrow-down" /></span></van-col>
				<van-col align="center" span="12" ><span class="songnav-span" @click="mores">更多<van-icon name="arrow-down" /></span></van-col>
			</van-row>
			<span id="hua"></span>
		</div>
		
		<div class="songintroduce">
			<div class="fathersong" v-for="(item,index) in songlisttow" :key="index" @click="goState({name:'Player',params:{ uid: item.id}})">
				<div class="songimg"><img class="auto-img" :src="item.pic"/></div>
				<div class="songmsg">
					<span class="songlistname"><van-icon name="contact" color="white" /><span>{{item.singer}}-</span>{{item.name}}</span>
					<span class="songlisttex">{{item.name}}</span>
					<span class="songlistcount"><van-icon name="service-o" color="white" />{{item.time}}</span><!--歌曲數量-->
				</div>
			</div>

		
		<!--<button @click="getmsg2">huoq</button>-->
		</div>
		<div style="text-align: center;margin-bottom: 1rem;"><p @click="count" id="notex">加载更多...</p></div>

	</div>
</template>

<script>
	import { Row, Col } from 'vant';
	import { NavBar } from 'vant';
	import { Icon } from 'vant';
	export default {
		
		name:"songList",
		components:{
			[NavBar.name]:NavBar,
			[Col.name]:Col,
			[Row.name]:Row,
			[Icon.name]:Icon,
		},

		data(){
			return{
				b:1,
				isshow:true,
				songlisttow:[],
				
				
			}
		},

		methods:{
			count() {
				//可以考虑从内存上取出来，每次点击就取一次
				this.b++
				let a=this.b*10;
				let arrrrr=window.localStorage.getItem('yuekumsg1')
				let massgdata=JSON.parse(arrrrr)
				this.songlisttow=massgdata
				this.songlisttow.length=a<=massgdata.length?a:massgdata.length;
				let notex=document.getElementById('notex')
				if(this.songlisttow.length==JSON.parse(arrrrr).length){
					notex.innerText=`到底部了喔!`
				}
			},
			//導航點擊方法
			navClick(){
				this.isshow=true;
				
			},//		https://api.itooi.cn/music/netease/highQualitySongList?key=579621905&cat=全部&limit=100
			getmsg2(){
				let arrrrr=window.localStorage.getItem('yuekumsg1')
				let massgdata=JSON.parse(arrrrr)
				this.songlisttow=massgdata
				this.songlisttow.length=10;
//				this.songlisttow.length=10;
			},
			onClickLeft(){
//              console.log('返回')
				this.$router.go(-1);
            },
            mores(){
				var hua=document.getElementById('hua')
				hua.style.left=' 6.8rem';
				this.$router.push({name: 'Yueku'})
            },
            hots(){
				var hua=document.getElementById('hua')
				hua.style.left='1.8rem'
            },
            goState(path){//點擊時跳轉路由的方法
				this.$router.push(path);
			},
            
		},
		created(){
			//數據初始化
//			this.getmsg();
			this.getmsg2();
		},
		
	}
</script>

<style lang="less" scoped>
.songlist{
	min-height: 667px;
	background: white;
}
.songmsg{
	position: relative;
}
#hua{
    width: 1.5rem;
    display: block;
    position: absolute;
    border-bottom: #1989FA 0.0667rem solid;
    top: 2rem;
    left: 1.8rem;
}
/*===============頭部===================*/
.songtop{
	background:#1989FA;
	padding-bottom: 45px;
	.van-nav-bar{
		background: #1989FA;
		.van-nav-bar__title{
			color:white ;
		}
	}
}
.van-nav-bar__text{
	color: white;
}
.van-icon-arrow-left:before {
    content: "\F008";
    color: wheat;
}
/*==================導航========================*/
.songnav{
	/*background-color: lightblue;*/
	line-height: 32px;
	border-bottom: 1px solid #cecaca ;
	.songnav-span{
		
	}
}
/*=================歌單實現========================*/
.songintroduce{
	/*background-color: lightblue;*/
	width: 90%;
	margin:0rem 5% ;
	.fathersong{
		position: relative;
		display: inline-block;
		width: 48%;
		margin: 10px 1%;
		.songlistname{
			position: absolute;
			bottom: 1.1rem;
			font-size: 0.35rem;
			color: #A3ACA7;
			left: 0;
			display: block;
		}
		.songimg{
		width: 100%;
		display: inline-block;
		.auto-img{
			width: 100%;
		}
	}
	
	}
	
}
.songlisttex{
	display: inline-block;
	height: 33px;
}
.songlistcount{
	display: inline-block;
	position:absolute;
    top: -4rem;
    right: 0.2rem;
	color: white;
}
.buttom{
	margin: 0.5rem 35%;
	
}
</style>