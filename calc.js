arr = [1,1,1,1,2,2,2,3,3,3]
sorted = []

for(var i = 0; i < arr.length; i++){
  if(arr[i] == arr[i-1]){
    continue;
  }else{
    sorted.push(arr[i])
    console.log(sorted)
  }
}
console.log('check')
console.log(sorted);