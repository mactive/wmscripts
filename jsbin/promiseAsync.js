var asyncFn = async function(){
	return new Promise(function(resolve, reject){
	try{
						            await someCall();
									            resolve(someValue);
												        }catch(err){
															            reject(err);
																		        }
																				    })
}

try{
	    console.log(await asyncFn());
} catch{
	    console.error(error)
}
