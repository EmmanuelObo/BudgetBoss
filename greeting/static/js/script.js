$(document).ready(function(){

var savebtn = $('#save-list-btn')
var searchform = $('#search-form')
$('#newListModal').on('shown.bs.modal', function() {
  $('#input-list-title').focus();
});

savebtn.on('click', function(){
             data = []
             data['newListTitle'] = $('#input-list-title').val()
             JSON.stringify(data)
             var csrftoken = getCookie('csrftoken')
             $.ajax({
             type: 'POST',
             url: window.location.pathname,
             data: {
                      csrfmiddlewaretoken : csrftoken,
                      newListTitle: data['newListTitle']
                      },
             success: function(){
                      var currlistcount = parseInt($('#list-count-badge').html(), 10) + 1
                      if(window.location.pathname == "/home/")
                        $('#testdiv').load('http://127.0.0.1:8000/homecontent')

                      else if(window.location.pathname == "/list/")
                        $('#list-template').load('http://127.0.0.1:8000/listtemp')

                      $('#list-count-badge').text(currlistcount.toString())
                      $('#input-list-title').val('')
                      $('#newListModal').modal('toggle')
                       console.log('List successfully created');
                       console.log(data);
                       },
             error: function(data){
                      console.log('ERROR: Something went wrong. Try again.')
                      console.log(data)
                      }
             })
              console.log('List has been saved!')
              })

          function getCookie(name) {
          var cookieValue = null;
          if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
               var cookie = jQuery.trim(cookies[i]);
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
             }
          }
      }
 return cookieValue;
}

$('.delete-list-btn').on('click', function(){

var currBtn = $(this).attr('id')
console.log("Delete Button Clicked")
console.log(currBtn)

})

})
