<template>
	<div class="searchweb">
		<div class="songtop"><van-nav-bar :title="playname"  left-text="返回"  @click-left="onClickLeft" left-arrow fixed/></div>	
		<form id="form">
			<van-search ref="search" class="search" placeholder="請輸入搜索关键字" show-action  v-model="count"  >
				<div slot="action" @click="search"><van-icon name="search" size="20px"  /></div>
			</van-search>
		</form>
		<div v-show="isHow" class="songbox" v-for="(item,index) in serchData" :key="index" >
				<div class="fatherbox" @click="goState({name:'Player',params:{ uid: item.id}})" >
					<div    class="song-show song-show-left"><span class="addsongling"></span><img id="text-img" width="50"  :src="item.pic" alt="加載失敗！"/></div>
					<div class="song-show song-show-right"><h3>{{item.name}} </h3><span class="singer">{{item.singer}}</span></div>
					<button id="remo" class="star remove" :title="index">播放</button>
				</div>
				<hr />
		</div>
		<div class="texcenter" v-show="isHow">
			<p>到達底部了...</p>
		</div>
	</div>
</template>

<script>
	import {Search,Icon,Toast,Button,NavBar} from 'vant'
	export default{
		name:'Search',
		components:{
			[Search.name]:Search,
			[Icon.name]:Icon,
			[Toast.name]:Toast,
			[Button.name]:Button,
			[NavBar.name]:NavBar,
		},
		data(){
			return{
				isHow:false,
				count:"",
				serchData:[],
				playname:null,
				serchDataarr:[],
			}
		},
		methods:{
			search(){
				this.isHow=false;
				if (this.count=='' || this.count==undefined) {
					this.$toast("搜索不能为空")
					return;
				}
				this.serchData=[];
				
				var match = new RegExp('(' + this.count + ')', 'img');
				let songer1=localStorage.getItem('shouyemsg1')
				//把獲取到的本地數據轉化為
				let arr0=JSON.parse(songer1);
				let songer2=localStorage.getItem('Kuwomsg')
				//把獲取到的本地數據轉化為
				let arr2=JSON.parse(songer2);
//				console.log(this.uid.length)
				let songer3=localStorage.getItem('yuekumsg1')
				//把獲取到的本地數據轉化為

				let arr3=JSON.parse(songer3);
				let Arryall=arr0.concat(arr2)
				let arr1=Arryall.concat(arr3)
			
			arr1.forEach(v=>{
				if(match.test(v.name)||match.test(v.singer)){
					this.serchData.push(v);
//				console.log(this.serchData.length)
					this.isHow=true;
				}else if(!match.test(v.name)||match.test(v.singer)){
					this.$toast("未能搜索到相关信息！")
					this.count='';
				}
				
			})
			this.serchData.slice(1)
//			console.log(this.serchData)
		},
			onClickLeft() {
//			      Toast('返回');
				this.$router.go(-1);
			},
			goState(path){
				this.$router.push(path)
			},
//			goIndex(){
//				this.$router.go(-1)
//			},
		}
	}
</script>

<style lang="less" scoped>
#form{
	position: relative;
}
.texcenter{
	text-align: center;
}
.searchweb{
	/*min-height:667px;*/
	background: white;
}
.search{
    margin-top: 1.09333rem;
    margin-bottom: 0.53333rem;
}
/*=========*/
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
</style>