function GetTime() {
	var date = new Date();
	var base = Date.parse(date); // 转换为时间戳
	var year = date.getFullYear(); //获取当前年份
	var mon = date.getMonth() + 1; //获取当前月份
	var day = date.getDate(); //获取当前日
	var oneDay = 24 * 3600 *1000
		//var daytime = `${year}${mon >= 10 ? mon : '0' + mon}${day >= 10 ? day : '0' + day}`; //今日时间
		//this.$data.daytime = daytime; // 今日时间赋值给变量
				
	var daytimeArr = []
		for (var i = 0; i < 7 ; i++) { //前七天的时间
            var now;
			i==0?now = new Date():now = new Date(base += oneDay);
			var myear = now.getFullYear();
			var month = now.getMonth() + 1;
			var mday = now.getDate()
			daytimeArr.push([myear, month >=10 ?month :'0'+ month, mday>=10?mday:'0'+mday].join('-'))
		}
			return daytimeArr
    }
module.exports = GetTime