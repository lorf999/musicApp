<template>
<div class="yueku">
<!--這是一個歌單頁面-->
		<div class="songtop"><van-nav-bar title="樂庫"  left-text="返回"  @click-left="onClickLeft" left-arrow fixed/></div>
		
		<!--以下動態歌單展示區-->
		<div class="yuekulist">
			<div class="list listone">精品熱歌源</div>
			<div class="list listtow">
				<div class="yuekusonglist" v-for="(item,index) in daomusic" :key="index" @click="goState({name:'Allmusic',params:{ uid: item.src,tex:item.tex,name:item.name}})">
					<img class="yuekusonglist-img" :src="item.src"/>
					<div class="yuekusonglist-name">{{item.tex}}</div>
					<div class="yuekusonglist-author">{{item.name}}</div>
				</div>
			</div>
			<div class="list listthree">
				<span class="listthree-span">查看更多專輯</span>
			</div>
			<div class="null"></div>
			
		</div>
		<!--導航部分-->
		<div class="yuekudaohang">
			<van-row >
				<van-col span="12" align="center"><div class="music-daohang yuekudaohangline" @click="goState({name:'songList'})">Line</div></van-col>
				<van-col span="12" align="center"><div class="music-daohang" @click="goState({name:'MVsong'})">MV</div></van-col>
			</van-row>
			
		</div>
		<div class="hot-song">		
			<!--<van-badge-group :active-key="activeKey" >
				<van-badge title="熱門單曲" />
			</van-badge-group>-->
			<div class="songbox" v-for="(item,index) in yuekumsg" :key="index">
				<div @click="goState({name:'Player',params:{ uid: item.id}})" class="fatherbox">
							<div class="song-show song-show-left"><span class="addsongling">{{index}}</span><img id="text-img" width="50"  :src="item.pic" alt="加載失敗！"/></div>
							<div class="song-show song-show-right"><h3>{{item.name}} </h3><span class="singer">{{item.singer}}</span></div>
							<div class="star">播放</div>
				</div>
			</div>
			<div style="text-align: center;margin-bottom: 1rem;"><p @click="count" id="notex">加载更多...</p></div>
		</div>

		<!--=====-->


	<!--<button @click="getshuju">獲取</button>-->
</div>
</template>

<script>
	
		import { Row, Col ,Badge, BadgeGroup} from 'vant';
	import { NavBar } from 'vant';
	import { Icon } from 'vant';
	
	
	
	export default {
//	import { Badge, BadgeGroup } from 'vant';


		name:'Yueku',
				components:{
			[NavBar.name]:NavBar,
			[Col.name]:Col,
			[Row.name]:Row,
			[Icon.name]:Icon,
			[Badge.name]:Badge,
			[BadgeGroup.name]:BadgeGroup,
		},
		data(){
			return{
				b:1,
				yuekumsg:[],
				activeKey:0,
				daomusic:[
				{tex:'網易云熱歌榜', name:'網易云音樂',src:'https://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=400y400'},
				{tex:'酷我热门单曲',name:'網酷我音樂',src:'http://star.kuwo.cn/star/userpl2015/10/13/1467860925171_132026710_150.jpg'},
				{tex:'冷门单曲酱',name:'QQ音樂',src:'http://p.qpic.cn/music_cover/lricrZ3ca62ybvZbWYjtYa5jSWrjoa8J5A8IUzMN8bygIKBlIqbSwRw/300?n=1'},
				{tex:'123',name:'酷狗音樂',src:'https://api.itooi.cn/music/kuwo/pic?id=4860986&imgSize=240&key=579621905'}
				],
				
			}
		},
		methods:{
			count() {
				//可以考虑从内存上取出来，每次点击就取一次
				let getmsg=document.getElementsByClassName('van-ellipsis')
				
						this.b++
						let a=this.b*10;
						let arrrrr=window.localStorage.getItem('yuekumsg1')
						let massgdata=JSON.parse(arrrrr)
						this.yuekumsg=massgdata
						this.yuekumsg.length=a<=massgdata.length?a:massgdata.length;
						let notex=document.getElementById('notex')
						if(this.yuekumsg.length==JSON.parse(arrrrr).length){
							notex.innerText=`到底部了喔!`
						}
			},
			goState(path){//點擊時跳轉路由的方法
				this.$router.push(path);
			},
			onClickLeft() {
//			      Toast('返回');
				this.$router.go(-1);
			},
			daohangclick(e){
				let musicdaohang=document.getElementsByClassName('music-daohang')
				for(let i=0;i<musicdaohang.length;i++){
					musicdaohang[i].style.backgroundColor=`#21A2A2`;
					musicdaohang[i].style.color=`#817676`;
				}
				e.target.style.backgroundColor=`red`;
				e.target.style.color=`white`;
			},
			//獲取數據
			getshuju(){
//				網易云歌單    https://api.itooi.cn/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0
//				qq音樂   https://api.itooi.cn/music/tencent/songList?key=579621905&id=1147906982
//				酷狗歌單		https://api.itooi.cn/music/kugou/search?key=579621905&s=123&limit=100&offset=0&type=song
//				酷我音樂			https://api.itooi.cn/music/kuwo/songList?key=579621905&id=1082685106
				//網易云
						let yuekumsg1 = localStorage.getItem('yuekumsg1');
						this.yuekumsg = yuekumsg1 == undefined ? null : JSON.parse(yuekumsg1);

                        this.yuekumsg.length=8;
                        
//                      console.log(this.songlistnumber[0].)
//                      console.log(this.yuekumsg)
						

			},
		},
		
		//初始化方法
		created(){
//			this.gettabs;
			this.getshuju()
//	  		goState(tabs[0].path)
		}
	}
</script>

<style lang="less" scoped>
/*======熱門單曲======*/
.yueku{
	min-height:667px;
	background: white;
}
#more{
	margin: 20px 0;
	text-align: center;
}
.addsongling{
	display: inline-block;
	width: 12px;
	height: 12px;
	font-size: 12px;
	text-align: center;
	line-height: 12px;
	border: 2px solid #CDCDCD;
	color: #CDCDCD;
	position: relative;
	margin-right: 0.5rem;
    top: -0.75rem;
}
.song-show-left{
	/*width:45%;*/
	
}
.song-show{
	display: inline-block;
	margin-left: 0.2rem;
	width: 103px;
	margin-left: 0.2rem;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
#hot-img{
	width: 70px;
}
/*===============*/
.van-badge--select{
	border-color:#446dff;
		margin-top: 10px;
}

.yuekudaohang{
	background: #21A2A2;
	line-height: 24px;
	color: #817676;
}
.yuekudaohangline{
	background-color: red;
	color: white;
}
.yuekulist{
	background-color: #817676;
	.list{
		padding-top:10px ;
		padding-left: 10px;
	}
	.null{
		height: 10px;
	}
	.listone{
		
		color: white;
		line-height:24px ;
		font-size: 14px;
	}
	.listtow{
		width: 95%;
		/*position: relative;*/
		.yuekusonglist{
			width: 24%;
			display: inline-block;
			margin-right:1% ;
			/*background: white;*/
			.yuekusonglist-img{
				width: 100%;
			}
			.yuekusonglist-name{
				color: white;
				margin: 5px 0;
				font-size: 14px;
				text-align: center;
			}
			.yuekusonglist-author{
				color:#cbacac;
				margin-bottom: 10px;
				text-align: center;
			}
		}
	}
	.listthree{
		
		/*vertical-align: middle;*/
		/*text-align: center;*/
		margin: 0 auto;
		/*padding: 10px 0;*/
		width: 25%;
		border: 1px solid white;
		margin-top:10px ;
		
		border-radius: 20px;
		.listthree-span{ 
			color: white;
			font-size:0.32rem;
			position: relative;
		left: 4px;
		top: -6px;
		}
	}
}

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
.van-nav-bar__text,
.van-icon-arrow-left:before {
    color: white;
}
/*====*/
.songbox{
	position: relative;
	
}
.star{
	position: absolute;
	display: inline-block;
    top: 30px;
    right: 18px;

}
</style>