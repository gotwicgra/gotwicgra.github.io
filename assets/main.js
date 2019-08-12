var origin_x, origin_y, destination_x, destination_y;

$(function(){
    function calc(){
         origin_x = $("#origin_x").val();
         origin_y = $("#origin_y").val();
         destination_x = $("#destination_x").val();
         destination_y = $("#destination_y").val();

        let calc = Math.sqrt(Math.pow(origin_x-destination_x,2) + Math.pow((origin_y*2-(origin_x & 1)-(destination_y*2) + (destination_x &1)),2));
        $("#result").text(calc.toFixed(2));
    }

    $("#calculate").click(calc);
})