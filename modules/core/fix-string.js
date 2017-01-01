const chars = {
    1575: {initial: "ا", isolated: "ا", medial: "", final: "ﺎ" },
    1576: {initial: "ﺑ", isolated: "ﺏ", medial: "ﺒ", final: "ﺐ" },
    1662: {initial: "ﭘ", isolated: "ﭖ", medial: "ﭙ", final: "ﭗ" },
    1578: {initial: "ﺗ", isolated: "ﺕ", medial: "ﺘ", final: "ﺖ" },
    1579: {initial: "ﺛ", isolated: "ﺙ", medial: "ﺜ", final: "ﺚ" },
    1580: {initial: "ﺟ", isolated: "ﺝ", medial: "ﺠ", final: "ﺞ" },
    1670: {initial: "ﭼ", isolated: "ﭺ", medial: "ﭽ", final: "ﭻ" },
    1581: {initial: "ﺣ", isolated: "ﺡ", medial: "ﺤ", final: "ﺢ" },
    1582: {initial: "ﺧ", isolated: "ﺥ", medial: "ﺨ", final: "ﺦ" },
    1583: {initial: "ﺩ", isolated: "ﺩ", medial: "", final: "ﺪ" },
    1584: {initial: "ﺫ", isolated: "ﺫ", medial: "", final: "ﺬ" },
    1585: {initial: "ﺭ", isolated: "ﺭ", medial: "", final: "ﺮ" },
    1586: {initial: "ﺯ", isolated: "ﺯ", medial: "", final: "ﺰ" },
    1688: {initial: "ﮊ", isolated: "ﮊ", medial: "", final: "ﮋ" },
    1587: {initial: "ﺳ", isolated: "ﺱ", medial: "ﺴ", final: "ﺲ" },
    1588: {initial: "ﺷ", isolated: "ﺵ", medial: "ﺸ", final: "ﺶ" },
    1589: {initial: "ﺻ", isolated: "ﺹ", medial: "ﺼ", final: "ﺺ" },
    1590: {initial: "ﺿ", isolated: "ﺽ", medial: "ﻀ", final: "ﺾ" },
    1591: {initial: "ﻃ", isolated: "ﻁ", medial: "ﻄ", final: "ﻂ" },
    1592: {initial: "ﻇ", isolated: "ﻅ", medial: "ﻈ", final: "ﻆ" },
    1593: {initial: "ﻋ", isolated: "ﻉ", medial: "ﻌ", final: "ﻊ" },
    1594: {initial: "ﻏ", isolated: "ﻍ", medial: "ﻐ", final: "ﻎ" },
    1601: {initial: "ﻓ", isolated: "ﻑ", medial: "ﻔ", final: "ﻒ" },
    1602: {initial: "ﻗ", isolated: "ﻕ", medial: "ﻘ", final: "ﻖ" },
    1705: {initial: "ﻛ", isolated: "ﮎ", medial: "ﻜ", final: "ﮏ" },
    1711: {initial: "ﮔ", isolated: "ﮒ", medial: "ﮕ", final: "ﮓ" },
    1604: {initial: "ﻟ", isolated: "ﻝ", medial: "ﻠ", final: "ﻞ" },
    1605: {initial: "ﻣ", isolated: "ﻡ", medial: "ﻤ", final: "ﻢ" },
    1606: {initial: "ﻧ", isolated: "ﻥ", medial: "ﻨ", final: "ﻦ" },
    1608: {initial: "ﻭ", isolated: "ﻭ", medial: "", final: "ﻮ" },
    1607: {initial: "ﻫ", isolated: "ﻩ", medial: "ﻬ", final: "ﻪ" },
    1740: {initial: "ﻳ", isolated: "ﻯ", medial: "ﻴ", final: "ﻰ" },
    5000: {initial: "ﻻ", isolated: "ﻻ", medial: "", final: "ﻼ" }
};

export function fixTextForSvg(inputText){
    return inputText.split(' ').reverse().map(function(w){
        return fixWordForSvg(w);
    }).join(' ');
}

export function fixWordForSvg(inputWord){    
    let context = true;
    let ret = [];
    //const inputWord = inputWord.split('');
    for(let i = 0, l = inputWord.length; i < l; i++){
        let code = inputWord[i].charCodeAt(0);
        let nextCode = inputWord[i + 1] ? inputWord[i + 1].charCodeAt(0) : 0;
        if(!chars[code]){             
            ret.push(inputWord[i]);
            continue;
        }                
        if(context){            
            if(i == l - 1){                
                ret.push(chars[code].isolated);
            } else {
                // special case for لا
                if(code == 1604 && nextCode == 1575){
                    ret.push(chars[5000].initial);
                    i++;
                    context = true;
                    continue;
                }

                ret.push(chars[code].initial);
            }            
        } else {
            if(i == l - 1){                
                ret.push(chars[code].final);
            } else {
                // special case for ﻼ
                if(code == 1604 && nextCode == 1575){
                    ret.push(chars[5000].final);
                    i++;
                    context = true;
                    continue;
                }
                if(chars[code].medial == ''){                    
                    ret.push(chars[code].final);
                } else{                    
                    ret.push(chars[code].medial);
                }                
            }
        }        
        context = (chars[code].medial == '');        
    }   
    
    return ret.reverse().join('');
}