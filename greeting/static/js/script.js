document.addEventListener('DOMContentLoaded', function() {
var savebtn = $('#save-list-btn')
var searchform = $('#search-form')

$('#newListModal').on('shown.bs.modal', function() {
  $('#input-list-title').focus();
});

$('#modal-close-btn').on('click', function(){
$('#newListModal').modal('toggle')
})

$("#category-dropdown").on("click", function(){
    $("#category-dropdown").children().first().css("display","none");
})

savebtn.on('click', function(){
             data = []
             data['newListTitle'] = $('#input-list-title').val()
             data['newListCat'] = $('#category-dropdown').val()
             JSON.stringify(data)
             var csrftoken = getCookie('csrftoken')
             $.ajax({
             type: 'POST',
             url: window.location.pathname,
             data: {
                      csrfmiddlewaretoken : csrftoken,
                      newListTitle: data['newListTitle'],
                      newListCat: data['newListCat']
                      },
             success: function(){
                      var currlistcount = parseInt($('#list-count-badge').html(), 10) + 1
                      if(window.location.pathname == "/home/")
                      {
                        $('#list-template').load('http://127.0.0.1:8000/hometemp');
                      }

                      else if(window.location.pathname == "/list/")
                      {
                        $('#list-template').fadeOut(400)
                        setTimeout(function(){
                        $('#list-template').load('http://127.0.0.1:8000/listtemp', function(){ $(this).fadeIn(400)})
                        },400)
                      }

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

$('#new-list-prompt').on('submit', function(e){
             e.preventDefault()
             data = []
             data['newListTitle'] = $('#input-list-title').val()
             data['newListCat'] = $('#category-dropdown').val()
             JSON.stringify(data)
             var csrftoken = getCookie('csrftoken')
             $.ajax({
             type: 'POST',
             url: window.location.pathname,
             data: {
                      csrfmiddlewaretoken : csrftoken,
                      newListTitle: data['newListTitle'],
                      newListCat: data['newListCat']
                      },
             success: function(){
                      var currlistcount = parseInt($('#list-count-badge').html(), 10) + 1
                      if(window.location.pathname == "/home/")
                      {
                        $('#list-template').load('http://127.0.0.1:8000/hometemp');
                      }
                      else if(window.location.pathname == "/list/")
                      {
                        $('#list-template').fadeOut(400)
                        setTimeout(function(){
                        $('#list-template').load('http://127.0.0.1:8000/listtemp', function(){ $(this).fadeIn(400)})
                        },400)
                      }

                      $('#list-count-badge').text(currlistcount.toString())
                      $('#input-list-title').val('')
                      $('#newListModal').modal('toggle')
                       console.log('List successfully created');
                       console.log(data);
                       },
             error: function(data){
                      console.error('ERROR: Something went wrong. Try again.')
                      if($('#category-dropdown').val() == "")
                      {
                        console.error("PLEASE SELECT A CATEGORY");
                      }
                      console.log(data)
                      }
             })
              console.log('List has been saved!')
})

$(document).on('click','.delete-list-btn', function(){
var csrftoken = getCookie('csrftoken')
var currBtn = $(this).attr('id')
var ID = currBtn[currBtn.length-1]
var listID = $('#listid-'+ID).text().trim()
var currlistcount = parseInt($('#list-count-badge').html(), 10) - 1
console.log(ID)
console.log(listID)

$.ajax
({
    url: '/list/',
    type: 'POST',
    data: { csrfmiddlewaretoken : csrftoken,
    listId:listID   },
    success: function()
    {
        console.log("List successfully deleted!")
        $('#list-template').load('http://127.0.0.1:8000/listtemp')
        $('#list-count-badge').text(currlistcount.toString())
    },
    error: function(err)
    {
        console.log("Uh Oh. Something went wrong!")
        console.log(err)
    }
})
})

$(document).on('click','.delete-item-btn', function(){
var csrftoken = getCookie('csrftoken')
var currBtn = $(this).attr('id')
var ID = currBtn[currBtn.length-1]
var itemID = $('#item-id-'+ID).text().trim()
console.log(ID)
console.log(itemID)

$.ajax({
url: '/editlist/',
type: 'POST',
data: { csrfmiddlewaretoken : csrftoken,
itemId: itemID   },
success: function(){
console.log("Item successfully deleted!")
$('#editlist-template').load('http://127.0.0.1:8000/editlisttemp')
},
error: function(err){
console.log("Uh Oh. Something went wrong!")
console.log(err)
}
})
})

$(document).on('click', '.edit-list-btn', function(){
var csrftoken = getCookie('csrftoken')
var currBtn = $(this).attr('id')
var ID = currBtn[currBtn.length-1]
var listID = $('#listid-'+ID).text().trim()
console.log(ID)
console.log(listID)

$.ajax({
url: window.location.pathname,
type: 'POST',
data: { csrfmiddlewaretoken : csrftoken,
editListId: listID   },
success: function(){
window.location.pathname= '/editlist/'
console.log("Edit List Mode")
},
error: function(err){
console.log("Uh Oh. Something went wrong!")
console.log(err)
}
})
})

$(document).on('click','#add-item-btn', function(){
var name = $('#new-item-name')
var cost = $('#new-item-cost')
var priority = $('#new-item-priority')
var currListID = $('#current-list-id').text().trim()

console.log(currListID)
console.log(name.val())
console.log(cost.val())

$(document).ajaxComplete(function(){
$('#new-item-name').focus()
})

if($.isNumeric(cost.val()))
{
    var csrftoken = getCookie('csrftoken')
    console.log("Valid Cost Input")
    $.ajax({
    url: window.location.pathname,
    type: 'POST',
    data: {csrfmiddlewaretoken : csrftoken,
            newItemName: name.val(),
            newItemCost: cost.val(),
            newItemPriority: priority.val(),
            currListID: currListID},
    success: function()
            {
                console.log('New Item Successfully Added.')
                $('#editlist-template').load('http://127.0.0.1:8000/editlisttemp')
            },
    error: function(err)
            {
                console.log('Oops! Looks like something went wrong.')
                console.log(err)
            },
    done: function()
            {
                console.log('ALL DONE!')
            }
    })
}
else{
    console.log("Invalid Cost Input")
    }
console.log(priority.val())

clear(name,cost,priority)
})

function clear(first, second, third){
    first.val("")
    second.val("")
    third.val("MEDIUM")
}

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

}, false);