var p1 = new Promise(function(resolve,reject){
	resolve("Success");
})

p1.then(function(value){
	console.log(value);
	return Promise.reject("oh, no!");
}).catch(function(e){
	console.log(e);
}).then(()=>{
	console.log("after a catch the chain is restored");
},function(){
	console.log("Not fired due to the catch");
});
