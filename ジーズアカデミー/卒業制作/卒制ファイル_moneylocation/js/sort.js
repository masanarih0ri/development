$(function(){
        $('.my-checkbox').on('click',function(){
          var fla = $(this).closest('label').next().next().children();
          // .next().children();
          // $(fla).css('background-color','red');
          // alert(fla);
          // console.log(fla);
          if($(this).prop('checked') == true){
            $(fla).val("1");
            // alert('OK!');
          }else{
            $(fla).val("0");
            // alert('NG');
          } 
          // fla.css('font-size','40px');
      });
});