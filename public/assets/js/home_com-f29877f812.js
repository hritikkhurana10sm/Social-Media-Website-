class PostComments{constructor(e){this.postId=e,this.postContainer=$(`#post-${e}`),this.newCommentForm=$(`#post-${e}-comments-form`),this.createComment(e);let t=this;$(" .delete-comment-button",this.postContainer).each((function(){t.deleteComment($(this))}))}createComment(e){let t=this;this.newCommentForm.submit((function(n){n.preventDefault();$.ajax({type:"post",url:"/comments/create",data:$(this).serialize(),success:function(n){let o=t.newCommentDom(n.data.comment);console.log("bhai log+++++++++ ",o),$(`#post-comments-${e}`).prepend(o),t.deleteComment($(" .delete-comment-button",o)),new ToggleLike($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}newCommentDom(e){return $(`\n        <li  id = "comment-${e._id}" style="display: flex;flex-direction: column;list-style:none;"> \n       \n            <div class="p-2 my-2 "\n                style="display :flex;justify-content : space-between; align-self : flex-end; margin-bottom : 20px;border-radius : 15px;font-size: 15px; height: auto; width: 80%; background-color: #dae9ff;">\n                <div>\n              \n                <span>\n                <img style = "width: 2.1rem; height: 2.1rem;margin: -0.4em;margin-right: 0.2em;border-radius: 50%;"src="/cs/d1.jpg" onerror="this.onerror=null;this.src='/cs/d1.jpg';">\n                \n            </span>\n           \n                    <span class="badge bg-primary text-end">\n                        ${e.user.name} commented!\n                    </span>\n                    ${e.content}</div>\n                <div style = "text-align : end">\n                  \n                   \n                    <a  class="delete-comment-button" href="/comments/destroy/${e._id}" style = "background-color: #dae9ff; width: 0; height: 0;color: #dae9ff;"> \n                        ⛔️\n                        </a>\n                    </div> \n                    \n                    <small>\n                            \n                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${e._id}&type=Comment">\n                        0 Likes\n                    </a>\n                \n                </small>\n\n                </div>\n           \n            <span style="margin-right: 20px;font-size: small;text-align: end;color: grey;">\n                ${e.createdAt}\n                \n            </span>\n          \n            </li>     \n       \n        `)}deleteComment(e){$(e).click((function(t){t.preventDefault(),console.log("hey deleted"),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){console.log("hey deleted ",e.data.comment_id),$(`#comment-${e.data.comment_id}`).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}}