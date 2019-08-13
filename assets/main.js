var origin_x, origin_y, destination_x, destination_y, march_bonus, troop_rate;

$(function(){
    function calc(){
        origin_x = parseFloat($("#origin_x").val());
        origin_y = parseFloat($("#origin_y").val());
        destination_x = parseFloat($("#destination_x").val());
        destination_y = parseFloat($("#destination_y").val());
        march_bonus = parseFloat($("#march_bonus").val());
        troop_rate = parseFloat($("#troop_rate").val()) || 2;

        let circle1 = Math.sqrt(Math.pow(origin_x-destination_x,2) + Math.pow(origin_y*2-destination_y*2,2));
        let circle2 = Math.sqrt(Math.pow(origin_x-destination_x,2) + Math.pow(origin_y*2-(origin_x&1)-destination_y*2+(origin_y&1),2));
        let oval = Math.sqrt(Math.pow(origin_x-destination_x,2) + Math.pow(origin_y-destination_y,2));
        let fast_march =  3 * oval * 100 / (100 + march_bonus) * 2 / troop_rate;
        let slow_march = 15 * oval * 100 / (100 + march_bonus) * 2 / troop_rate;
        $("#result").text(circle1.toFixed(2) + ' (' + circle2.toFixed(2) + ')');
        $("#range").text(oval.toFixed(2));
        $("#slow_march").text(hhmmss(slow_march));
        $("#fast_march").text(hhmmss(fast_march));
    }

    function hhmmss(sec) {
        return ('00'+Math.floor(sec / 3600)).slice(-2) + ':' + ('00'+(Math.floor(sec / 60) % 60)).slice(-2) + ":" + ('00'+(sec % 60).toFixed(2)).slice(-5) + ' (' + sec.toFixed(2) + ')';
    }

    $("#calculate").click(calc);
})