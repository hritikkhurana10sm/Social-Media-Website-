{
     // method to submit the form through ajax
     // creating post 
     let createPost = function () {

          let newPostForm = $('#new-post-form');

          newPostForm.submit(function (e) {

               e.preventDefault();

               $.ajax({

                    type: 'post',
                    url: '/posts/new',
                    data: newPostForm.serialize(),
                    success: function (data) {
                       let newPost = newPostDom(data.data.post);
                       $('#post-list').prepend(newPost);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                       
                       //flash used here
                       new Noty({
                        theme : 'nest',
                        text: 'Post created Successfully',
                        type : 'success',
                        layout : 'topRight',
                        timeout : 1350
                  
                    }).show();
                    
                    // deletePost($(' .delete-post-button', newPost));

                    //making delete button to work ajaxly
                      deletePost($(' .delete-post-button', newPost));  
                    }, error: function (error) {

                         console.log(error.responseText);
                    }
               })
          })
     }


     //method to create a post in DOM
     let newPostDom = function(p) {
       
          return $(`
           
          <li
          id = "post-${p._id}" class="" style="margin: 35px; margin-bottom: 0px;  background-color: black;">
          <hr style="color: white; height: 1px;margin-left: -35px;margin-right: -35px;"> 
          <div class="card bg-dark my-0" >
          <h5 class="card-header bg-dark text-white d-flex" style="font-weight: bolder;">
              <div style="flex-grow: 1;">
                  ${p.user.name} 🤵 posted this..
              </div>
  
                      <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${p._id}&type=Post">
                                    0 Likes
                                </a>
                            
                        </small>

                  <a class = "delete-post-button" href="/posts/distroy/${ p._id}">
                      <div class="badge bg-danger">Delete</div>
                  </a>
                 
          </h5>
          <div class="card-body" style="border : none;background-color: black;">
  
              <p class="card-text " style=" color: white;">
                  ${ p.content}
              </p>
          </div>
      </div>
  
    
          <div class="comment-box my-2" style="width: 100%; padding: 0px;">
              
              <form id="post-${ p._id }-comments-form" action="/comments/create" method="POST" style="display: flex;justify-content: space-around;margin-top: 20px;"> 
                  <input type="text" name="content" placeholder="🚀 Tweet your reply" width="100%" class="form-control "
                    style="background-color: black;color: white;border: none;border: none;box-shadow: none;line-height: 0.8;font-size: 20px;"  required>
                  <input type="hidden" name="post" value="${p._id}" required>
                  <input type="submit" style="border-radius: 25px;border:none;padding: 0.2rem; width: 95px; "
                      class="bg-primary text-white "  value="Reply">
  
                     
              </form>
              <hr style="width: 100%;color: white;margin-top: 2px;">
            
             
                 
                  <div style="font-size: 15px;color: #b9b6b6;padding : -1rem" class="mx-1">Relevant Comments</div>
                  <hr style="color: white; height: 1px;">
                 
  
                      <ul id="post-comments-${ p._id }" style="display: flex; width: 100%;flex-direction: column;list-style: none;padding: 0;margin : 0;">
                          
                          </ul>
  
          </div>
          <hr style="color: white; height: 1px;margin-left: -35px;margin-right: -35px;">
          </li> 
                     
          `)
     }


     //method to delete the post from the post

     let deletePost = function(deleteLink){
         
           $(deleteLink).click(function(e){


                  e.preventDefault();

                  $.ajax({
                    
                    type : 'get',
                    url : $(deleteLink).prop('href'),//gives link of href
                    success : function(data){
                           
                        $(`#post-${data.data.post_id} `).remove();
                        new Noty({
                          theme : 'nest',
                          text: 'Post deleted Successfully  *****',
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


      let convertAllPostToAjax = function convertAllPostToAjax(){

        $('#post-list>li').each(function(){
          let self = $(this);
          //console.log("self ==> " , self);
          let deleteButton = $(' .delete-post-button', self);
          deletePost(deleteButton);

         // get the post's id by splitting the id attribute
         let postId = self.prop('id').split("-")[1]
         //console.log(self.prop('id').split("-"));
         //console.log("postId ==> " , postId);
         new PostComments(postId);
      });

      } 

     createPost();
     convertAllPostToAjax();
}






/*
  <li
             id = "post-${p._id}" >
             <hr style="color: white; height: 1px;">
            <div style="margin: 35px; margin-bottom: 0px;  background-color: black;">

              <div class="card bg-dark my-0" >
                  <h5 class="card-header bg-dark text-white d-flex" style="font-weight: bolder;">
                      <div style="flex-grow: 1;">
                     
                      ${p.user.name} 🤵 posted this..
                      </div>
          
                    
                          <a class = "delete-post-button" href="/posts/distroy/${p._id}">
                              <div class="badge bg-danger">Delete</div>
                          </a>
                          
                  </h5>
                  <div class="card-body" style="border : none;background-color: black;">
          
                      <p class="card-text " style=" color: white;">
                      ${ p.content }
                      </p>
                  </div>
              </div>
          
           
                  <div class="comment-box my-2" style="width: 100%; padding: 0px;">
          
                      <form id = "create-new-comment" action="/comments/create" method="POST" style="display: flex;justify-content: space-around;margin-top: 20px;"> 
                          <input type="text" name="content" placeholder="🚀 Tweet your reply" width="100%" class="form-control "
                            style="background-color: black;color: white;border: none;border: none;box-shadow: none;line-height: 0.8;font-size: 20px;"  required>
                          <input type="hidden" name="post" value="${p._id}" required>
                          <input type="submit" style="border-radius: 25px;border:none;padding: 0.2rem; width: 95px; "
                              class="bg-primary text-white "  value="Reply">
          
                             
                      </form>

                      <hr style="width: 100%;color: white;margin-top: 2px;">
                    
                      
                         
                          <div style="font-size: 15px;color: #b9b6b6;padding : -1rem" class="mx-1">Relevant Comments</div>
                          <hr style="color: white; height: 1px;">
                         
          
                              <div style="display: flex; width: 100%;flex-direction: column;">
                                 
                                         
                              </div>
          
                  </div>
                </div>  
                  <hr style="color: white; height: 1px;">   

          </li>
*/ 