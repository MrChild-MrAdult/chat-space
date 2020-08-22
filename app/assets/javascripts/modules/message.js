$(function(){

  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="contents" data-message-id=${message.id}>
          <div class="message-content">
            <div class="member-info">
              <div class="member-info__name">
                ${message.user_name}
              </div>
              <div class="member-info__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message-content">
              <p class="lower-message__content">
                ${message.comment}
              </p>
              <img class="message__image" src="${message.image}">
            </div>
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="contents" data-message-id=${message.id}>
          <div class="message-content">
            <div class="member-info">
              <div class="member-info__name">
                ${message.user_name}
              </div>
              <div class="member-info__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message-content">
              <p class="lower-message__content">
                ${message.comment}
              </p>
            </div>
          </div>
        </div>`
      return html;
    };
  }

  $('.form-box').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this)
    let url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);      
      $('form')[0].reset(); //投稿後、入力値をリセットする
      $('.chat-main__message-list').animate({scrollTop: $('.chat-main__message-list')[0].scrollHeight}); //投稿後、一番下まで自動スクロール
      $('.form-box__btn').prop('disabled', false);　   //submitボタンを連続で押せるようにする
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.form-box__btn').prop("disabled", false);
    });
  });

});