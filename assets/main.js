var origin, destination, march_bonus, troop_rate;

$(function(){
    function calc(){
        const orig_val  = $("#origin").val();
        const origin    =   orig_val
                            .match(/\w+\s*:\s*\d+/gi) // <-- change
                            .reduce((coords, str) => {
                                const [key, value] = str.split(':')
                                return {
                                    ...coords,
                                    [key.toUpperCase().trim()]: value.trim(), // <-- change
                                }
                            }, {});
        const destination_val  = $("#destination").val();
        const destination    =   destination_val
                            .match(/\w+\s*:\s*\d+/gi) // <-- change
                            .reduce((coords, str) => {
                                const [key, value] = str.split(':')
                                return {
                                    ...coords,
                                    [key.toUpperCase().trim()]: value.trim(), // <-- change
                                }
                            }, {});
        march_bonus = parseFloat($("#march_bonus").val());
        march_bonus = isNaN(march_bonus)?0:march_bonus;
           
        troop_rate = parseFloat($("#troop_rate").val()) || 2;
    
        let circle1 = Math.sqrt(Math.pow(origin.X-destination.X,2) + Math.pow(origin.Y*2-destination.Y*2,2));
        let circle2 = Math.sqrt(Math.pow(origin.X-destination.X,2) + Math.pow(origin.Y*2-(origin.X&1)-destination.Y*2+(destination.X&1),2)); // <-- change
        let oval = Math.sqrt(Math.pow(origin.X-destination.X,2) + Math.pow(origin.Y-destination.Y,2));
        let fast_march =  3 * oval * 100 / (100 + march_bonus) * 2 / troop_rate;
        let slow_march = 15 * oval * 100 / (100 + march_bonus) * 2 / troop_rate;
        $("#result").text(circle1.toFixed(1) + ' (' + circle2.toFixed(1) + ')'); // <-- change
        $("#range").text(oval.toFixed(1)); // <-- change
        $("#slow_march").text(hhmmss(slow_march));
        $("#fast_march").text(hhmmss(fast_march));
    }

    function hhmmss(sec) {
        return ('00'+Math.floor(sec / 3600)).slice(-2) + ':' + ('00'+(Math.floor(sec / 60) % 60)).slice(-2) + ":" + ('00'+Math.round(sec % 60)).slice(-2); // <-- change
    }

    $("#calculate").click(calc);
})