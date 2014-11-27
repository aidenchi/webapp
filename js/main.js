$(function(){
	//初始时，隐藏选套餐
	$("#selectfood").hide();
	
	//加载餐厅列表
	$.getJSON("data/restaurant.json",function(data){
		var lis = "";
		$.each(data, function(i,item){ 
		  //alert(item.restaurant);
		  var one_li = "<li><a href='#' data-rel='back' data-value='"+item.restaurant+"'>"+item.restaurant+"</a></li>"
		  //alert(one_li);
		  lis = lis + one_li;		  
	    });  	
		//alert(lis);
		$("#restaurant_list").html(lis);
		$("#restaurant_list").listview("refresh");
	});
	
	//选餐厅 点击选中 onclick事件
	$("#restaurant_list").on("click", "a[data-value]", function(){		
		//alert(restauran);
		//获取当前选中值
        var restauran = $(this).attr("data-value");  
		//获取餐厅input值（前一次选择的）
		var old_restauran = $("#restaurant").val();
		//判断是否和当前选中的一样
		if(restauran != old_restauran){//不一样则清空前一次套餐input值
			$("#food").val("");
		}
		//赋值给餐厅input
		$("#restaurant").val(restauran);
		//餐厅值不为空
		if(restauran!=""){
			//显示选套餐
			$("#selectfood").show();
			//加载该餐厅的套餐列表
			$.getJSON("data/food.json", function(data){	
				var lis = "";
				$.each(data, function(i,item){
					if(item.restaurant == restauran){
						$.each(item.food, function(i,item_food){ 
							//alert(item_food.food_name)
							var one_li = "<li><a href='#' data-rel='back' data-value='"+item_food.food_name+","+item_food.price+"'>"+
										item_food.food_name+"<span class='ui-li-count'>￥"+item_food.price+"</span></a></li>"
							//alert(one_li);
							lis = lis + one_li;	
						}); 
					}
				}); 
				$("#food_list").html(lis);
				$("#food_list").listview("refresh");
			});
		}		
     });
	 
	 //选套餐 点击选中 onclick事件
	 $("#food_list").on("click", "a[data-value]", function(){
		var food = $(this).attr("data-value");
		food = food.split(',');
		$("#food").val(food[0]);
		$("#price").val(food[1]);
	 });
	 
	 //提交表单	 
	 $("#submitbtn").click(function(){
		var username = $("#username").val();
		var restaurant = $("#restaurant").val();
		var food = $("#food").val();	
		var price = $("#price").val();
		if(username!="" && restaurant!="" && food!="" && price!=""){
			//保存订单信息
			var data = {"username":username,"restaurant":restaurant,"food":food,"price":price};
			$.jStorage.set("order"+username, data);
			$.mobile.changePage("order.html#pagesuccess");
			//清空表单
			$("#username").val("");
			$("#restaurant").val("");
			$("#food").val("");
			$("#price").val("");
			$("#selectfood").hide();
		}else{
			//alert("信息填写不完整！");			
			$.mobile.changePage("order.html#pageerror");		
		}
	 });
	 
	//加载订单
	getOrders();
	
	//清空订单
	$("#clearbtn").click(function(){
		$.jStorage.flush();
		location.reload();
	});
});

//加载订单
function getOrders(){	
	var orderlist = $.jStorage.index();
	//alert(orderlist.length+"--"+orderlist[0]+"--"+orderlist[1]);	
	var lis = "";
	var totalprice = 0;
	for(var i=0; i<orderlist.length; i++){
		var one_order = $.jStorage.get(orderlist[i]);
		var one_li = "<li data-role='list-divider'>"+one_order.username+"</li>"+
					"<li data-icon='false'><a href='#'><span class='ui-li-count'>￥"+one_order.price+"</span><h2>"+one_order.restaurant+"</h2><p>"+one_order.food+"</p></a></li>";
		lis = lis + one_li;
		totalprice = (parseFloat(totalprice) + parseFloat(one_order.price)).toFixed(1);
	}
	lis = "<li data-role='divider'>共"+orderlist.length+"份订单，合计"+totalprice+"元</li>"+lis;
	$("#vieworder").html(lis);
	$("#vieworder").listview("refresh");
}



