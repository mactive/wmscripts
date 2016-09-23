/**
 * Created by mengqian on 13/6/2016.
 */
setTimeout(function(){
  console.log('three');
},0);

Promise.resolve().then(function(){
  console.log('two');
});

console.log('one');