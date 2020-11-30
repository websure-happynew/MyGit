let getMovies=require('./getMovies');
let fs=require('fs');
getMovies().then(movies=>{
   let json=JSON.stringify(movies);
   fs.writeFile('movies.json',json,function () 
   {console.log('成功!')  })
})
