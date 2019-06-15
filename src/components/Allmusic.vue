<template>
<div class="allmusic">
	<!--這是一個熱門歌單詳情頁面頁面-->
		<div class="songtop"><van-nav-bar title="樂庫"  left-text="返回"  @click-left="onClickLeft" left-arrow fixed/></div>
		<!--專輯封面-->
		<div class="fengmian">
			<img id="fengimg" :src="hotsrc"/>
			<div class="fengtex">
				<h2 class="tex">{{tex}}</h2>
				<h3>來源：{{name}}</h3>
				<h3>歌曲數量:{{songnum}}首</h3>
			</div>
		</div>
			<div :ref="'van' + index" class="songbox" v-for="(item,index) in kuwoarr" :key="index" >
			<div @click="goState({name:'Player',params:{ uid: item.id}})" class="fatherbox">
				<div class="song-show song-show-left"><span class="addsongling">+</span><img id="text-img" width="50"  :src="item.pic" alt="加載失敗！"/></div>
				<div class="song-show song-show-right"><h3>{{item.name}} </h3><span class="singer">{{item.singer}}</span></div>
				<div class="star">試聽一下吧...</div>
			</div>
		</div>
		<div style="text-align: center;margin-bottom: 1rem;"><p @click="count" id="notex">加载更多...</p></div>
</div>
</template>

<script>
		import { NavBar } from 'vant';
	export default{
		name:"Allmusic",
		components:{
			[NavBar.name]:NavBar,
		},
		data(){
			return{
				b:1,
				name:null,
				hotsrc:null,
				tex:'',
				kuwo:null,
				kuwoarr:null,
				songnum:null,
				allkuwoarr:null,
				//开始截取下标
				startIndex: 0,

				//结束截取下标
				endIndex: 8
			}
		},
				created(){

			this.getshuju()
	  	

	  	},
//		mounted() {
//			var timers = [];
//			//懶加載
//			window.onscroll = () => {
//				
//				
//				//获取页面距离
//				var scrollTop = document.documentElement.scrollTop;
////				console.log(scrollTop)
//				
//				//获取最后一个节点
//				var lastRef = this.$refs['van' + (this.kuwoarr.length - 1)][0];
////				var lastRef = this.$refs
////				console.log(this.$refs['van' + (this.kuwoarr.length - 1)][0])
//				
//				//获取最后一个节点的offsetTop
//				var offsetTop = lastRef.offsetTop;
////				console.log(lastRef.offsetTop)
//				
//				//获取最后一个节点的高度
//				var height = lastRef.offsetHeight;
//				console.log(height)
//				
//				var h = offsetTop - height - 200;
//				if (scrollTop >= h) {
//
//					var timer = setTimeout(() => {
//						
//						this.kuwoarr.push(...this.allkuwoarr.slice(this.startIndex, this.endIndex))
//
//						this.startIndex = this.endIndex;
//						this.endIndex += 8;
//
//						clearTimeout(timer);
//						timer = null;
//						timers = [];
//
//					}, 500)
//
//					timers.push(timer);
//
//					for (var i = 1; i < timers.length; i++) {
//						clearTimeout(timers[i]);
//					}
//
//				}
//			}
//		},
		methods:{
			count() {
				//可以考虑从内存上取出来，每次点击就取一次
				let getmsg=document.getElementsByClassName('van-ellipsis')
				
						this.b++
						let a=this.b*10;
						let arrrrr
						if(this.tex=='網易云熱歌榜'){
							arrrrr=window.localStorage.getItem('shouyemsg1')
						}
						if(this.tex=='酷我热门单曲'){
							arrrrr=window.localStorage.getItem('Kuwomsg')
						}
						if(this.tex=='123'){
							arrrrr=window.localStorage.getItem('Kuwomsg')
						}
						if(this.tex=='冷门单曲酱'){
							arrrrr=window.localStorage.getItem('yuekumsg1')
						}
						let massgdata=JSON.parse(arrrrr)
						this.kuwoarr=massgdata
						this.kuwoarr.length=a<=massgdata.length?a:massgdata.length;
						let notex=document.getElementById('notex')
						if(this.kuwoarr.length==JSON.parse(arrrrr).length){
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
			 getshuju(){
			 	this.hotsrc=this.$route.params.uid;
			 	this.tex=this.$route.params.tex;
			 	this.name=this.$route.params.name;
//			 	console.log(this.hotsrc)
//			 	console.log(this.tex)
			 	if(this.tex=='酷我热门单曲'){

						let userLogin1 = localStorage.getItem('Kuwomsg');
						this.kuwo = userLogin1 == undefined ? null : JSON.parse(userLogin1);
				
                        this.kuwoarr=this.kuwo.slice(0,10);
                         this.kuwoarr.length=10;
//                       this.kuwoarr[0]=this.kuwoarr[20]
						this.songnum= this.kuwo.length
//						console.log("this.kuwoarr===>",this.kuwoarr)

			 	}else if(this.tex=='網易云熱歌榜'){
						let userLogin1 = localStorage.getItem('shouyemsg1');
						this.kuwo = userLogin1 == undefined ? null : JSON.parse(userLogin1);
                         this.kuwoarr=this.kuwo.slice(0,10);
                         this.kuwoarr.length=10;
//                       this.kuwoarr[0]=this.kuwoarr[20]
						this.songnum= this.kuwo.length
//						console.log("this.kuwoarr===>",this.kuwoarr)

			 	}else if(this.tex=='123'){
						let userLogin1 = localStorage.getItem('Kuwomsg');
						this.kuwo = userLogin1 == undefined ? null : JSON.parse(userLogin1);		
                         this.kuwoarr=this.kuwo.slice(10,20);
//                      this.kuwoarr[0]=this.kuwoarr[80]
                         this.kuwoarr.length=10;
						this.songnum= this.kuwo.length
//						console.log("this.kuwoarr===>",this.kuwoarr)

			 	}else if(this.tex=='冷门单曲酱'){
						let userLogin1 = localStorage.getItem('yuekumsg1');
						this.kuwo = userLogin1 == undefined ? null : JSON.parse(userLogin1);
                         this.kuwoarr=this.kuwo.slice(0,10);
                         this.kuwoarr.length=10;
						this.songnum= this.kuwo.length
//						console.log("this.kuwoarr===>",this.kuwoarr)

			 	}
			 }
		},

	}
</script>

<style lang="less" scoped>
.allmusic{
		min-height: 667px;
	background: white;
}
.buttom{
	text-align: center;
	margin: 20px auto;
}
.fengmian{
	width: 100%;
	position: relative;
	margin-top: 1.23333rem;
	background-color: #985D71;
	overflow: hidden;
	#fengimg{
		width:50%;
		margin:0 5px;
	}
}
.fengtex{
	display: inline-block;
	position: absolute;
	color: whitesmoke;
	top: 1rem;
	right: 25px;
}
/*==歌曲展示部分===*/
.songbox{
	position: relative;
	
}
.star{
	position: absolute;
	display: inline-block;
    top: 30px;
    right: 18px;

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
.van-nav-bar--fixed{
	top:-1px;
	background:#1989FA ;
}
.van-nav-bar__text{
	color: white;
}
.van-nav-bar .van-icon{
	color: white;
}
</style>