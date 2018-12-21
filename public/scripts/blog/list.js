$(document).ready(function(){

    $(document).on('click','.btn-delete',function(e){
        const evt = e;
        const $this = $(this);
        evt.preventDefault();
        bootbox.confirm(Messages.EN.areyousure, function(result){
            if(result)
                window.location.href = $this.attr("href");
        });
    });

});