// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

console.log("dalee");
class PostComments{

     constructor(postId){

          this.postId = postId;
          this.postContainer = $(`#post-${postId}`);
          this.newCommentForm =  $(`#post-${postId}-comments-form`);
          console.log("dalee21");
          this.createComment(postId);

          let self = this;

          $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        console.log("dalee212121");
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);

                    console.log("bhai log ", newComment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }

    newCommentDom(x){

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


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}


/*{

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
   
}*/