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
                        $('#testdiv').load('http://127.0.0.1:8000/hometemp')

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
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
             }
          }
      }
 return cookieValue;
}

$('.delete-list-btn').on('click', function(){
var csrftoken = getCookie('csrftoken')
var currBtn = $(this).attr('id')
var ID = currBtn[currBtn.length-1]
var listID = $('#listid-'+ID).text().trim()
var currlistcount = parseInt($('#list-count-badge').html(), 10) - 1
console.log(ID)
console.log(listID)

$.ajax({
url: window.location.pathname,
type: 'POST',
data: { csrfmiddlewaretoken : csrftoken,
listId:listID   },
success: function(){
console.log("List successfully deleted!")
$('#list-template').load('http://127.0.0.1:8000/listtemp')
$('#list-count-badge').text(currlistcount.toString())
},
error: function(err){
console.log("Uh Oh. Something went wrong!")
console.log(err)
}
})
})

//$('.edit-list-btn').on('click', function(){
//var csrftoken = getCookie('csrftoken')
//var currBtn = $(this).attr('id')
//var ID = currBtn[currBtn.length-1]
//var listID = $('#listid-'+ID).text().trim()
//console.log(ID)
//console.log(listID)
//
//$.ajax({
//url: window.location.pathname,
//type: 'POST',
//data: { csrfmiddlewaretoken : csrftoken,
//listId:listID   },
//success: function(){
//console.log("Edit List Mode")
//$('#list-template').load('http://127.0.0.1:8000/editlisttemp')
//},
//error: function(err){
//console.log("Uh Oh. Something went wrong!")
//console.log(err)
//}
//})
//})