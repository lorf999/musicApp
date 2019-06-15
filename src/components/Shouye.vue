<template>
	<div class="shouye">
		<!--導航-->
		<div class="nav">
					<van-row class="tabs" type="flex" justify="center" align="center">
					<van-col span="4"><div @click="mychars" class="span1" ><div id="logoimg"><img width='45' src="../assets/mylogo.jpg"/></div></div></van-col>
					<van-col span="11"><div   class="span1 "><span >{{user}}</span></div></van-col>
					<van-col span="9"><div @click="mySave"  class="span1 " ><span >我的收藏</span></div></van-col>
					<!--<van-col span="3"><div @click="goState({name:'Denglu'})"  class="span1 " ><span class="deng" v-show="isTrue">登錄</span></div></van-col>-->
				</van-row>
				
		</div>
	
	
		
		
		
		
		<!--搜索框部分-->
		<!--<div class="search1">
			<van-search placeholder="请输入搜索关键词" background="#1989FA" v-model="value" />
			<div class="search" @click="goState({name:'Search'})" >搜索</div>
		</div>-->
		
		<!--輪播圖部分-->
			<!--<div class="lunbobox">
				<div class="lunbo">
					<van-swipe :autoplay="3000" indicator-color="white">
						<van-swipe-item v-for='(item,index) in banner' :key='index'>
						<img class='auto-img' :src="item.url"/>
					</van-swipe-item>
					</van-swipe>
				</div>
			</div>-->

		<div class="claerfloat"></div>
		<!--下面就是一個有圓角的大盒子-->
		<div class="bigbox">
			<!--以下是一個導航分類-->
			<div class="icon-daohang" >
				<van-row>
					<van-col span="6" v-for="(item,index) in songList" :key="index" >
						<div @click="goState(item.path)" class="songlist" :style="item.bckcolor"><van-icon :name="item.iconName" color="white"/></div>
						<span>{{item.context}}</span>
					</van-col>
				</van-row>
			</div>
			
			<!--導航結束，進行頁面推廣階段 recommend==推薦-->
			<!--<hr />-->
			<div class="songrecommend">
				<span class="recommend" v-for="(item,index) in Recomend" :key="index" @click="goState(item.path)"><van-tag :mark="item.marktrue" :round="item.roundtrue" :type="item.types">{{item.tex}}</van-tag></span>
				<!--<hr color="#F7E5E5"  />-->
				<!--以下歌曲展示頁面 數據展示為8個-->
				<div class="songlistrecommend">
					<!--使用v-for循環-->
					<div class="songbox"  v-for="(value,index) in massg" :key="index" >
						<div  class="fatherbox" @click="goState({name:'Player',params:{ uid: value.id}})">
							<div  class="songbox1 songbox-left"><span class="Songadd">+</span><img id="text-img" width="50"  :src="value.pic" alt="加載失敗！"/></div>
							<div class="songbox1 songbox-right"><h3>{{value.name}} </h3><span class="singer">{{value.singer}}</span></div>
							<div id="star" class="star"  ></div>
						</div>
					<hr color="#F7E5E5"/>
					</div>	
				</div>
				<div style="text-align: center;"><p @click="count" id="notex">加载更多</p></div>
			</div>
			
			
			<!--<button @click="getmassg">獲取數據</button>-->
			<!--<hr />-->
		</div>
		
	
		
		
		<!--<div><van-icon class-prefix="my-icon" name="extra" /></div>
		<div><van-icon class-prefix="my-icon1" name="extra" /></div>
		

		<button @click="getMusic">獲取音樂信息</button>
		<button @click="getmsg">獲取圖片信息</button>-->

				<!--<div >
				<audio id="kugou" controls="" src="http://fs.open.kugou.com/bfbee1a01860248d9975a25beb193d76/5cb80298/G158/M07/14/03/fpQEAFyx4H6ARk0eADxsZb8wtBE302.mp3"></audio>
				
				</div>-->
	</div>
</template>

 <script src="https://cdn.staticfile.org/vue/2.4.2/vue.min.js"></script>
    <script src="https://cdn.staticfile.org/vue-resource/1.5.1/vue-resource.min.js"></script>

<script>
	import qs from 'qs'
	import {Search, Swipe, SwipeItem,Tag} from 'vant'
	
	export default {
		name:'Shouye',
		components:{
			[Search.name]:Search,
			[Swipe.name]:Swipe,
			[SwipeItem.name]:SwipeItem,
			[Tag.name]:Tag,
		},
		data(){
			return{
				b:1,
				isTrue:true,
				user:null,
				userLoginStatus:[],
				countnum:null,
				aioarry:[],
				active:1,
				msg:[],
				massg:[],
				value:"",
				banner:[
					{url:require('../assets/mainimg/155437105715432 .jpg')},
					{url:require('../assets/mainimg/15543807947671.jpg')},
					{url:require('../assets/mainimg/155437105715432 .jpg')},
					{url:require('../assets/mainimg/155437105715432 .jpg')},
					
				],
				songList:[
				{context:'歌單',iconName:'description',bckcolor:'background-color:limegreen', path: {name: 'songList'}},
				{context:'樂庫',iconName:'service-o',bckcolor:'background-color:yellow',path: {name: 'Yueku'}},
				{context:'MV',iconName:'video-o',bckcolor:'background-color:blue',path: {name: 'MVsong'}},
				{context:'搜索更多',iconName:'search',bckcolor:'background-color:red',path: {name: 'Search'}},
				
				],
				Recomend:[
					{marktrue:true,tex:"好歌推薦",types:'danger',roundtrue:false,path: {name: 'Yueku'}},
					{marktrue:false,tex:"經典",types:'primary',roundtrue:true,path: {name: 'Yueku'}},
					{marktrue:false,tex:"流行",types:'primary',roundtrue:true,path: {name: 'Yueku'}},
					{marktrue:false,tex:"新歌",types:'primary',roundtrue:true,path: {name: 'Yueku'}},
					{marktrue:false,tex:"排行",types:'primary',roundtrue:true,path: {name: 'Yueku'}}
				],
			}
		},
        
		methods:{
			count() {
				//可以考虑从内存上取出来，每次点击就取一次
				let getmsg=document.getElementsByClassName('van-ellipsis')
				
						this.b++
						let a=this.b*10;
						let arrrrr=window.localStorage.getItem('shouyemsg1')
						let massgdata=JSON.parse(arrrrr)
						this.massg=massgdata
						this.massg.length=a<=massgdata.length?a:massgdata.length;
						let notex=document.getElementById('notex')
						if(this.massg.length==JSON.parse(arrrrr).length){
							notex.innerText=`到底部了喔!`
						}
					},
			
			//第二種提取數據方法
			
				getmsg(){
                    //发送get请求
                    //  https://api.itooi.cn/music/kugou/search?key=579621905&s=123&limit=100&offset=0&type=song
                    //  http://www.kugou.com/song/#hash=75A809BBDF373EFB9BD04CD15FC4B2D1&album_id=19047165
                    //https://api.itooi.cn/music/kugou/album?key=579621905&id=11790366&limit=10
                    this.$http.post("https://api.itooi.cn/music/kugou/album?key=579621905&id=11790366&limit=10").then(result => {
 
                        this.msg=result;
                       
//                      console.log(this.msg)
 
                    },function(){
                        console.log('请求失败处理');
                    });
                },

			//第一種方法請求獲取api 數據
			getMusic(){
				//請求頭
				var params={
					"TransCode": "020112",
					"OpenId": "123456789",
					"Body": {
						"SongListId": "141998290"
						}
					};
					//使用qs轉換數據請求
					var paramsStr=qs.stringify(params);
//					console.log('獲取音樂信息==》',paramsStr);
					this.$http({
					method:'POST',
					url:'https://api.hibai.cn/api/index/index',
					data:paramsStr
					}).then(result => {//請求成功后返回的函數					
						this.aioarry=result.data.Body;
//						console.log('獲取音樂信息==》',this.aioarry)
				})
			},

			getmassg(){
						//把本地存儲取出來控制它的長度
                        let arrrrr=window.localStorage.getItem('shouyemsg1')
                        this.massg=JSON.parse(arrrrr)
						//控制獲取哥的長度
                        this.massg.length=10;
//                      this.countnum=this.massg.length;
//                      console.log(this.massg)

			},
			goState(path){//點擊時跳轉路由的方法
				this.$router.push(path);
			},
			Changes(e){
				
				var span1=document.getElementsByClassName('span1')
				for(let i=0;i<span1.length;i++){
//					console.log(span1[i].style)
						span1[i].style.backgroundColor=`#1989FA`;
						span1[i].style.color=`#8E8989`;
					}
//				console.log(e.target)
//				e.target.style.backgroundColor=`red`;
				e.target.style.color=`white`;

				
			},
			mychars(){
								
//				獲取登陸信息,如果登陸過,就可以進入,如果沒有就提示先登陸在選擇查看我的
				let userLogin = localStorage.getItem('userLogin');

//				console.log(span1[0].style.backgroundColor)
				this.userLoginStatus = userLogin == undefined ? null : JSON.parse(userLogin);
				if (!this.userLoginStatus) {
				//如果未登录,提示用户登录
//  			this.$toast('您尚未登录');
					alert("先去登錄吧！")
				} else if(this.userLoginStatus.loginStatus) {
					this.$router.push({name: 'My',params:{ uid: this.user}})
					
	
				}
			},
			mySave(){
								
//				獲取登陸信息,如果登陸過,就可以進入,如果沒有就提示先登陸在選擇查看我的
				let userLogin = localStorage.getItem('userLogin');
//				console.log(span1[0].style.backgroundColor)
				this.userLoginStatus = userLogin == undefined ? null : JSON.parse(userLogin);
				if (!this.userLoginStatus) {
				//如果未登录,提示用户登录
//  			this.$toast('您尚未登录');
					alert("您尚未登錄")
				} else if(this.userLoginStatus.loginStatus) {
					this.$router.push({name: 'Mysave'})
				}
			},


			

			
		},
//		初始化數據
		created(){
			//獲取設備高度
//			console.log(screen.height)
			//初始化方法
			this.getmassg();//shouyemsg1首頁音樂接口數據請求
//			this.getmssg1();//Kuwomsg酷我音樂接口數據請求
//			this.getmssg2();//yuekumsg1樂庫接口數據請求
				let userLogin = localStorage.getItem('users');
				let userLogin1 = localStorage.getItem('userLogin');
				this.userLoginStatus = userLogin1 == undefined ? null : JSON.parse(userLogin1);
				let le=userLogin==undefined?null:JSON.parse(userLogin)
				
//				console.log("===>",this.userLoginStatus.userId)
				for(let i=0;i<le.length;i++){
					if(le[i].phone==this.userLoginStatus.userId){
						this.user=le[i].uid
						
//						console.log("===>",this.user)
					}
				}
				if(le==null){
					this.user="您還沒有登陸！"
					this.isTrue=true;
				}else{
//					let deng=document.getElementsByClassName('deng')
//					console.log(deng[0])
//					deng[0].innerText="退出登錄"
				}
//	  		span1[1].click=this.Changes(e);

//	  		 console.log(localStorage.getItem('users'))
		},

	}
</script>

<style lang="less" scoped>
.search{
	display: inline-block;
	color: white;
	font-size: 20px;
}
/*=======*/
#index{
/*visibility: hidden;*/
display: inline-block;
}
.songbox{
	position: relative;
	
}
.star{
	width:1rem;
	height:1rem;
	position: absolute;
	/*display: inline-block;*/
	background-image: url(../assets/音乐.png);
	background-size: cover;
    top: 11px;
    right: 18px;

}
#logoimg>img{
	border-radius: 50%;
	margin-top: 5px;
	
}
.spanaddd{
	font-size: 18px;
}
/*===========導航=================*/
.nav{
		height: 1.3333rem;
		background-color:#1989FA;
		/*margin-bottom:  1.3333rem;*/
		
	}
 .span1{
/*line-height: 1.4333rem;*/
    background-color: #1989FA;
    text-align: center;
    font-size: 0.426666rem;
    color: #e9f3ee;
    span.deng{
		display:inline-block;
		background:#2758AD;
    }
 }
.defaultcolor{
	color:white;
/*background-color:red;*/
}
/*=============================*/
audio{
	width: 100%;
}
.floatlef{
	/*float: left;*/
	widows: 50%;
	text-align: center;
	margin: 20px auto;
	/*overflow: hidden;*/
	/*這裡設置浮動的時候會把內容寫佔據到外面*/
}
/*=====進度條樣式==========*/
.Songadd{
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
    top: -0.5rem;
	/*background:#CDCDCD;*/
}
.songbox1{
	display: inline-block;
	margin-left: 0.2rem;
	width: 103px;
	margin-left: 0.2rem;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
/*================*/

/*清除浮動設置*/
.claerfloat{
	/*clear: both;*/
clear: both;
visibility: hidden;
}
.claerfloat1{
clear: both;
margin-bottom:0 ;
}

/*全局設置主題為藍色*/
.shouye{
	background: #1989FA;
	min-height: 667px;
}

/*頂部部分*/
.boxtex{
	position: relative;
	height: 1.173333rem;
	/*line-height: 44px;*/
	background: #1989FA;
	.zhankai{
	position: absolute;
	z-index: 9999;
    top: 0.32rem;
    left: 0.35rem;
	}
	.test1{
		width: 80%;
		margin: 0 auto;
		background: #1989FA;
			
		}
}
.van-icon-bars:before {
	font-size: 0.48rem;
}
.more{
	position: absolute;
	/*height: 44px;*/
	z-index: 9999;
    top: 0.3rem; 
    right: 0.43rem;
   .van-icon-plus:before {
		font-size:0.48rem;
   }
}



.search1{
	margin-top:0.4rem ;
	width: 96%;
}



.van-search__content{
	background-color: #A5DBFA;
    border-radius: 1.05333rem;
}

/*輪播圖部分*/
.lunbobox{
	clear: both;
	width: 100%;
	background-color:#1989FA ;
	margin-top:-0.02666rem ;
	.lunbo{
		clear: both;
	width: 90%;
	margin: 0 auto;
		.auto-img{
	width: 100%;
	height: 2.66666rem;
	border-radius: 0.13333rem;
	/*height:2.6666rem;*/
	display: block;
		}
		
	}
	


}
.icon-daohang{
	text-align: center;
	border-top-left-radius:0.26666rem ;
	padding-bottom:0.26666rem ;
	
}
.bigbox{
	width: 100%;
	/*margin: 0 auto;*/
    margin-top: 18px;
    background: #ebeef2;
	border-top-left-radius: 0.21333rem;
	border-top-right-radius: 0.21333rem;
}
.songlist{
	margin: 10px auto;
	margin-bottom:0.05rem ;
	width:1.06666rem;
	height: 1.06666rem;
	background: limegreen;
	border-radius: 0.52222rem;
	text-align: center;
	font-size: 0.746666rem;
	line-height:1.2206667rem;
}
.songrecommend{
	overflow: hidden;
	/*這裡的overflow是設置子元素不受浮動影響*/
	/*margin-left: 0.5333rem;*/
    /* margin-left: 0.5333rem; */
    padding-top: 20px;
    background:white;
	.recommend{
		margin-right: 0.6rem;
	}
	.songlistrecommend{
		margin-top: 0.5rem;
		background:#f1f7f6;
	}
}

@font-face {
  font-family: 'my-icon';
  src: url('../assets/Fontttf/iconfont.ttf') format('truetype');
}
.my-icon {
  font-family: 'my-icon';
}

.my-icon-extra::before {
  content: '\e6fb';
}
.van-search{
	display: inline-block;
	width: 86%;
}
.van-nav-bar--fixed {
    top: -1px;
    background: lavenderblush;
    }
</style>