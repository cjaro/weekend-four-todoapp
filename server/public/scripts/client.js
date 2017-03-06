$(document).ready(function(){
  console.log('jquery was correctly sourced and I am eating a burrito bowl. Well, not the bowl. The burrito inside the bowl. Which is good. The burrito, not the bowl. Though I am sure the bowl is fine.');
  getChoreData();
  function   getChoreData() {
    $.ajax({
      type: 'GET', //hooray, chores.... 7-year-old me is furious at this assignment. Well, 23-year-old me isn't thrilled, but at least she knows how to do it. 7-year-old Catherine was pretty clueless at programming. Lol. What an idiot, right?
      url: '/chores',
      success: function(response) {
        console.log('response', response); // array of chore objects
        $('#choreChart').empty(); //clears chore in chore chart
        for (var i = 0; i < response.length; i++) {
          var newchore = response[i]; //loops through chores - this is an object
          var $newchore = $('<tr>'); //creating new row for each added chore
          $newchore.data('id', chores.choresID);
          $newchore.append('<td><input value="'+ chores.name + '" class="choreName"></td>');
          $newchore.append('<td><button class="deleteButton">Delete</button></td>');
          $newchore.append('<td><button class="doneButton">Done</button></td>');
          $('#choreChart').prepend($chore);
        }
      }
    });
  }

  $('#newChoreForm').on('submit', function(event){
    event.preventDefault();
    var newChoreObject = {};
    var formFields = $(this).serializeArray();
    formFields.forEach(function(field) {
      newChoreObject[field.name] = field.value;
    });
//oh yippykiyay, throw those chores on a list
//  yeah sure, add em up
    $.ajax({
      type: 'POST',
      url: '/chores/new',
      data: newChoreObject,
      success: function(response){
        console.log(response);
        getChoreData();
        $('#newChoreForm > input').val('');
      }
    });
  });

//but what if I don't want to do that chore?
// No fear!! DELETE THAT SHIT OFF MY TO DO LIST.
// NO FUCKING MOPPING TODAY.

  $('#choreChart').on('click', '.deleteButton', function(){
    var idChoreDelete = $(this).parent().parent().data().id;
    console.log('idChoreDelete: ', idChoreDelete);
    $.ajax({
      type: 'DELETE',
      url: 'chores/delete/' + idChoreDelete,
      success: function(response){
        console.log(response);
        getChoreData();
      }
    })
  });

  $('#choreChart').on('click', '.doneButton', function(){
    var idChoreSave = $(this).parent().parent().data().id;
    var titleChoreSave = $(this).parent().parent().find('.choreName').val();
    var choreObjectSave = {
      chore: nameChoreSave,
    };

    //seriously how good is chipotle?

    $.ajax({
      type: 'PUT',
      url: 'chores/done/' + idChoreSave,
      data: choreObjectSave,
      success: function(response){
        console.log(response);
        getChoreData();
      }
    })
  });
  //


});//end doc ready
