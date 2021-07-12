$(document).ready(function(){
    
    //设置左侧为可复制的
    $(".deviceLeft .deviceLeft_box").children().draggable({
        helper: "clone",
        scope: "zlg",
    });

    //设置右侧为拖拽存放区
    var i=0;
    $("#main").droppable({
        scope:"zlg",
        drop:function (event , ui) {
            var left = parseInt(ui.offset.left - $(this).offset().left);
            var top = parseInt(ui.offset.top - $(this).offset().top);
            var type=ui.draggable[0].dataset.type;
            switch (type) {
                case "server"://服务器
                    i++; 
                    var id = "chart-server" + i;
                    $(this).append('<div class="node node1css server" style="position: absolute" id="' + id + '" data-type="'+type+'" data-id=" " >' + $(ui.helper).html() + '</div>');
                    $("#" + id).css("left", left).css("top", top);
                    jsPlumb.addEndpoint(id, { anchors: "Top" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Right" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Bottom" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Left" }, hollowCircle);
                    jsPlumb.draggable(id);
                    jsPlumb.makeTarget(id, {
                        anchor: "Continuous"
                    })
                    $("#" + id).draggable({ containment: "parent",grid: [10, 10] });
                    doubleclick("#" + id);
                    break;
                case "host"://主机
                    i++;
                    id = "chart-host" + i;
                    $(this).append('<div class="node node2css host" style=\'position: absolute\' id="' + id + '" data-type="'+type+'" data-id=" " >' + $(ui.helper).html() + "</div>");
                    $("#" + id).css("left", left).css("top", top);
                    jsPlumb.addEndpoint(id, { anchors: "Top" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Right" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Bottom" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Left" }, hollowCircle);
                    jsPlumb.addEndpoint(id, hollowCircle);
                    jsPlumb.draggable(id);
                    jsPlumb.makeTarget(id, {
                        anchor: "Continuous"
                    })
                    $("#" + id).draggable({ containment: "parent",grid: [10, 10] });
                    doubleclick("#" + id);
                    break;
                case "aisle"://通道
                    i++;
                    id = "chart-aisle" + i;
                    $(this).append('<div class="node node3css aisle" style=\'position: absolute\' id="' + id + '" data-type="'+type+'" data-id=" " >' + $(ui.helper).html() + "</div>");
                    $("#" + id).css("left", left).css("top", top);
                    jsPlumb.addEndpoint(id, { anchors: "Top" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Right" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Bottom" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Left" }, hollowCircle);
                    jsPlumb.addEndpoint(id, hollowCircle);
                    jsPlumb.draggable(id);
                    jsPlumb.makeTarget(id, {
                        anchor: "Continuous"
                    })
                    $("#" + id).draggable({ containment: "parent",grid: [10, 10] });
                    doubleclick("#" + id);
                    break;
                case "route"://路由
                    i++;
                    id = "chart-route" + i;
                    $(this).append('<div class="node node4css route" style=\'position: absolute\' id="' + id + '" data-type="'+type+'" data-id=" " >' + $(ui.helper).html() + '</div>');
                    $("#" + id).css("left", left).css("top", top);
                    jsPlumb.addEndpoint(id, { anchors: "Top" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Right" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Bottom" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Left" }, hollowCircle);
                    jsPlumb.draggable(id);
                    jsPlumb.makeTarget(id, {
                        anchor: "Continuous"
                    })
                    $("#" + id).draggable({ containment: "parent",grid: [10, 10] });
                    doubleclick("#" + id);
                    break;
                case "signal"://信号
                    i++;
                    id = "chart-signal" + i;
                    $(this).append('<div class="node node5css signal" style=\'position: absolute\' id="' + id + '" data-type="'+type+'" data-id=" " >' + $(ui.helper).html() + '</div>');
                    $("#" + id).css("left", left).css("top", top);
                    jsPlumb.addEndpoint(id, { anchors: "Top" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Right" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Bottom" }, hollowCircle);
                    jsPlumb.addEndpoint(id, { anchors: "Left" }, hollowCircle);
                    jsPlumb.draggable(id);
                    jsPlumb.makeTarget(id, {
                        anchor: "Continuous"
                    })
                    $("#" + id).draggable({ containment: "parent",grid: [10, 10] });
                    doubleclick("#" + id);
                    break;
            }
        }
    });

    //基本连接线样式
    var connectorPaintStyle = {
        lineWidth: 2,
        strokeStyle: "#61b8d0",
    };

    // 鼠标悬浮在连接线上的样式
    var connectorHoverStyle = {
        lineWidth: 2,
        strokeStyle: "green",
    };

    //端点的颜色样式
    var paintStyle = {
        fillStyle: "#ccc",
        radius: 10,
        lineWidth:6 ,
    }

    // 鼠标悬浮在端点上的样式
    var hoverPaintStyle = {
        fillStyle: "#aaa",
    }

    //设置连接端点和连接线
    var hollowCircle = {
        endpoint: ["Dot", { radius: 5 }],  //端点的形状
        connectorStyle: connectorPaintStyle,
        connectorHoverStyle: connectorHoverStyle,
        paintStyle: paintStyle,
        hoverPaintStyle: hoverPaintStyle ,
        isSource: true,    //是否可以拖动（作为连线起点）
        connector: ["Bezier", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],  //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
        isTarget: true,    //是否可以放置（连线终点）
        maxConnections: -1,    // 设置连接点最多可以连接几条线
        connectorOverlays:[
            [ "Arrow", { width:10, length:20, location:1, id:"arrow" } ],
            ["Custom", {
                create:function(component) {
                    return $('<span style="background:#fff;position:relative;z-index:999;cursor:pointer;">单击输入</span>');
                },
                location:0.5,
                id:"customOverlay",
            }],
        ],
    };

    //鼠标进入增加一个删除的小图标
    $("#main").on("mouseenter", ".node", function () {
        $(this).append('<img src="./images/close2.png"  style="position:absolute;" />');
        var widthnum = $(this).css("width").substr(0,5);
        if (widthnum <  60) {
            $("img").css("left", 67).css("top", -13);
        } else {
            $("img").css("left", 110).css("top", -10);
        }
    });
    //鼠标离开小图标消失
    $("#main").on("mouseleave", ".node", function () {
        $("img").remove();
    });
    //节点小图标的单击事件
    $("#main").on("click", "img",function () {
        if (confirm("确定要删除此节点吗?")) {
            jsPlumb.removeAllEndpoints($(this).parent().attr("id"));
            $(this).parent().remove();
        }
    });

    //连接线中的文字双击事件
    $("#deviceRight").on("click", "._jsPlumb_overlay", function () {
        var that=$(this)
        that.removeClass('_jsPlumb_overlay')
        var text = that.text();
        that.html("");
        that.append('<input type="text" id="myDropDown" value="' + text + '" />');
        $('#myDropDown').blur(function () {
            that.html($("#myDropDown").val());
            that.addClass('_jsPlumb_overlay')
        });
        return false
    });

    //连接线的双击事件
    jsPlumb.bind("dblclick", function (conn, originalEvent) {
        if (confirm("确定删除此连线吗？"))
            jsPlumb.detach(conn);
    });

    //双击节点内容区域时的事件
    function doubleclick(id) {
        $(id).dblclick(function () {
            var text = $(this).text();
            $(this).html("");
            $(this).append('<input style="width:100%" type="text" class="note" value="' + text + '" />');
            $(this).mouseleave(function () {
                $(this).html($(".note").val());
            });
        });
    }

    

    // 当连线建立前
    jsPlumb.bind('beforeDrop', function (info) {
        if(info.sourceId==info.targetId){//判断当开始和终点为一个节点时，不连线。
            return false
        }

        return true // 链接会自动建立
    })

    //导出json
    $('.btn1').click(function(){
        var ojson={
            server:[],
            host:[],
            aisle:[],
            route:[],
            signal:[],
            line:[],
        }

        //服务器
        $("#main .server").each(function (idx, elem) {
            var $elem = $(elem);
            var param={
                id: $elem.data('id'),
                divId:$elem.attr('id'),
                name: $elem[0].innerText,
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10),
                type:$elem.data('type')
            }
            ojson.server.push(param)
        });

        //主机
        $("#main .host").each(function (idx, elem) {
            var $elem = $(elem);
            var param={
                id: $elem.data('id'),
                divId:$elem.attr('id'),
                name: $elem[0].innerText,
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10),
                type:$elem.data('type')
            }
            ojson.host.push(param)
        });

        //通道
        $("#main .aisle").each(function (idx, elem) {
            var $elem = $(elem);
            var param={
                id: $elem.data('id'),
                divId:$elem.attr('id'),
                name: $elem[0].innerText,
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10),
                type:$elem.data('type')
            }
            ojson.aisle.push(param)
        });

        //路由
        $("#main .route").each(function (idx, elem) {
            var $elem = $(elem);
            var param={
                id: $elem.data('id'),
                divId:$elem.attr('id'),
                name: $elem[0].innerText,
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10),
                type:$elem.data('type')
            }
            ojson.route.push(param)
        });

        //信号
        $("#main .signal").each(function (idx, elem) {
            var $elem = $(elem);
            var param={
                id: $elem.data('id'),
                divId:$elem.attr('id'),
                name: $elem[0].innerText,
                positionX: parseInt($elem.css("left"), 10),
                positionY: parseInt($elem.css("top"), 10),
                type:$elem.data('type')
            }
            ojson.signal.push(param)
        });

        //连线
        $.each(jsPlumb.getConnections(), function (idx, connection) {
            var param={
                connectionId: connection.id,
                pageSourceId: connection.sourceId,
                pageTargetId: connection.targetId
            }
            ojson.line.push(param)
        });

        //打印json
        ojson=JSON.stringify(ojson)
        console.log(ojson)

    })
})
 

