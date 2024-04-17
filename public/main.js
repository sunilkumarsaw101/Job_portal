function deleteJob(id){
    console.log('hloooo');
    const result= confirm("Are you sure, you want to delete this product?")
    if(result){
        fetch('/delete-job/'+id, {method:'POST'}).then((res)=>{
         
            if(res.ok){
                console.log('hello');
                location.reload();
            }
        })
    }
}

function searchJob(){
console.log('search job');
const searchText = document.getElementById("inputSearch").value;
console.log(searchText);
fetch('/jobs?searchText='+searchText).then((res)=>{
    if(res.ok){
        console.log('all well');
        // location.reload();
    }
})

}