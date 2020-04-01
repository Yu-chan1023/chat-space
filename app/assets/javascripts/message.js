$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message">
         <div class="message__upper-info">
           <h2 class="message__upper-info__talker">
             ${message.user_name}
           </h2>
           <p class="message__upper-info__day">
             ${message.created_at}
           </p>
         </div>
         <div class="message__text">
           ${message.content}
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message">
         <div class="message__upper-info">
           <h2 class="message__upper-info__talker">
             ${message.user_name}
           </h2>
           <p class="message__upper-info__day">
             ${message.created_at}
           </p>
         </div>
         <div class="message__text">
           ${message.content}
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    $('form')[0].reset();
    $('.send-btn').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
})
});