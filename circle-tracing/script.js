$(document).ready(practiceApp);


function practiceApp(){
    $('.square').on('click', function(){
        if($(this).children().length>0){
            var randomNum = Math.floor(Math.random()*4)+1;
            console.log($(this).index());
            var i=0;
            while(randomNum === $(this).index()+1){
                randomNum = Math.floor(Math.random()*4)+1;
                i++
            }
            $(".square:nth-child("+ randomNum +")").append($('#target'));
            console.log('yes it has child');
            console.log(randomNum);
        }else{
            console.log('lol no balls here')
        }
    })
}