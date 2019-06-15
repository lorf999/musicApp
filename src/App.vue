<template>
  <div id="app" :style="{height:height+'px'}">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
	return{
		height:null
	}
  },
  created(){
			//初始化
//			console.log(screen.height)
			this.height=screen.height
  }
}
</script>

<style>
.van-hairline--top-bottom::after{
	border-width:0 !important; 
}
#app{
	background-color:white;
}
</style>
