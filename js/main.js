$(function(){
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
		//餐厅值不为空，加载该餐厅的套餐列表
		if(restauran!=""){
			$.getJSON("data/food.json", function(data){	
				var lis = "";
				$.each(data, function(i,item){
					if(item.restaurant == restauran){
						$.each(item.food, function(i,item_food){ 
							//alert(item_food.food_name)
							var one_li = "<li><a href='#' data-rel='back' data-value='"+item_food.food_name+"'>"+item_food.food_name+"</a></li>"
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
		$("#food").val(food);
	 });
});



