export function random(len:number){
   let options = "0123456789abcdefghijklmnopqrstuvwxyz"
   let length= options.length;

   let ans = "";
   for(let i =0; i < len; i++){
    ans += options[Math.floor(Math.random() * length)]
   }
   return ans;
}