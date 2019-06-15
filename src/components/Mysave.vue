<template>
	<div class="mysave">
		<!--這是一個我的收藏頁面頁面-->
		<div class="mytop"><van-nav-bar title="我的收藏"  left-text="返回"  @click-left="onClickLeft" left-arrow fixed/></div>
	

			<div id="mytex">收藏列表：共有<span id="count">{{num}}</span>首歌</div>
			
		
			<div :ref="'van' + index" class="songbox" v-for="(item,index) in mysave" :key="index" >
				<div class="fatherbox">
					<div  @click="goState({name:'Player',params:{ uid: item.id}})"   class="song-show song-show-left"><span class="addsongling">+</span><img id="text-img" width="50"  :src="item.pic" alt="加載失敗！"/></div>
					<div class="song-show song-show-right"><h3>{{item.name}} </h3><span class="singer">{{item.singer}}</span></div>
					<button id="remo" class="star remove" @click="removearr(index)" :title="index">移除</button>
				</div>
				<hr />
			</div>
		<div class="buttom">到達底部了！</div>
	</div>
</template>

<script>
		import { NavBar } from 'vant';
	export default{
		name:"Mysave",
		components:{
			[NavBar.name]:NavBar,
			},
		data(){
			return{
				mysave:null,
			}
		},
		methods:{
			//返回上一級
			onClickLeft() {
//Toast('返回');
				this.$router.go(-1);
			},
			getdata(){
				let arrrrr=window.localStorage.getItem('SaveALL')
				this.mysave=arrrrr==undefined?[]:JSON.parse(arrrrr);
				this.num=this.mysave.length==undefined?0:this.mysave.length;
//				console.log(this.mysave)
			},
			goState(path){//點擊時跳轉路由的方法
				this.$router.push(path);
			},
			//移除數組arr.splice(1,2)  //['a','d'] 獲取到數組元素下標index
			removearr(index){
				this.mysave.splice(index,1);
				this.num=this.mysave.length==undefined?0:this.mysave.length;
				let shouyemsg1=window.localStorage;
                        //把獲取到的數據存儲到本地轉換為json對象
                shouyemsg1["SaveALL"]=  JSON.stringify(this.mysave);

			}
			
		},
		created(){
			this.getdata()
		}
		
	}
</script>

<style lang="less" scoped>
.van-icon,
.van-nav-bar__text{
	color: white;
}
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
.vsb{
	visibility: hidden;
}
#mytex{
	padding-left: 20px;
	height: 40px;
	background: lightgray;
	color: lightslategrey;
	line-height: 40px;
	#count{
		color: blue;
		font-size: 16px;
		margin: 0 10px;
	}
}
.mysave{
	/*min-height:17.786666rem;*/
	width: 100%;
		min-height: 667px;
	background: white;
	/*background: lightblue;*/
	
}
/*==歌曲展示部分===*/
.buttom{
	text-align: center;
	margin: 20px auto;
}
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
</style>