var origin, destination, march_bonus, troop_rate;

$(function(){
    function calc(){
        // origin_x = parseFloat($("#origin_x").val());
        // origin_y = parseFloat($("#origin_y").val());
        // destination_x = parseFloat($("#destination_x").val());
        // destination_y = parseFloat($("#destination_y").val());
        const orig_val  = $("#origin").val();
        const origin    =   orig_val
                            .match(/[A-Z]:\s?\d+/g)
                            .reduce((coords, str) => {
                                const [key, value] = str.split(':')
                                return {
                                    ...coords,
                                    [key]: value.trim(),
                                }
                            }, {});
        const destination_val  = $("#destination").val();
        const destination    =   destination_val
                            .match(/[A-Z]:\s?\d+/g)
                            .reduce((coords, str) => {
                                const [key, value] = str.split(':')
                                return {
                                    ...coords,
                                    [key]: value.trim(),
                                }
                            }, {});
        march_bonus = parseFloat($("#march_bonus").val());
        march_bonus = isNaN(march_bonus)?0:march_bonus;
        
        troop_rate = parseFloat($("#troop_rate").val()) || 2;

        let circle1 = Math.sqrt(Math.pow(origin.X-destination.X,2) + Math.pow(origin.Y*2-destination.Y*2,2));
        let circle2 = Math.sqrt(Math.pow(origin.X-destination.X,2) + Math.pow(origin.Y*2-(origin.X&1)-destination.Y*2+(origin.Y&1),2));
        let oval = Math.sqrt(Math.pow(origin.X-destination.X,2) + Math.pow(origin.Y-destination.Y,2));
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