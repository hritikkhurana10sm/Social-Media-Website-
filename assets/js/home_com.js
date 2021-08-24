{

    //create comment through ajax calls
    let cComment = function () {

        let newCommentForm = $(`#new-comment-form`);
        // console.log(newCommentForm , "<----------------");
        newCommentForm.submit(function (e) {

             e.preventDefault();
            //  console.log("create comment called!!!!!!!!!!!!!!!!!!!11");
             $.ajax({

                  type: 'post',
                  url: '/comments/create',
                  data: newCommentForm.serialize(),
                 
                  success: function (data) {
                     let newComment = newCommentDom(data.data.comment);
                     
                     $('#comment-list').append(newComment);
                   
                     deleteComment($(' .delete-comment-button', newComment));

                    //    console.log("comment through ajax -- > " ,data);
                  }, error: function (error) {

                       console.log(error.responseText);
                  }
             })
        })
   }


   let newCommentDom = function(x) {
  
     return $(`
     <li  id = "comment-${x._id}" style="display: flex;flex-direction: column;list-style:none;"> 
    
         <div class="p-2 my-2 "
             style="display :flex;justify-content : space-between; align-self : flex-end; margin-bottom : 20px;border-radius : 15px;font-size: 15px; height: auto; width: 80%; background-color: #dae9ff;">
             <div>
                 <span class="badge bg-primary text-end">
                     ${x.user.name} commented!
                 </span>
                 ${ x.content}</div>
             <div style = "text-align : end">
               
                
                 <a  class="delete-comment-button" href="/comments/destroy/${ x._id }" style = "background-color: #dae9ff; width: 0; height: 0;color: #dae9ff;"> 
                     ⛔️
                     </a>
                 </div>   
             </div>
        
         <span style="margin-right: 20px;font-size: small;text-align: end;color: grey;">
             Commented Just Now . . . .
             
         </span>
       
         </li>     
    
     `)
}
  


 //delete comment from the post ajaxly
 let deleteComment = function(deleteLink){
    //  console.log("swahhhhhhh");
    $(deleteLink).click(function(e){


           e.preventDefault();

           $.ajax({
             
             type : 'get',
             url : $(deleteLink).prop('href'),//gives link of href
             success : function(data){
                    // console.log("*****************************************************daatatatata" , data);
                 $(`#comment-${data.data.comment_id} `).remove();
                 new Noty({
                   theme : 'nest',
                   text: 'Comment deleted Successfully  *****',
                   type : 'success',
                   layout : 'topRight',
                   timeout : 1350
             
               }).show();
             },error : function(error){

                  console.log(error.responseText);
             }
           })
    })
}

 cComment();

 // let ans = $('#comment-list li')
   
}