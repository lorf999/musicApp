<template>
	<div>
		<h2>註冊</h2>
		<button class="butt" @click="getMusic">獲取數據</button>
		<br />
		
		<div class="mymusic1">
			<div class="text-top">
				<div>
					<span>演唱者：</span><span class="text"></span>
				</div>
				<div>
					<img class="text-img" width="200" height="150" src="#" alt="加載失敗！"/>
				</div>
				<div>
					<audio class='Music2' src="m.mp3" controls ></audio>
				</div>
			</div>
			
		</div>

		
	</div>
</template>

<script>
	
	import qs from 'qs'
	export default {
		
		name:'Register',
		
		data(){
			return{
				aioarry:[]
			}
		},
		methods:{
			
			getMusic(){
				//請求頭
				var params={
						"TransCode": "020112",
						"OpenId": "123456789",
						"Body": {
						"SongListId": "141998290"
					}
				};
				
				
				
				var Music2=document.getElementsByClassName('Music2');
				var text1=document.getElementsByClassName('text');
				var textimg=document.getElementsByClassName('text-img');
				
				//使用qs轉換數據請求
				var paramsStr=qs.stringify(params);
//				console.log(paramsStr);
//				console.log(Music2[0].src);
				this.$http({
					method:'POST',
					url:'https://api.hibai.cn/api/index/index',
					data:paramsStr
				}).then(result => {//請求成功后返回的函數
//					for(var i=0;i<result.data.Body.lengrh;i++){
//						console.log('result ==>',result.data.Body[i].url);
//					}
					//獲取到歌曲的數組條目aioarry
					this.aioarry=result.data.Body;
					
					
					var aio=this.aioarry[0].url;
					text1[0].innerHTML=this.aioarry[0].author;
					
//					console.log(text1);
					textimg[0].src=this.aioarry[0].pic;
//					console.log(result.data.Body[0].pic);
					Music2[0].src=aio;
//					console.log(this.aioarry)
//					console.log(Music2[0].src);
//					console.log('result ==>',result.data.Body[0].url);
//					console.log('result ==>',result);
				})
			}
			
		}
	}
</script>

<style lang="less" scoped>
.mymusic1{
	/*width: 400px;*/
	margin: 0 auto;
	background: lightcyan;
}
.butt{
	display: block;
}
audio{
	width: 300px;
	height: 50px;
}
</style>