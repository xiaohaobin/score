//页面加载的时候获取已创建的图表应用的url

fnAjax.method_5(url_join("CharApply/queryChartApply"),"","post",function(data){
	$.each(data, function(k, v) { //data-id指的是后台保存该应用的id标示
			var $html = $('<div class="box box-element ui-draggable"><a href="#close" class="remove label label-important"><i class="icon-remove icon-white"></i>删除</a><span class="drag label"><i class="icon-move"></i>拖动</span><div class="preview">' + v.applyName + '</div><div class="view"><div class="iframeBox" data="../' + v.path + '"><iframe  width="100%" height="100%" src=""></iframe></div></div></div>');
			$("#elmBase").append($html);
		});
});
setTimeout(function() {

	//--------------------------------清除样式表-----------------------------------------------------------------------------
	//clearLink();
	function clearLink() {
		var ifBox = document.getElementsByTagName("iframe");
		for(var i = 0; i < ifBox.length; i++) {
			//清除样式表
			ifBox[i].contentWindow.document.getElementsByClassName("chartCommonStyle")[0].remove();
		}
	}
	//--------------------------------清除样式表-----------------------------------------------------------------------------

	function supportstorage() {
		if(typeof window.localStorage == 'object')
			return true;
		else
			return false;
	}

	function handleSaveLayout() {
		var e = $(".demo").html();
		if(!stopsave && e != window.demoHtml) {
			stopsave++;
			window.demoHtml = e;
			saveLayout();
			stopsave--;
		}
	}

	var layouthistory;

	function saveLayout() {
		var data = layouthistory;
		if(!data) {
			data = {};
			data.count = 0;
			data.list = [];
		}
		if(data.list.length > data.count) {
			for(i = data.count; i < data.list.length; i++)
				data.list[i] = null;
		}
		data.list[data.count] = window.demoHtml;
		data.count++;
		if(supportstorage()) {
			localStorage.setItem("layoutdata", JSON.stringify(data));
		}
		layouthistory = data;
		//console.log(data);
		/*$.ajax({  
			type: "POST",  
			url: "/build/saveLayout",  
			data: { layout: $('.demo').html() },  
			success: function(data) {
				//updateButtonsVisibility();
			}
		});*/
	}

	function downloadLayout() {

		$.ajax({
			type: "POST",
			url: "/build/downloadLayout",
			data: {
				layout: $('#download-layout').html()
			},
			success: function(data) {
				window.location.href = '/build/download';
			}
		});
	}

	function downloadHtmlLayout() {
		$.ajax({
			type: "POST",
			url: "/build/downloadLayout",
			data: {
				layout: $('#download-layout').html()
			},
			success: function(data) {
				window.location.href = '/build/downloadHtml';
			}
		});
	}

	function undoLayout() {
		var data = layouthistory;
		//console.log(data);
		if(data) {
			if(data.count < 2) return false;
			window.demoHtml = data.list[data.count - 2];
			data.count--;
			$('.demo').html(window.demoHtml);
			if(supportstorage()) {
				localStorage.setItem("layoutdata", JSON.stringify(data));
			}
			return true;
		}
		return false;
		/*$.ajax({  
			type: "POST",  
			url: "/build/getPreviousLayout",  
			data: { },  
			success: function(data) {
				undoOperation(data);
			}
		});*/
	}

	function redoLayout() {
		var data = layouthistory;
		if(data) {
			if(data.list[data.count]) {
				window.demoHtml = data.list[data.count];
				data.count++;
				$('.demo').html(window.demoHtml);
				if(supportstorage()) {
					localStorage.setItem("layoutdata", JSON.stringify(data));
				}
				return true;
			}
		}
		return false;
		/*
		$.ajax({  
			type: "POST",  
			url: "/build/getPreviousLayout",  
			data: { },  
			success: function(data) {
				redoOperation(data);
			}
		});*/
	}

	function handleJsIds() {
		handleModalIds();
		handleAccordionIds();
		handleCarouselIds();
		handleTabsIds()
	}

	function handleAccordionIds() {
		var e = $(".demo #myAccordion");
		var t = randomNumber();
		var n = "accordion-" + t;
		var r;
		e.attr("id", n);
		e.find(".accordion-group").each(function(e, t) {
			r = "accordion-element-" + randomNumber();
			$(t).find(".accordion-toggle").each(function(e, t) {
				$(t).attr("data-parent", "#" + n);
				$(t).attr("href", "#" + r)
			});
			$(t).find(".accordion-body").each(function(e, t) {
				$(t).attr("id", r)
			})
		})
	}

	function handleCarouselIds() {
		var e = $(".demo #myCarousel");
		var t = randomNumber();
		var n = "carousel-" + t;
		e.attr("id", n);
		e.find(".carousel-indicators li").each(function(e, t) {
			$(t).attr("data-target", "#" + n)
		});
		e.find(".left").attr("href", "#" + n);
		e.find(".right").attr("href", "#" + n)
	}

	function handleModalIds() {
		var e = $(".demo #myModalLink");
		var t = randomNumber();
		var n = "modal-container-" + t;
		var r = "modal-" + t;
		e.attr("id", r);
		e.attr("href", "#" + n);
		e.next().attr("id", n)
	}

	function handleTabsIds() {
		var e = $(".demo #myTabs");
		var t = randomNumber();
		var n = "tabs-" + t;
		e.attr("id", n);
		e.find(".tab-pane").each(function(e, t) {
			var n = $(t).attr("id");
			var r = "panel-" + randomNumber();
			$(t).attr("id", r);
			$(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r)
		})
	}

	function randomNumber() {
		return randomFromInterval(1, 1e6)
	}

	function randomFromInterval(e, t) {
		return Math.floor(Math.random() * (t - e + 1) + e)
	}

	function gridSystemGenerator() {
		$(".lyrow .preview input").bind("keyup", function() {
			var e = 0;
			var t = "";
			var n = $(this).val().split(" ", 12);
			$.each(n, function(n, r) {
				e = e + parseInt(r);
				t += '<div class="span' + r + ' column"></div>'
			});
			if(e == 12) {
				$(this).parent().next().children().html(t);
				$(this).parent().prev().show()
			} else {
				$(this).parent().prev().hide()
			}
		})
	}

	function configurationElm(e, t) {
		$(".demo").delegate(".configuration > a", "click", function(e) {
			e.preventDefault();
			var t = $(this).parent().next().next().children();
			$(this).toggleClass("active");
			t.toggleClass($(this).attr("rel"))
		});
		$(".demo").delegate(".configuration .dropdown-menu a", "click", function(e) {
			e.preventDefault();
			var t = $(this).parent().parent();
			var n = t.parent().parent().next().next().children();
			t.find("li").removeClass("active");
			$(this).parent().addClass("active");
			var r = "";
			t.find("a").each(function() {
				r += $(this).attr("rel") + " "
			});
			t.parent().removeClass("open");
			n.removeClass(r);
			n.addClass($(this).attr("rel"))
		})
	}

	function removeElm() {
		$(".demo").delegate(".remove", "click", function(e) {
			e.preventDefault();
			$(this).parent().remove();
			if(!$(".demo .lyrow").length > 0) {
				clearDemo()
			}
		})
	}

	function clearDemo() {
		$(".demo").empty();
		layouthistory = null;
		if(supportstorage())
			localStorage.removeItem("layoutdata");
	}

	function removeMenuClasses() {
		$("#menu-layoutit li button").removeClass("active")
	}

	function changeStructure(e, t) {
		$("#download-layout ." + e).removeClass(e).addClass(t)
	}

	function cleanHtml(e) {
		$(e).parent().append($(e).children().html())
	}

	function downloadLayoutSrc() {
		var e = "";
		$("#download-layout").children().html($(".demo").html());
		var t = $("#download-layout").children();
		t.find(".preview, .configuration, .drag, .remove").remove();
		t.find(".lyrow").addClass("removeClean");
		t.find(".box-element").addClass("removeClean");
		t.find(".lyrow .lyrow .lyrow .lyrow .lyrow .removeClean").each(function() {
			cleanHtml(this)
		});
		t.find(".lyrow .lyrow .lyrow .lyrow .removeClean").each(function() {
			cleanHtml(this)
		});
		t.find(".lyrow .lyrow .lyrow .removeClean").each(function() {
			cleanHtml(this)
		});
		t.find(".lyrow .lyrow .removeClean").each(function() {
			cleanHtml(this)
		});
		t.find(".lyrow .removeClean").each(function() {
			cleanHtml(this)
		});
		t.find(".removeClean").each(function() {
			cleanHtml(this)
		});
		t.find(".removeClean").remove();
		$("#download-layout .column").removeClass("ui-sortable");
		$("#download-layout .row-fluid").removeClass("clearfix").children().removeClass("column");
		if($("#download-layout .container").length > 0) {
			changeStructure("row-fluid", "row")
		}
		formatSrc = $.htmlClean($("#download-layout").html(), {
			format: true,
			allowedAttributes: [
				["id"],
				["class"],
				["data-toggle"],
				["data-target"],
				["data-parent"],
				["role"],
				["data-dismiss"],
				["aria-labelledby"],
				["aria-hidden"],
				["data-slide-to"],
				["data-slide"]
			]
		});
		$("#download-layout").html(formatSrc);
		$("#downloadModal textarea").empty();
		$("#downloadModal textarea").val(formatSrc)
	}

	var currentDocument = null;
	var timerSave = 1000;
	var stopsave = 0;
	var startdrag = 0;
	var demoHtml = $(".demo").html();
	var currenteditor = null;
	$(window).resize(function() {
		$("body").css("min-height", $(window).height() - 90);
		$(".demo").css("min-height", $(window).height() - 160)
	});

	function restoreData() {
		if(supportstorage()) {
			layouthistory = JSON.parse(localStorage.getItem("layoutdata"));
			if(!layouthistory) return false;
			window.demoHtml = layouthistory.list[layouthistory.count - 1];
			if(window.demoHtml) $(".demo").html(window.demoHtml);
		}
	}

	function initContainer() {
		$(".demo, .demo .column").sortable({
			connectWith: ".column",
			opacity: .35,
			handle: ".drag",
			start: function(e, t) {
				if(!startdrag) stopsave++;
				startdrag = 1;
			},
			stop: function(e, t) {
				if(stopsave > 0) stopsave--;
				startdrag = 0;
			}
		});
		configurationElm();
	}
	setTimeout(function() {

		//$(document).ready(function() {

		//CKEDITOR.disableAutoInline = true;
		restoreData();
		/*
		var contenthandle = CKEDITOR.replace( 'contenteditor' ,{
			language: 'zh-cn',
			contentsCss: ['css/bootstrap-combined.min.css'],
			allowedContent: true
		});
		*/
		$("body").css("min-height", $(window).height() - 90);
		$(".demo").css("min-height", $(window).height() - 160);

		//拖拽图表的时候
		$(".sidebar-nav .lyrow").draggable({
			connectToSortable: ".demo",
			helper: "clone",
			handle: ".drag",
			start: function(e, t) { //开始拖拽布局线框的时候
				if(!startdrag) stopsave++;
				startdrag = 1;

			},
			drag: function(e, t) { //指的是拖拽布局线框进行移动的时候
				t.helper.width(400);

			},
			stop: function(e, t) { //结束拖拽布局线框的时候

				$("div.demo div.lyrow span.drag").remove();
				//         布局一行只能一层父级别
				$(".span3,.span4,.span5,.span6,.span7,.span8,.span9,.span12").each(function(i) {
					if($(this).children().hasClass("lyrow")) {
						//					alert("是你");
						$(this).children().remove();
					}
				});

				var rowNum = $(".demo.ui-sortable>div").length;
				if(rowNum == 1) {
					$(".demo.ui-sortable>div").height("95vh");
				}
				if(rowNum == 2) {
					$(".demo.ui-sortable>div").height("50vh");
				}
				if(rowNum >= 3) {
					$(".demo.ui-sortable>div").height("33vh");
				}
				if(rowNum > 3) {
					layer.alert("最多只能创建三行！", {
						icon: 0
					});
					$(".demo.ui-sortable>div:last-child").remove();

				}

				$(".demo .column").sortable({
					opacity: .35,
					connectWith: ".column",
					start: function(e, t) { //线框布局布好之后，开始拖拽图表的时候
						if(!startdrag) stopsave++;
						startdrag = 1;

					},
					stop: function(e, t) { //线框布局布好之后，完成拖拽图表的时候
						if(stopsave > 0) stopsave--;
						startdrag = 0;
						//					alert("ss");
					}
				});
				if(stopsave > 0) {
					stopsave--;
				}
				startdrag = 0;
			}
		});

		//拖拽图表
		$(".sidebar-nav .box").draggable({
			//		connectToSortable: ".column",
			connectToSortable: ".demo>.lyrow.ui-draggable>div.view>div.row-fluid>.column",
			helper: "clone",
			handle: ".drag",
			start: function(e, t) {
				if(!startdrag) stopsave++;
				startdrag = 1;

			},
			drag: function(e, t) {
				t.helper.width(400);
				//			t.helper.height(400);
			},
			stop: function(d) {
				//判断一个div中的图表模块数量，大于1的时候，删除最后一个
				$(".demo>.lyrow>.view>.row-fluid>.span3,.demo>.lyrow>.view>.row-fluid>.span4,.demo>.lyrow>.view>.row-fluid>.span5,.demo>.lyrow>.view>.row-fluid>.span6,.demo>.lyrow>.view>.row-fluid>.span7,.demo>.lyrow>.view>.row-fluid>.span8,.demo>.lyrow>.view>.row-fluid>.span9,.demo>.lyrow>.view>.row-fluid>.span12").each(function() {
					var len = $(this).children().length;
					if(len > 1) {
						$(this).children("div:last-child").remove();
					}
				});

				handleJsIds();
				if(stopsave > 0) stopsave--;
				startdrag = 0;
				setTimeout(function(){
					$(".span6.ui-sortable>div>.view>.iframeBox,.span4.ui-sortable>div>.view>.iframeBox,.span5.ui-sortable>div>.view>.iframeBox,.span7.ui-sortable>div>.view>.iframeBox,.span8.ui-sortable>div>.view>.iframeBox,.span12.ui-sortable>div>.view>.iframeBox").each(function(i){
						if($(this).children("iframe").attr("src") == "" || $(this).children("iframe").attr("src") == undefined){
							$(this).children("iframe").attr("src",$(this).attr("data"));
						}
						
					});
				},100);
			}

		});
		initContainer();
		$('body.edit .demo').on("click", "[data-target=#editorModal]", function(e) {
			e.preventDefault();
			currenteditor = $(this).parent().parent().find('.view');
			var eText = currenteditor.html();
			//contenthandle.setData(eText);
		});
		/*
		//保存
		$("#savecontent").click(function(e) {
			e.preventDefault();
			currenteditor.html(contenthandle.getData());
		});
	
		*/

		$("[data-target=#downloadModal]").click(function(e) {
			e.preventDefault();
			downloadLayoutSrc();
		});
		$("[data-target=#shareModal]").click(function(e) {
			e.preventDefault();
			handleSaveLayout();
		});
		$("#download").click(function() {
			downloadLayout();
			return false
		});
		$("#downloadhtml").click(function() {
			downloadHtmlLayout();
			return false
		});

		//编辑布局
		$("#edit").click(function() {
			$("body").removeClass("devpreview sourcepreview");
			$("body").addClass("edit");
			removeMenuClasses();
			$(this).addClass("active");
			return false
		});
		//清空布局
		$("#clear").click(function(e) {
			e.preventDefault();
			clearDemo();
		});

		//布局编辑
		$("#devpreview").click(function() {
			$("body").removeClass("edit sourcepreview");
			$("body").addClass("devpreview");
			removeMenuClasses();
			$(this).addClass("active");
			return false
		});
		//预览
		$("#sourcepreview").click(function() {
			$("body").removeClass("edit");
			$("body").addClass("devpreview sourcepreview");
			removeMenuClasses();
			$(this).addClass("active");
			return false
		});

		//保存布局
		$("#saveBtn").click(function() {
			layer.prompt({
					title: "请输入布局模型的名称"
				},
				function(value, index, elem) {
					//alert(value); //得到value
					layer.close(index);					
					fnAjax.method_5(
						url_join("LayoutManage/addLayout"),
						{
							"layoutitName": value,
							"layoutitHtml": $("#layoutBox").html()
						},
						"post",
						function(data){
							console.log(data);
							(data.result == 'success') && (layer.msg("添加成功！", {
								icon: 1,
								time: 2000
							}));
							(data.result != 'success') && (layer.msg("添加失败！", {
								icon: 0,
								time: 2000
							}));
						}
					);
				}
			);

		});
		//下载的时候自适应宽度
		$("#fluidPage").click(function(e) {
			e.preventDefault();
			changeStructure("container", "container-fluid");
			$("#fixedPage").removeClass("active");
			$(this).addClass("active");
			downloadLayoutSrc()
		});
		//下载的时候固定宽度
		$("#fixedPage").click(function(e) {
			e.preventDefault();
			changeStructure("container-fluid", "container");
			$("#fluidPage").removeClass("active");
			$(this).addClass("active");
			downloadLayoutSrc()
		});

		//左边菜单折叠收缩
		$(".nav-header").click(function() {
			if($(this).next().hasClass("hide")) {
				$(this).next().removeClass("hide");
				$(this).find(".icon-white").removeClass("icon-plus").addClass("icon-minus");
			} else {
				$(this).next().addClass("hide");
				$(this).find(".icon-white").addClass("icon-plus").removeClass("icon-minus");
			}
		});
		$('#undo').click(function() {
			stopsave++;
			if(undoLayout()) initContainer();
			stopsave--;
		});
		$('#redo').click(function() {
			stopsave++;
			if(redoLayout()) initContainer();
			stopsave--;
		});
		removeElm();
		gridSystemGenerator();
		setInterval(function() {
			handleSaveLayout()
		}, timerSave)

		//})
	}, 100);
}, 100);