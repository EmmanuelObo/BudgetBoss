document.addEventListener('DOMContentLoaded', function()
{
    var saveBtn = $('#save-list-btn')
    var searchForm = $('#search-form')
    var newListForm = $('#new-list-prompt')
    var newListModal = $('#newListModal')
    var modalCloseBtn = $('#modal-close-btn')
    var catDropdown = $('#category-dropdown')
    var sortingCatDropdown = $('#category-sorting-dropdown')
    var inputListTitle = $('#input-list-title')
    var addLimitBtn = $('#add-limit-btn')
    var inputListLimit = $('#input-list-limit')

    newListModal.on('shown.bs.modal', function()
    {
        inputListTitle.focus();
        if(inputListLimit.is(':visible'))
        {
            inputListLimit.hide();
        }

    });

    modalCloseBtn.on('click', function()
    {
        newListModal.modal('toggle');
        inputListLimit.hide();
        inputListLimit.find('input').val('');
        addLimitBtn.text('Add Limit');
        inputListTitle.val('');
    });

    catDropdown.on('click', function()
    {
        $(this).children().first().css("display","none");
    });

    saveBtn.on('click', function()
    {
        saveNewList();
    });

    newListForm.on('submit', function(e)
    {
        e.preventDefault();
        saveNewList();
    });

    addLimitBtn.on('click', function(e)
    {
        e.preventDefault();
        inputListLimit.toggle();
        if(inputListLimit.is(':visible'))
        {
            console.info('List limit is visible');
            $(this).text('Remove Limit');
        }
        else
        {
            console.info('List limit is hidden');
            inputListLimit.find('input').val('');
            $(this).text('Add Limit');
        }
    });

    $(document).on('change', '#category-sorting-dropdown', function()
    {
        selectedCategory();
    });

    $(document).on('click','.delete-list-btn', function()
    {
        deleteList($(this));
    });

    $(document).on('click','.delete-item-btn', function()
    {
        deleteItem($(this));
    });

    $(document).on('click', '.edit-list-btn', function()
    {
        editList($(this));
    });

    $(document).on('click','#add-item-btn', function()
    {
        addItem();
    })

    function clear(first, second, third)
    {
        first.val("")
        second.val("")
        third.val("MEDIUM")
    }

    function selectedCategory()
    {
        var csrftoken = getCookie('csrftoken')
        var cat = $('#category-sorting-dropdown').val()
        console.info("CATEGORY SELECTED: " + cat)

        $.ajax({
            url: '/list/',
            type: 'POST',
            data: { csrfmiddlewaretoken: csrftoken,
                    selectedCategory: cat},
            success: function()
            {
                console.info("SUCCESSFULLY SORTED LISTINGS")
                $('#list-template').load('http://127.0.0.1:8000/listtemp')
            },
            error: function(err)
            {
                console.log("Uh Oh. Something went wrong!")
                console.log(err)
            }
        })
    }

    function addItem()
    {
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
    }

    function editList(that)
    {
        var csrftoken = getCookie('csrftoken')
        var currBtn = that.attr('id')
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
            window.location.pathname= '/list/edit/'+listID
            console.log("Edit List Mode")
        },
        error: function(err)
            {
                console.log("Uh Oh. Something went wrong!")
                console.error(err)
            }
        })
    }

    function deleteItem(that)
    {
        var csrftoken = getCookie('csrftoken')
        var currBtn = that.attr('id')
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
        error: function(err)
            {
                console.log("Uh Oh. Something went wrong!")
                console.log(err)
            }
        })
    }

    function deleteList(that)
    {
        var csrftoken = getCookie('csrftoken')
        var currBtn = that.attr('id')
        var ID = currBtn[currBtn.length-1]
        var listID = $('#listid-'+ID).text().trim()
        var currlistcount = parseInt($('#list-count-badge').html(), 10) - 1
        console.log(ID)
        console.log(listID)

        $.ajax({
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
    }

   /* function saveNewList()
    {
         var listLimit = parseFloat(inputListLimit.find('input').val());
         data = [];
         data['newListTitle'] = $('#input-list-title').val();
         data['newListCat'] = $('#category-dropdown').val();
         if(listLimit > 0 && listLimit != undefined && listLimit != null)
         {
            data['newListLimit'] = listLimit;
         }
         else
         {
            data['newListLimit'] = 'NO LIMIT'
         }

         JSON.stringify(data)
         var csrftoken = getCookie('csrftoken')
         $.ajax({
         type: 'POST',
         url: window.location.pathname,
         data: {
                  csrfmiddlewaretoken : csrftoken,
                  newListTitle: data['newListTitle'],
                  newListCat: data['newListCat'],
                  newListLimit: data['newListLimit']
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
    }*/

    function saveNewList()
    {
        var data = JSON.stringify({
            "category": "/api/v1/category/" + categoryTranslation($('#category-dropdown').val())+ "/",
            "limit": parseFloat(inputListLimit.find('input').val()),
            "title": $('#input-list-title').val(),
            "user": "/api/v1/owner/1/"
        })

        $.ajax({
            url: '/api/v1/list/',
            type: 'POST',
            contentType: 'application/json',
            data: data,
            dataType: 'json',
            success: function(data)
                {
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
                   console.info(data)
                },
            error: function(err)
                {
                    console.info(err)
                },
            processData: false
        })
    }

    function getCookie(name)
    {
        var cookieValue = null;
        if (document.cookie && document.cookie != '')
        {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++)
            {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '='))
                    {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
            }
        }
        return cookieValue;
    }

    function categoryTranslation(category)
    {
        switch(category)
        {
            case "Bills":
                return "2";
            case "Loans":
                return "3";
            case "Luxury":
                return "4";
            case "Home":
                return "5";
            case "Health":
                return "6";
        }
    }
}, false);