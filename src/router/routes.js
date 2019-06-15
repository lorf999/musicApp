import routesComponent from './routesComponent.js'

export default [

	{
		path:'/register',
		name:'Register',
		component:routesComponent.Register
	},

	{
//		如果路徑為空,則就是一開始要顯示的頁面
		path:'/zhuche',
		name:'Zhuche',
		component:routesComponent.Zhuche
	},
	{
//		如果路徑為空,則就是一開始要顯示的頁面
		path:'/',
		name:'Denglu',
		component:routesComponent.Denglu
	},

	{
//		如果路徑為空,則就是一開始要顯示的頁面
		path:'/shouye',
		name:'Shouye',
		component:routesComponent.Shouye,
//		children: [
//					
//			]
	},

	{
		path: '/songlist',
		name: 'songList',
		component: routesComponent.songList
	},
	{
		path: '/yueku',
		name: 'Yueku',
		component: routesComponent.Yueku
	},
	{
		path: '/mvsong',
		name: 'MVsong',
		component: routesComponent.MVsong
	},
	{
		path: '/my/:uid',
		name: 'My',
		component: routesComponent.My
	},
	{
		path: '/player/:uid',
		name: 'Player',
		component: routesComponent.Player
	},
//		{
//		path: '/playersonglist/:uid',
//		name: 'Playersonglist',
//		component: routesComponent.Playersonglist
//	},
			{
		path: '/allmusic/:uid/:tex/:name',
		name: 'Allmusic',
		component: routesComponent.Allmusic
	},
//	{
//		path: '/playerKuwo/:uid',
//		name: 'PlayerKuwo',
//		component: routesComponent.PlayerKuwo
//	},
		{
		path: '/mysave',
		name: 'Mysave',
		component: routesComponent.Mysave
	},
			{
		path: '/search',
		name: 'Search',
		component: routesComponent.Search
	},
//二級路由
]
