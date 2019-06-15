<template>
	<div class="my">
<!--這是一個管理我的頁面-->
		<div class="mytop"><van-nav-bar title="我的"  left-text="返回"  @click-left="onClickLeft" left-arrow fixed/></div>
		
		<div class="myimg">
			<img src="../assets/mylogo.jpg"/>
			
		</div>
		<div id="name" class='name'  v-show="isshow">
				<h3 id="usuid">ID：{{uid}}</h3>
				<h3  id="ususer">手機號碼：{{user}}</h3>
				<h3>註冊時間：{{time}}</h3>
			</div>
		<div id="name" class='name'  v-show="isok">
				<h3 >ID：<input id="uid" type="text" :value="uid" /></h3>
				<h3>手機號碼：<input id="user" type="text" :value="user"/></h3>
				<h3>註冊時間：{{time}}</h3>
		</div>
				<button id="changer" class='name'  @click="changmy">修改</button>
				<div class="exit">
					<span id="changer" class='exit1'  @click="goState({name:'Denglu'})">退出登錄</span>
				</div>
				
				<!--<button class='name' v-show="">確認修改</button>-->
		<!--<button >返回上一層</button>
		<div>我的收藏+播放歷史+歌單</div>-->
	</div>
</template>

<script>
		import { NavBar } from 'vant';
	export default {
		name:'My',
			components:{
			[NavBar.name]:NavBar,
			},
		data(){
			return {
				isshow:true,
				isok:false,
				user:null,
				uid:null,
				time:null
			}
		},
		methods:{
			onClickLeft() {
//			      Toast('返回');
				this.$router.go(-1);
			},
			goState(path){//點擊時跳轉路由的方法
				this.$router.push(path);
			},
			getlocaol(){
//				let name=document.getElementById('name')
//			 	console.log(this.user)
//			 	name.innerText=this.user
//			 	name[0].innerHTML=this.user
				
//			 zz	console.log(name.text)
//			 	name=this.user
			},
			changmy(){
				var myuid=document.getElementById('uid')
				var myuser=document.getElementById('user')
				var changerbtn=document.getElementById('changer')
//			 	var usuid=document.getElementById('usuid')
//			 	var ususer=document.getElementById('ususer')
//			 	console.log(changerbtn.innerText)
//			 	點擊修改的時候
				if(changerbtn.innerText=="修改"){
					changerbtn.innerText="確認修改",
					
					this.isok=true;
					this.isshow=false;
				}else if(changerbtn.innerText=="確認修改"){
					changerbtn.innerText="修改",
					this.user=myuser.value;
					this.uid=myuid.value;
					
				let user1=localStorage.getItem('users');
				//把獲取到的本地數據轉化為
				let user2=JSON.parse(user1);
//				user2[0].phone=this.user;
				user2[0].uid=this.uid
				let shouyemsg1=window.localStorage;
				shouyemsg1["users"]=JSON.stringify(user2);
					this.isok=false;
					this.isshow=true;
					
				}
			}

		},
		created(){
			this.getlocaol()
			let user1=localStorage.getItem('users');
				//把獲取到的本地數據轉化為
				let user2=JSON.parse(user1);
//				console.log(user2[0])
				this.user=user2[0].phone
				this.uid=user2[0].uid
				this.time=user2[0].registerTime;
		}
	}
</script>

<style lang="less" scoped>
.exit{
	text-align: center;
	margin: 20px auto;
	background: red;
	width: 60%;
	.exit1{
		font-size: 24px;
		background: red;
		line-height: 40px;
		color: white;
	}
}
.myimg{
	width: 150px;
	margin: 20px auto;
	img{
		border-radius: 50%;
		width: 150px;
	}
}
/*===============*/
.mytop{
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
 .span1{
	line-height:1.3333rem;
	background-color:#1989FA;
	text-align:center;
	font-size:14px;
	color:#8E8989;
 }
.name{
	/*text-align: center;*/
	margin-left:1rem ;
}
</style>