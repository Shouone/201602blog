var flag=0;
var ids;
var aShow=function(id){
    $(`#a${id}`).parent().siblings('.articles').find('.media-bodyer').hide(300);
    $(`#a${id}`).next().toggle(300);
}
var imgMax=function(id){
    if(ids!=id){
        flag=0;
        $(`#${ids}`).css({
            "width": "30px",
            "height": "15px"
        });
    };
    flag=!flag;
    console.log(flag);
    event.preventDefault();
    if(flag){
        $(`#${id}`).css({
            "width":"100%",
            "height":"100%"
        });
        ids=id;
    }else {
        $(`#${id}`).css({
            "width": "30px",
            "height": "15px"
        });
    }
    ;

}