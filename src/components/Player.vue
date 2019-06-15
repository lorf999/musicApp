<template>
	<div class="player">
		<!--這是一個播放音樂詳情頁面-->
		<div class="songtop"><van-nav-bar :title="playname"  left-text="返回"  @click-left="onClickLeft" left-arrow fixed/></div>		
		<div class="play" :style="{backgroundImage: 'url(' + playimg + ')' ,height: height+'px'}">
			
			<div class="plaimgdiv"><img :class="[pladong]" class="playimg" :src="playimg"/></div>
			<audio id="audio" controls :src="playurl"></audio>
			<div class="platexdiv">
				<h2>歌曲名：{{playname}}</h2>

				<h3>演唱：{{playerauthor}}</h3>
				<div class="song-text" >
					<h5 id="tex2"></h5>
					<h4 id="tex3"></h4>
					<h2 id="tex4"></h2>
					<h4 id="tex5"></h4>
					<h6 id="tex6"></h6>
				</div>
			</div>
				<!--<div class="">
					<div class="playcontrol playcontrol-star"></div>
				</div>-->
				
				<!--<hr />-->
			<div class="ctrl">
				<div class="taiobox">
					<span class="time">{{timess}}</span>
					<div id="taio" width="74%"></div>
					<div id="round"></div>
					<div id="scroll"></div>
					<span class="time">{{times}}</span>
				</div>
				<div class="imgs"><div id="pla1" class="allpla" value="0" @click="cutplaypev"></div></div >
				<div class="imgs"><div @click="player" id="pla" class="allpla pla" :class="backgroundimgstop" ></div></div>
				<div class="imgs"><div  id="pla3" class="allpla" value="0" @click="cutplay"></div></div>
				<span id="savefa"><button id="save" @click="shoucang">添加收藏</button></span>
				<!--<span class="lefttime">{{timess}}/{{times}}</span>-->
			</div>
			
				
		</div>
		
	</div>
</template>

<script>
	import { NavBar } from 'vant';
	export default{
		name:"Player",
		components:{
			[NavBar.name]:NavBar,
			},
		data(){
			return{
				one:0,
				lrc:null,
				save:null,
				saveall:null,
				pladong:'',
				playimg:'',
				playurl:'',
				uid:null,
				playname:null,
				playerauthor:null,
				arr9527:[],
				cunt:0,
				times:null,
				timess:'00:00',
				backgroundimgstop:'',
				lrctex:'',
				lrcObj:{},
				lrcdata:{},//數組對象
				lrctexarr:null,
				lrcarr:[],
				height:null,
			}
		},
		compute:{

		},
		methods:{
			getlrc(){
				this.$http.post(this.lrc).then(result => {
//	 				console.log(result)
					this.lrctex=result.data;
					//分割整首歌以回車分割
					var lrcy=result.data.split('\n')
					for(let i=0;i<lrcy.length;i++){
					//把裡面的歌詞數組遍歷出來	decodeURIComponent是一個解碼函數
						let lrctex=decodeURIComponent(lrcy[i])
//	 					console.log(lrctex)
//						匹配時間[00:00.00]的正則表達式
						let timearr=/\[\d*:\d*.*\]/g
//	 					console.log(lrctex.match(timearr))
//	 					timelrc得到的結果是[00:00.00]
						let timelrc= lrctex.match(timearr);
						if(!timelrc)continue;
//	 					把時間替換成'',得到純淨的歌詞數組clause
						let clause=lrctex.replace(timelrc,'')
						this.lrctexarr=clause;
//	 					console.log(clause)
						for(let j=0;j<timelrc.length;j++){
							let t=timelrc[j]
							let min=Number(String(t.match(/\[\d*/i)).slice(1))
//	 						得到一個秒數為01.22
							let sec=Number(String(t.match(/:\d*.../i)).slice(1))
							let time=min*60+sec
							this.lrcObj[time]=clause
//	 						把時間作為索引,而後存為對象,time作為鍵名，歌詞為值
//	 						console.log(time+this.lrcObj[time])
						}
						this.lrcdata=this.lrcObj
					}	
						for(var m in this.lrcdata){
							this.lrcarr.push(m)
						}
//	 					console.log(this.lrcarr)
//	 				console.log(lrctex.match(timearr))
                           },function(){
//                      console.log('请求失败处理');
                        alert('您的網絡炸了！')
                    })
				},
			getplay(){
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
				for(let i=0;i<arr1.length;i++){
						if(this.uid==arr1[i].id){
//							console.log(arr1[i])
//							console.log('進來arr1')
							this.playurl=arr1[i].url;
	//						console.log(this.playurl)
							this.lrc=arr1[i].lrc
//							調用方法獲取歌詞等內容
							this.playimg=arr1[i].pic
							this.playerauthor=arr1[i].singer
	//						console.log(this.playerauthor)
							this.playname=arr1[i].name
							let min=Math.floor(arr1[i].time/60)> 10 ?( Math.floor(arr1[i].time/60)):'0'+Math.floor(arr1[i].time/60)
							let sc=(arr1[i].time-Math.floor(arr1[i].time/60)*60)>=10?((arr1[i].time-Math.floor(arr1[i].time/60)*60)):'0'+(arr1[i].time-Math.floor(arr1[i].time/60)*60)
	//						console.log(sc)
							this.times=min+':'+sc;
							
						}
						
					}
				this.getlrc()
				


			},

			shoucang(){
//				console.log("您點擊了收藏按鈕");
//				var saved=document.getElementById("save");
				for(let i=0;i<this.saveall.length;i++){
					
					if(this.saveall[i].id==this.uid){
//						save.innerHTML="已收藏"
//						save.style.backgroundColor=`red`
						alert("此歌曲已經收藏過了")
						return
					}
				}
				this.save={
							id:this.uid,
							pic:this.playimg,
							name:this.playname,
							singer:this.playerauthor,
							url:this.playurl,
							lrc:this.lrc,
							time:this.times
				}
				this.saveall.push(this.save);
                let shouyemsg1=window.localStorage;
                        //把獲取到的數據存儲到本地轉換為json對象
                shouyemsg1["SaveALL"]=  JSON.stringify(this.saveall);

				
			},
			onClickLeft() {
//			      Toast('返回');
				this.$router.go(-1);
			},
			player(){
//				let timel=null;
//				clearInterval(timel)
			let audioplay=document.getElementById('audio')
//				let pla=document.getElementById('pla')
//			 	this.times=audioplay.duration
				let scrolls=document.getElementById('scroll')
				let rounds=document.getElementById('round')
//				let tiao=document.getElementById('taio')
//				獲取到歌詞時間並且轉化為數組this.lrcarr
//				console.log(this.lrcarr[0])
//				console.log(this.lrcdata[this.lrcarr[0]])
					var tex2=document.getElementById('tex2')
					var tex3=document.getElementById('tex3')
					var tex4=document.getElementById('tex4')
					var tex5=document.getElementById('tex5')
					var tex6=document.getElementById('tex6')
					let time1=setInterval(()=>{
					//當前播放時間audioplay.currentTime
								
								let min=Math.floor(audioplay.currentTime/60)<10 ?'0'+( Math.floor(audioplay.currentTime/60)):Math.floor(audioplay.currentTime/60)
								let scc=audioplay.currentTime-min*60
								let sccc=scc<10?'0'+Math.floor(scc):Math.floor(scc)
//						 		console.log(audioplay.currentTime)
//								滑動條跟著時間滑動
								let a=(audioplay.currentTime/audioplay.duration)*277.5
								scrolls.style.width=a+'px'
								rounds.style.left=(43+a)+'px'
								this.timess=min+':'+sccc
//								設置歌詞
								for(let i=0,h=this.lrcarr;i<h.length;i++){
								if(parseInt(audioplay.currentTime)==parseInt(h[i])){
											tex2.innerHTML=this.lrcdata[this.lrcarr[i-2]]==undefined?null:this.lrcdata[this.lrcarr[i-2]]
											tex3.innerHTML=this.lrcdata[this.lrcarr[i-1]]==undefined?null:this.lrcdata[this.lrcarr[i-1]]
											tex4.innerHTML=this.lrcdata[this.lrcarr[i]]==undefined?null:this.lrcdata[this.lrcarr[i]]
											tex5.innerHTML=this.lrcdata[this.lrcarr[i+1]]==undefined?null:this.lrcdata[this.lrcarr[i+1]]
											tex6.innerHTML=this.lrcdata[this.lrcarr[i+2]]==undefined?null:this.lrcdata[this.lrcarr[i+2]]
//											console.log(this.lrcdata[this.lrcarr[i]])
										}
	//										console.log('lrcdata.this.lrcarr[i]')
								}

						}, 100)
					if(this.one=='0'){
						audioplay.play();
						this.timess=audioplay.currentTime
						this.one='1'

						let a=(audioplay.currentTime/audioplay.duration)*277.5
						scrolls.style.width=a+'px'
						rounds.style.left=(43+a)+'px'
//						pla.style.backgroundPositionX='-59px';
//						this.backgroundstop='plass'
						this.backgroundimgstop='plass'
						this.pladong='pladong'
	//			 		設置一個定時器
//	          			console.log('正在播放',pla.value)
						}else if(this.one=='1'){
//						pla.style.backgroundPositionX='-11px';
//						pla.style.backgroundImage="url(../assets/stop.png)"
						this.backgroundimgstop=''
//						console.log(pla)
						audioplay.pause()
						
						
						clearInterval(time1)
						time1=null;
						this.pladong='plaTing'
						
						let a=(audioplay.currentTime/audioplay.duration)*277.5
						scrolls.style.width=a+'px'
						rounds.style.left=(43+a)+'px'
	//			 		 this.timess=audioplay.currentTime//視頻當前播放位置
						let min=Math.floor(audioplay.currentTime/60)<10?'0'+( Math.floor(audioplay.currentTime/60)):Math.floor(audioplay.currentTime/60)
						let scc=audioplay.currentTime-Math.floor(audioplay.currentTime/60)*60
						let sccc=scc<10?'0'+Math.floor(scc):Math.floor(scc)
//				 		console.log(sccc)
//						pla.src="../assets/stop.png";
						this.timess=min+':'+sccc
						this.one='0'
//						console.log('正在暫停',pla.value)
					}
				
			},
			cutplay(){
				
				let songer=localStorage.getItem('yuekumsg1')
				//把獲取到的本地數據轉化為
				let arr=JSON.parse(songer);
				this.cunt++
				let i=this.cunt>arr.length-1?this.cunt=0:this.cunt;
//				console.log(i)
					this.playurl=arr[i].url;
//						console.log(this.playurl)
						this.playimg=arr[i].pic
						this.playerauthor=arr[i].singer
//						console.log(this.playerauthor)
//						console.log(i)
						this.playname=arr[i].name;
						let audioplay=document.getElementById('audio')
						var alltime=audioplay.duration
						//分鐘補0
						var min=Math.floor(alltime/60)> 10 ?( Math.floor(alltime/60)):'0'+Math.floor(alltime/60)
						var sc=(alltime-Math.floor(alltime/60)*60)>=10?((Math.floor(alltime)-Math.floor(alltime/60)*60)):'0'+(Math.floor(alltime)-Math.floor(alltime/60)*60)
//						console.log(sc)
						this.times=min+':'+sc
						this.uid=arr[i].id
						this.lrc=arr[i].lrc
						this.save={
							id:this.uid,
							pic:this.playimg,
							name:this.playname,
							singer:this.playerauthor,
							url:this.playurl,
							lrc:this.lrc,
							time:this.times
						}
						this.lrctex='';
						this.lrcObj={};
						this.lrcdata={};//數組對象
						this.lrctexarr=null;
						this.lrcarr=[];
						this.getlrc();
			},
			cutplaypev(){
				
				let songer=localStorage.getItem('shouyemsg1')
				//把獲取到的本地數據轉化為
				let arr=JSON.parse(songer);
				this.cunt--
				let i=this.cunt<0?this.cunt=arr.length-1:this.cunt;
//				console.log(i)
					this.playurl=arr[i].url;
//						console.log(this.playurl)
						this.playimg=arr[i].pic
						this.playerauthor=arr[i].singer
//						console.log(this.playerauthor)
//						console.log(i)
						this.playname=arr[i].name;
						var min=Math.floor(arr[i].time/60)> 10 ?( Math.floor(arr[i].time/60)):'0'+Math.floor(arr[i].time/60)
						var sc=(arr[i].time-Math.floor(arr[i].time/60)*60)>=10?((arr[i].time-Math.floor(arr[i].time/60)*60)):'0'+(arr[i].time-Math.floor(arr[i].time/60)*60)
//						console.log(sc)
						this.times=min+':'+sc
						this.uid=arr[i].id
						this.lrc=arr[i].lrc
						this.save={
							id:this.uid,
							pic:this.playimg,
							name:this.playname,
							singer:this.playerauthor,
							url:this.playurl,
							lrc:this.lrc,
							time:this.times
						}
						this.lrctex='';
						this.lrcObj={};
						this.lrcdata={};//數組對象
						this.lrctexarr=null;
						this.lrcarr=[];
						this.getlrc();
			},

		},
		created(){
			//初始化console.log(screen.height)
			this.height=screen.height
			this.uid=this.$route.params.uid;//獲取到頁面傳來的參數
			this.getplay()
//			this.getlrc()
			let savedata=localStorage.getItem('SaveALL');
			this.saveall=savedata==undefined?[]:JSON.parse(savedata);


		}
	}
	
</script>

<style lang="less" scoped>
#tex2,#tex3,#tex5,#tex6{
font-size: 18px;
    color: #a49d9d;
}
#tex4{
	color: red;
}
.song-text{
	color: white;
	height: 360px;
	overflow: hidden;
}

.taiobox{
	margin-bottom: 15px;
}
.time{
	line-height: 12px;
}
/*=====================*/
#taio{
	margin: 0.53333rem 10px;
    display: inline-block;
    position: relative;
    top: 16px;
    width: 74%;
    height: 0.05333rem;
    background: lightblue;
}

#scroll{
	margin: 0.53333rem 10px;
    display: inline-block;
    position: absolute;
    top: 16px;
    left: 39px;
    /*width: 74%;*/
    height: 0.05333rem;
    background: red;
	
}
#round{
	display: inline-block;
	background: blue;
	border-radius: 5px;
	position: absolute;
    top: 32px;
    left: 43px;
	width: 10px;
	height: 10px;
	z-index: 999;
	
}
/*============================*/
.van-icon{
	color: white;
}
#save{
    position: relative;
    top: -21px;
    background: #e35656;
    right: -26px;
}
#savefa{
	/*margin-top:1.93333rem;
    display: block;
    text-align: right;
    position: relative;
    width: 100%;*/
}
/*.lefttime{
	margin-left: 20px;
}*/
.ctrl{
	position: absolute;
	bottom: 0;
	width: 100%;
	text-align: center;
	background: #8a2be200;
	padding-bottom: 10px;
}
.player{
	background-color: #D8D67E;
	/*min-height: 667px;*/
	/*max-width: 375px;*/
}
.platexdiv{
    width: 100%;
    margin: 0 auto;
    height: 537px;
	text-align: center;
	overflow: hidden;
}
.plaimgdiv{
    width: 15%;
    /* margin: 0.53333rem auto; */
    /* margin-top: 1.2rem; */
    padding-top: 50px;
    padding-left: 6px;
}
.van-nav-bar__text,
.van-nav-bar{
	color: white;
}
.songtop{
	background:#1989FA;
	/*padding-bottom: 45px;*/
	.van-nav-bar{
		background: #1989FA;
		.van-nav-bar__title{
			color:white ;
		}
	}
}
.allpla{
	width: 35px;
    height: 35px;
    /*background: url(../assets/allplayer.jpg);*/
    /*border: lightcyan 1px solid;*/
    /*display: inline-block;*/
   text-align: center;

    /*border-radius: 25px;*/
}
.imgs{
    width: 1.28rem;
    height: 1.28rem;
    border: #f1adeabf 0.02667rem solid;
    display: inline-block;
    border-radius: 0.66667rem;
    margin: 0 0.2667rem;
    background: #f1adeabf;
}
#pla{
	background-image:url(../assets/star.png);
	background-size:cover ;
    margin: 5px;
    margin-left: 8px;

}
.plass{
	background-image:url(../assets/stop.png) !important;
}
#pla1{
	background-image:url(../assets/pev.png);
	background-size:cover ;
	margin: 5px;
	/*transform: rotateZ(180deg);*/
}
#pla3{
	background-image:url(../assets/next.png);
    background-size: cover;
    /* margin: 0; */
    margin-left: 8px;
    margin-top: 6px;
    /* background-position: -59px 46px; */
}
/*============*/

.play{
	/*width: 80%;*/
	margin: 0 auto;
	background-size:cover ;
    /*min-height: 16.56rem;*/
    color: whitesmoke;
}
audio{
	width: 0;
	height: 0;
}
.playimg{
	width: 100%;
	border-radius: 50%;
	border: 2px goldenrod solid;
	outline: goldenrod;
	animation: 10s linear infinite;
}
.pladong{
	animation-name:round1 ;
}
.plaTing{
	animation-name:'' ;
}
@keyframes round1{
	from{transform: rotate(0)}
	to{transform: rotate(360deg)}
}
.songtop .van-nav-bar{
    background: #fafbfc0f;
}
[class*=van-hairline]::after{
	bottom:0;
	right: 0;
	top: 0;
	left: 0;
}
</style>